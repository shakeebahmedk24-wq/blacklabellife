import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWidget } from './chatbot/ChatWidget';

/**
 * Root App Component
 * Hosts the site-wide Black Label Concierge AI Chatbot widget.
 */
export default function App() {
  return <ChatWidget />;
}

/**
 * Mounts the chatbot once into a persistent DOM container so it stays mounted
 * across soft navigations while preserving all React state.
 */
export function mountChatbot(): void {
  if (typeof document === 'undefined') return;

  const containerId = 'black-label-chatbot-root';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

// Auto-mount on client initialization
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mountChatbot());
  } else {
    mountChatbot();
  }
}
