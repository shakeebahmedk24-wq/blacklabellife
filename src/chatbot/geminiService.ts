import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './systemPrompt';
import type { ChatMessageItem } from './types';

// Detect base URL for server-side API requests across custom domains & preview environments
const getApiEndpoints = (): string[] => {
  const endpoints = ['/api/chat'];

  // If the app is hosted on a custom domain (e.g. blacklabel.life) and APP_URL points to the Cloud Run backend
  const configuredAppUrl = (typeof process !== 'undefined' && process.env && process.env.APP_URL)
    ? process.env.APP_URL
    : '';

  if (configuredAppUrl && typeof window !== 'undefined') {
    try {
      const configuredOrigin = new URL(configuredAppUrl).origin;
      if (configuredOrigin && configuredOrigin !== window.location.origin) {
        endpoints.push(`${configuredOrigin}/api/chat`);
      }
    } catch {
      // Invalid URL format, ignore
    }
  }

  return endpoints;
};

// Read API key from environment variable if defined in client bundle
const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  if (typeof window !== 'undefined' && (window as unknown as { __GEMINI_API_KEY__?: string }).__GEMINI_API_KEY__) {
    return (window as unknown as { __GEMINI_API_KEY__?: string }).__GEMINI_API_KEY__ || '';
  }
  return '';
};

/**
 * Streams a message response from the Gemini API.
 * Prioritizes the secure server-side endpoint (/api/chat), falling back to configured APP_URL and client-side SDK if needed.
 */
export async function streamChatResponse(params: {
  history: ChatMessageItem[];
  userMessage: string;
  currentPath: string;
  onChunk: (text: string) => void;
}): Promise<string> {
  const candidateEndpoints = getApiEndpoints();
  let lastServerErr: string | null = null;

  // 1. Try server-side proxy routes (/api/chat, followed by Cloud Run origin if on separate domain)
  for (const endpoint of candidateEndpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          history: params.history,
          userMessage: params.userMessage,
          currentPath: params.currentPath,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        let detailedMsg = `HTTP ${res.status}`;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed.error) detailedMsg = parsed.error;
        } catch {
          if (errorText) detailedMsg = errorText.slice(0, 150);
        }
        lastServerErr = `Endpoint ${endpoint} returned ${detailedMsg}`;
        console.warn(`[Concierge] ${lastServerErr}`);
        continue; // Try next candidate endpoint if available
      }

      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split(/\r?\n\r?\n/);
          buffer = parts.pop() || '';

          for (const part of parts) {
            const lines = part.split(/\r?\n/);
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('data: ')) {
                const dataStr = trimmed.slice(6).trim();
                if (dataStr === '[DONE]') continue;
                try {
                  const data = JSON.parse(dataStr);
                  if (data.text) {
                    fullText += data.text;
                    params.onChunk(data.text);
                  } else if (data.error) {
                    throw new Error(data.error);
                  }
                } catch (parseErr) {
                  // Ignore non-fatal JSON parse anomalies in streaming
                }
              }
            }
          }
        }

        if (fullText.trim().length > 0) {
          return fullText;
        }
      }
    } catch (err: any) {
      lastServerErr = err?.message || String(err);
      console.warn(`[Concierge] Failed calling ${endpoint}:`, lastServerErr);
    }
  }

  // 2. Direct fallback using @google/genai SDK with gemini-3.8-flash
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const formattedHistory = params.history
    .filter((m) => m.text && !m.isStreaming)
    .map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

  const contextualUserMessage = `[Visitor is currently on page: ${params.currentPath}]\n${params.userMessage}`;
  const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError: unknown = null;

  for (const model of modelsToTry) {
    try {
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 500,
        },
        history: formattedHistory,
      });

      const responseStream = await chat.sendMessageStream({
        message: contextualUserMessage,
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        const chunkText = chunk.text || '';
        if (chunkText) {
          fullText += chunkText;
          params.onChunk(chunkText);
        }
      }

      return fullText;
    } catch (err: unknown) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg.includes('404') || errMsg.includes('503') || errMsg.includes('not found') || errMsg.includes('UNAVAILABLE')) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Failed to connect to Black Label Concierge service.');
}
