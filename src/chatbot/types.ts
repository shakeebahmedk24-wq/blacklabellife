export type MessageRole = 'user' | 'model';

export interface ChatMessageItem {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface SendMessageOptions {
  currentPath: string;
  onChunk: (chunkText: string) => void;
}
