import React from 'react';
import type { ChatMessageItem } from './types';

interface ChatMessageProps {
  message: ChatMessageItem;
  onNavigate?: (path: string) => void;
}

/**
 * Parses simple markdown syntax into safe React elements:
 * - [text](url) links with internal router navigation
 * - **bold** text
 * - *italic* text
 * - Bullet lists (- item)
 * - Auto-detect email addresses and format as mailto links
 */
function renderMarkdown(content: string, onNavigate?: (path: string) => void): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-ul`} className="list-disc list-inside space-y-1.5 my-2 pl-1 text-xs sm:text-sm text-[#dcd6ca]">
          {currentList.map((item, idx) => (
            <li key={`${keyPrefix}-li-${idx}`} className="leading-relaxed">
              {renderInlineMarkdown(item, onNavigate)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
    } else {
      flushList(`line-${index}`);
      if (trimmed === '') {
        // Spacer for empty lines
        elements.push(<div key={`br-${index}`} className="h-1.5" />);
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-xs sm:text-sm text-[#faf8f5] leading-relaxed my-1">
            {renderInlineMarkdown(line, onNavigate)}
          </p>
        );
      }
    }
  });

  flushList('final');
  return elements;
}

function renderInlineMarkdown(text: string, onNavigate?: (path: string) => void): React.ReactNode {
  // Pattern matches [label](href) or email addresses or **bold**
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*[^*]+\*\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Link: [label](href)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const href = linkMatch[2];
      const isInternal = href.startsWith('/') || href.startsWith('#');

      return (
        <a
          key={i}
          href={href}
          onClick={(e) => {
            if (isInternal && onNavigate) {
              e.preventDefault();
              onNavigate(href);
            }
          }}
          className="text-[#c5a059] font-medium underline underline-offset-2 hover:text-[#dfc182] transition-colors cursor-pointer"
        >
          {label}
        </a>
      );
    }

    // Email address
    const emailMatch = part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (emailMatch) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-[#c5a059] font-mono text-xs underline underline-offset-2 hover:text-[#dfc182] transition-colors"
        >
          {part}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#faf8f5]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onNavigate }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-sm break-words [overflow-wrap:anywhere] transition-all duration-200 ${
          isUser
            ? 'bg-[#c5a059] text-[#060709] rounded-tr-none font-medium shadow-md selection:bg-black selection:text-white'
            : 'bg-[#121316] text-[#faf8f5] border border-white/10 rounded-tl-none shadow-md'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed break-words">{message.text}</p>
        ) : (
          <div>
            {message.text ? (
              renderMarkdown(message.text, onNavigate)
            ) : message.isStreaming ? (
              <div className="flex items-center gap-1.5 py-1 px-1 text-[#c5a059]" aria-label="Concierge is typing">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : null}

            {message.isStreaming && message.text && (
              <span className="inline-block w-1.5 h-3.5 bg-[#c5a059] ml-1 animate-pulse align-middle" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
