/**
 * ============================================================================
 * BLACK LABEL LIFESTYLE — VITE MULTI-PAGE APPLICATION (MPA) CONFIGURATION
 * ============================================================================
 * 
 * OWNER & DEVELOPER HANDOFF GUIDE:
 * ----------------------------------------------------------------------------
 * This configuration manages the development server and production build bundle.
 * 
 * ARCHITECTURAL DESIGN:
 * 1. Multi-Page Application (MPA) Rollup Inputs:
 *    - Each division has its own distinct static entry point:
 *      / (Main), /social, /entertainment, /trading, /lifestyle, /design,
 *      /business-services, /investments, /luxury, /concierge, /contact, /admin, and /404.
 * 2. Clean URL Routing Middleware (mpaCleanUrlsPlugin):
 *    - Automatically rewrites pretty URLs (e.g., /social) to their physical
 *      counterparts (/social/index.html) during local development, ensuring
 *      exact parity with production web server behavior (Cloudflare, Nginx, Vercel).
 * 3. Tailwind CSS Integration:
 *    - Uses @tailwindcss/vite compiler for rapid utility class compilation.
 * 4. Production Optimization:
 *    - Generates independent HTML pages with split JS chunks (Leaflet, Analytics, Core).
 * ============================================================================
 */

import { GoogleGenAI } from '@google/genai';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { SYSTEM_INSTRUCTION } from './src/chatbot/systemPrompt';

/**
 * List of multi-page route directories in the application.
 */
const mpaRoutes = [
  'social',
  'entertainment',
  'trading',
  'lifestyle',
  'design',
  'business-services',
  'investments',
  'luxury',
  'concierge',
  'contact',
  'admin',
];

/**
 * Server-side Gemini API proxy plugin.
 * Handles /api/chat requests entirely server-side, protecting API keys and streaming responses.
 */
function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { history, userMessage, currentPath } = JSON.parse(body);
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }));
              return;
            }

            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const formattedHistory = (history || [])
              .filter((m: any) => m.text && !m.isStreaming)
              .map((m: any) => ({
                role: m.role,
                parts: [{ text: m.text }],
              }));

            const contextualUserMessage = `[Visitor is currently on page: ${currentPath || '/'}]\n${userMessage}`;

            res.writeHead(200, {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            });

            const chat = ai.chats.create({
              model: 'gemini-3.8-flash',
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

            for await (const chunk of responseStream) {
              const text = chunk.text || '';
              if (text) {
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
              }
            }

            res.write('data: [DONE]\n\n');
            res.end();
          } catch (err: any) {
            console.error('Server chat proxy error:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Chat generation failed' }));
            } else {
              res.write(`data: ${JSON.stringify({ error: err?.message })}\n\n`);
              res.end();
            }
          }
        });
      });
    },
  };
}

/**
 * Dev server middleware plugin that allows clean URL paths without trailing .html
 * (e.g. browsing /concierge serves /concierge/index.html seamlessly).
 */
function mpaCleanUrlsPlugin(): Plugin {
  return {
    name: 'mpa-clean-urls',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const pathname = req.url.split('?')[0];

        // Rewrite directory routes to their nested index.html
        for (const route of mpaRoutes) {
          if (pathname === `/${route}` || pathname === `/${route}/`) {
            const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
            req.url = `/${route}/index.html${query}`;
            return next();
          }
        }

        // Handle 404 preview route
        if (pathname === '/404' || pathname === '/404/') {
          const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
          req.url = `/404.html${query}`;
          return next();
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
    },
    plugins: [react(), tailwindcss(), mpaCleanUrlsPlugin(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        // Individual entry points for all 13 pages
        input: {
          main: path.resolve(__dirname, 'index.html'),
          social: path.resolve(__dirname, 'social/index.html'),
          entertainment: path.resolve(__dirname, 'entertainment/index.html'),
          trading: path.resolve(__dirname, 'trading/index.html'),
          lifestyle: path.resolve(__dirname, 'lifestyle/index.html'),
          design: path.resolve(__dirname, 'design/index.html'),
          businessServices: path.resolve(__dirname, 'business-services/index.html'),
          investments: path.resolve(__dirname, 'investments/index.html'),
          luxury: path.resolve(__dirname, 'luxury/index.html'),
          concierge: path.resolve(__dirname, 'concierge/index.html'),
          contact: path.resolve(__dirname, 'contact/index.html'),
          admin: path.resolve(__dirname, 'admin/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
