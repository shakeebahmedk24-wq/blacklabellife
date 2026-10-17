import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './systemPrompt';
import type { ChatMessageItem } from './types';

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
 * Prioritizes the secure server-side endpoint (/api/chat), falling back to client-side SDK if needed.
 */
export async function streamChatResponse(params: {
  history: ChatMessageItem[];
  userMessage: string;
  currentPath: string;
  onChunk: (text: string) => void;
}): Promise<string> {
  // 1. Try server-side proxy route first (/api/chat)
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: params.history,
        userMessage: params.userMessage,
        currentPath: params.currentPath,
      }),
    });

    if (res.ok && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') continue;
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                fullText += data.text;
                params.onChunk(data.text);
              } else if (data.error) {
                throw new Error(data.error);
              }
            } catch {
              // Ignore partial JSON chunks
            }
          }
        }
      }

      if (fullText) return fullText;
    }
  } catch (err) {
    console.warn('Server chat proxy unavailable, falling back to direct SDK:', err);
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
