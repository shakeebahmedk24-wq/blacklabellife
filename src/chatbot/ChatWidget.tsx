import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from './ChatMessage';
import { streamChatResponse } from './geminiService';
import type { ChatMessageItem } from './types';

const INITIAL_BOT_MESSAGE: ChatMessageItem = {
  id: 'init-msg',
  role: 'model',
  text: 'Hello, I am the Black Label Concierge Assistant. Tell me what is taking up your time and I will point you to the right team.',
  timestamp: Date.now(),
};

const QUICK_REPLY_CHIPS = [
  'Explore the 8 divisions',
  'I need help at home',
  'I run a company',
  'Real estate in San Francisco',
  'Talk to the concierge',
];

const MAX_SESSION_MESSAGES = 20;
const MAX_CHAR_COUNT = 500;
const MIN_SEND_INTERVAL_MS = 1500;

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([INITIAL_BOT_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [lastSendTime, setLastSendTime] = useState(0);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Keep track of route changes across client navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('blacklabel:routechange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('blacklabel:routechange', handleRouteChange);
    };
  }, []);

  // Keyboard accessibility: Escape closes chat panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, errorMessage, scrollToBottom]);

  // Reset conversation to initial state
  const handleNewChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
    setInputText('');
    setErrorMessage(null);
    setLastUserMessage(null);
    setUserMessageCount(0);
  };

  // Internal navigation from markdown links
  const handleNavigate = (path: string) => {
    if (path.startsWith('#')) {
      const target = document.querySelector(path);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path.startsWith('/')) {
      // Dispatch custom route change or standard navigation
      window.location.href = path;
    }
  };

  // Send message implementation
  const handleSendMessage = async (textToSend: string) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isLoading) return;

    // Abuse protection 1: Character limit
    if (cleanText.length > MAX_CHAR_COUNT) {
      setErrorMessage(`Message exceeds ${MAX_CHAR_COUNT} characters. Please shorten your message.`);
      return;
    }

    // Abuse protection 2: Rate limiting delay between sends
    const now = Date.now();
    if (now - lastSendTime < MIN_SEND_INTERVAL_MS) {
      return;
    }

    // Abuse protection 3: Session limit of 20 user messages
    if (userMessageCount >= MAX_SESSION_MESSAGES) {
      setErrorMessage(
        'Session message limit reached. Please email concierge@blacklabel.life for personal concierge consultation.'
      );
      return;
    }

    setLastSendTime(now);
    setErrorMessage(null);
    setInputText('');
    setLastUserMessage(cleanText);
    setUserMessageCount((prev) => prev + 1);

    const userMessageItem: ChatMessageItem = {
      id: `user-${now}`,
      role: 'user',
      text: cleanText,
      timestamp: now,
    };

    const botMessageId = `model-${now}`;
    const botPlaceholderItem: ChatMessageItem = {
      id: botMessageId,
      role: 'model',
      text: '',
      timestamp: now,
      isStreaming: true,
    };

    const newHistory = [...messages, userMessageItem];
    setMessages([...newHistory, botPlaceholderItem]);
    setIsLoading(true);

    try {
      let accumulatedReply = '';
      await streamChatResponse({
        history: newHistory,
        userMessage: cleanText,
        currentPath,
        onChunk: (chunkText) => {
          accumulatedReply += chunkText;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId
                ? { ...m, text: accumulatedReply, isStreaming: true }
                : m
            )
          );
          scrollToBottom(false);
        },
      });

      // Mark streaming as done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? { ...m, text: accumulatedReply, isStreaming: false }
            : m
        )
      );
    } catch {
      // Friendly error state
      setErrorMessage(
        "I'm having trouble connecting. Please email concierge@blacklabel.life and our team will respond within two hours."
      );
      // Remove empty placeholder if nothing was streamed
      setMessages((prev) => prev.filter((m) => m.id !== botMessageId || m.text.length > 0));
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  const isAtSessionLimit = userMessageCount >= MAX_SESSION_MESSAGES;

  // Lock background scroll on mobile when chat panel is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  return (
    <div className="font-sans antialiased">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Black Label Concierge chat"
          className="fixed z-50 flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#0a0b0e] text-[#faf8f5] border border-[#c5a059]/40 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:border-[#c5a059] hover:shadow-[0_8px_35px_rgba(197,160,89,0.35)] transition-all duration-300 group cursor-pointer touch-manipulation active:scale-95"
          style={{
            bottom: 'max(1rem, env(safe-area-inset-bottom, 16px))',
            right: 'max(1rem, env(safe-area-inset-right, 16px))',
          }}
        >
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#c5a059]"></span>
          </span>
          <span className="font-serif text-xs sm:text-sm tracking-wide group-hover:text-[#c5a059] transition-colors">
            Black Label Concierge
          </span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059] transition-transform duration-200 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.974-.94 4.053 4.053 0 00.465-2.001A8.204 8.204 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Black Label Concierge chat panel"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[600px] sm:max-h-[85vh] h-[100dvh] max-h-[100dvh] z-50 flex flex-col bg-[#08090c] border border-[#c5a059]/30 sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          {/* Mobile Sheet Pull Bar Indicator */}
          <div className="sm:hidden flex justify-center pt-2 pb-1 bg-[#0e1015]">
            <span className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0e1015] border-b border-[#c5a059]/20 select-none shrink-0">
            <div className="space-y-0.5">
              <h2 className="text-sm sm:text-base font-serif font-medium text-[#faf8f5] tracking-wide flex items-center gap-2">
                Black Label Concierge Assistant
              </h2>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#a69f91]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Virtual Assistant · Millennium Tower</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* New chat button */}
              <button
                onClick={handleNewChat}
                aria-label="New chat"
                title="Reset conversation"
                className="px-2 py-1.5 sm:py-1 text-[11px] font-mono uppercase tracking-wider text-[#a69f91] hover:text-[#c5a059] active:text-[#faf8f5] rounded hover:bg-white/[0.04] transition-colors cursor-pointer touch-manipulation"
              >
                New chat
              </button>

              {/* Close button with touch-friendly 40px target */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close concierge chat"
                className="p-2 sm:p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#a69f91] hover:text-[#faf8f5] active:bg-white/[0.1] rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer touch-manipulation"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-3 sm:py-4 space-y-2 bg-gradient-to-b from-[#08090c] to-[#0b0c10] text-[#faf8f5] overscroll-contain touch-pan-y">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onNavigate={handleNavigate} />
            ))}

            {/* Quick Reply Chips (shown under first message if only 1 message exists) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 pb-3 space-y-1.5">
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#a69f91] px-1">
                  Suggested topics
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap no-scrollbar -mx-1 px-1">
                  {QUICK_REPLY_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="shrink-0 sm:shrink px-3 py-1.5 text-xs font-sans text-[#faf8f5] bg-[#14161d] active:bg-[#232734] sm:hover:bg-[#1f222d] border border-[#c5a059]/25 sm:hover:border-[#c5a059]/60 rounded-full transition-all duration-200 whitespace-nowrap sm:whitespace-normal text-left cursor-pointer touch-manipulation"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Friendly Error State with Retry Button */}
            {errorMessage && (
              <div className="p-3.5 my-2 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-[#faf8f5] space-y-2">
                <p className="leading-relaxed text-[#dcd6ca]">{errorMessage}</p>
                {lastUserMessage && (
                  <button
                    onClick={() => handleSendMessage(lastUserMessage)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#c5a059] hover:underline cursor-pointer touch-manipulation"
                  >
                    ↺ Retry last message
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div
            className="p-3 sm:p-3.5 bg-[#0a0b0e] border-t border-white/[0.08] space-y-2 shrink-0"
            style={{
              paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 12px))',
            }}
          >
            <div className="relative flex items-center">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, MAX_CHAR_COUNT))}
                onKeyDown={handleKeyDown}
                placeholder={
                  isAtSessionLimit
                    ? 'Session limit reached. Email concierge@blacklabel.life'
                    : 'Tell me what is taking up your time...'
                }
                disabled={isLoading || isAtSessionLimit}
                rows={1}
                className="w-full pl-3.5 pr-12 py-2.5 text-base sm:text-sm text-[#faf8f5] bg-[#12141a] border border-white/10 rounded-xl focus:border-[#c5a059]/80 focus:outline-none placeholder-[#a69f91]/50 resize-none transition-colors disabled:opacity-50"
              />

              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isLoading || isAtSessionLimit}
                aria-label="Send message"
                className="absolute right-1.5 sm:right-2 p-2 sm:p-1.5 text-[#060709] bg-[#c5a059] disabled:bg-[#c5a059]/30 disabled:text-white/30 rounded-lg hover:bg-[#dfc182] active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed touch-manipulation"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between px-1 text-[10px] font-mono text-[#a69f91]/70">
              <span className="hidden sm:inline">Shift+Enter for new line</span>
              <span className="sm:hidden">Black Label Concierge</span>
              <span>{inputText.length}/{MAX_CHAR_COUNT}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
