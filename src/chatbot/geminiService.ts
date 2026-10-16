import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './systemPrompt';
import type { ChatMessageItem } from './types';

// Read API key from environment variable (never hardcoded)
const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  // Vite client fallback if defined
  if (typeof window !== 'undefined' && (window as unknown as { __GEMINI_API_KEY__?: string }).__GEMINI_API_KEY__) {
    return (window as unknown as { __GEMINI_API_KEY__?: string }).__GEMINI_API_KEY__ || '';
  }
  return '';
};

const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODELS = ['gemini-3.8-flash', 'gemini-flash-latest'];

/**
 * Streams a message response from the Gemini API using @google/genai SDK.
 */
export async function streamChatResponse(params: {
  history: ChatMessageItem[];
  userMessage: string;
  currentPath: string;
  onChunk: (text: string) => void;
}): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const ai = new GoogleGenAI({ apiKey });

  // Format message history for Gemini chat session
  // Filter out any messages currently streaming or empty
  const formattedHistory = params.history
    .filter((m) => m.text && !m.isStreaming)
    .map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

  // Extra context with current page path (not shown to user)
  const contextualUserMessage = `[Visitor is currently on page: ${params.currentPath}]\n${params.userMessage}`;

  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastError: unknown = null;

  for (const model of modelsToTry) {
    try {
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.6,
          maxOutputTokens: 350,
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
      // If 404 (model retired) or 503 (high demand), try next model
      if (errMsg.includes('404') || errMsg.includes('503') || errMsg.includes('not found') || errMsg.includes('UNAVAILABLE')) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Failed to connect to Black Label Concierge service.');
}
