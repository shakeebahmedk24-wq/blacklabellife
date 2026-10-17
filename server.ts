/**
 * ============================================================================
 * BLACK LABEL LIFESTYLE — FULL-STACK PRODUCTION & DEVELOPMENT SERVER
 * ============================================================================
 * 
 * Entry point for both development (tsx server.ts) and production (node server.ts).
 * Mounts the secure server-side Gemini API proxy at /api/chat with full CORS support,
 * health checks at /api/health, and multi-page application (MPA) routing.
 * ============================================================================
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from './src/chatbot/systemPrompt.ts';

// Load environment variables from .env if present
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = '0.0.0.0';
const isProd = process.env.NODE_ENV === 'production';

const mpaRoutes = [
  'social',
  'entertainment',
  'entertainment/plan',
  'events',
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

// In-memory store for event planning submissions (synced across server lifetime)
const eventInquiries: any[] = [];

async function startServer() {
  const app = express();

  // 1. Permissive CORS configuration for custom domain (blacklabel.life) & preview domains
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Body parsing for JSON API requests
  app.use(express.json({ limit: '1mb' }));

  // 2. Health check endpoint for uptime monitors and load balancers
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Black Label Concierge API',
      timestamp: new Date().toISOString(),
      hasKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // 2b. Private Event Planning Intake API (/api/events)
  app.post('/api/events', (req, res) => {
    try {
      const {
        clientName,
        clientEmail,
        clientPhone,
        contactPreference,
        eventType,
        customEventType,
        venueStatus,
        venueNotes,
        guestCount,
        eventLocation,
        eventDate,
        dateFlexibility,
        timeWindow,
        services,
        specialRequests,
      } = req.body || {};

      if (!clientName || !clientEmail || !clientPhone) {
        return res.status(400).json({
          error: 'Client name, email, and phone number are required.',
        });
      }

      const reference = `EVT-SF-${Date.now().toString().slice(-4)}`;
      const inquiryRecord = {
        reference,
        clientName: String(clientName).trim(),
        clientEmail: String(clientEmail).trim(),
        clientPhone: String(clientPhone).trim(),
        contactPreference: contactPreference || 'Phone Call',
        eventType: eventType === 'Another Event' && customEventType ? customEventType : (eventType || 'Private Event'),
        venueStatus: venueStatus || 'Not specified',
        venueNotes: venueNotes || '',
        guestCount: Math.min(50, Math.max(10, parseInt(guestCount || '20', 10))),
        eventLocation: eventLocation || 'San Francisco',
        eventDate: eventDate || 'TBD',
        dateFlexibility: dateFlexibility || 'Firm Date',
        timeWindow: timeWindow || 'Evening Dinner',
        services: Array.isArray(services) ? services : [],
        specialRequests: specialRequests || '',
        submittedAt: new Date().toISOString(),
        origin: 'Millennium Tower Event Desk',
      };

      eventInquiries.unshift(inquiryRecord);
      if (eventInquiries.length > 100) eventInquiries.pop();

      console.log(`[Black Label Events] New Event Requirement Logged: ${reference} (${inquiryRecord.eventType} for ${inquiryRecord.guestCount} guests by ${inquiryRecord.clientName})`);

      return res.status(200).json({
        success: true,
        reference,
        message: 'Event requirements received by Black Label Event Planning. An event planner will contact you directly within 2 hours.',
        data: inquiryRecord,
      });
    } catch (err: any) {
      console.error('[Black Label Events] Error processing inquiry:', err);
      return res.status(500).json({
        error: 'Failed to record event requirements. Please email events@blacklabel.life directly.',
      });
    }
  });

  app.get('/api/events', (_req, res) => {
    res.json({
      success: true,
      count: eventInquiries.length,
      inquiries: eventInquiries,
    });
  });

  // 3. Server-side Gemini Streaming Chat Endpoint (/api/chat)
  app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Server error: GEMINI_API_KEY is not defined in process.env');
      return res.status(500).json({
        error: 'The Black Label Concierge service is temporarily offline. Please email concierge@blacklabel.life directly.',
      });
    }

    const { history, userMessage, currentPath } = req.body || {};
    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({ error: 'userMessage is required and must be a string' });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const formattedHistory = (history || [])
        .filter((m: any) => m && m.text && !m.isStreaming)
        .map((m: any) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(m.text) }],
        }));

      const contextualUserMessage = `[Visitor is currently on page: ${currentPath || '/'}]\n${userMessage}`;

      // Set SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      });

      const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];
      let streamStarted = false;
      let lastErr: any = null;

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

          for await (const chunk of responseStream) {
            const text = chunk.text || '';
            if (text) {
              streamStarted = true;
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          }

          break; // Successfully streamed with this model
        } catch (err: any) {
          lastErr = err;
          console.warn(`Model ${model} failed, checking fallback:`, err?.message || err);
          if (streamStarted) {
            // Already started sending data, cannot cleanly restart stream
            break;
          }
        }
      }

      if (!streamStarted && lastErr) {
        throw lastErr;
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err: any) {
      console.error('Chat endpoint execution error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err?.message || 'Chat generation failed' });
      } else {
        res.write(`data: ${JSON.stringify({ error: err?.message || 'Chat generation interrupted' })}\n\n`);
        res.end();
      }
    }
  });

  // 4. Client Static & MPA Clean Routing
  if (isProd) {
    const distPath = path.resolve(__dirname, 'dist');

    // Serve static assets from dist
    app.use(express.static(distPath, { maxAge: '1h' }));

    // Clean URLs: handle /social -> /social/index.html, etc.
    app.use((req, res, next) => {
      const cleanPath = req.path.replace(/^\/|\/$/g, '');

      if (cleanPath === '' || cleanPath === 'index') {
        return res.sendFile(path.join(distPath, 'index.html'));
      }

      if (mpaRoutes.includes(cleanPath)) {
        const routeFile = path.join(distPath, cleanPath, 'index.html');
        if (fs.existsSync(routeFile)) {
          return res.sendFile(routeFile);
        }
      }

      if (cleanPath === '404') {
        const notFoundFile = path.join(distPath, '404.html');
        if (fs.existsSync(notFoundFile)) {
          return res.status(404).sendFile(notFoundFile);
        }
      }

      next();
    });

    // Fallback 404 handler for production
    app.use((_req, res) => {
      const notFoundFile = path.join(distPath, '404.html');
      if (fs.existsSync(notFoundFile)) {
        return res.status(404).sendFile(notFoundFile);
      }
      res.status(404).send('Not Found');
    });
  } else {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'custom',
    });

    // Clean URLs in development
    app.use((req, _res, next) => {
      const url = req.url || '';
      const pathname = url.split('?')[0].replace(/^\/|\/$/g, '');
      const query = url.includes('?') ? '?' + url.split('?')[1] : '';

      if (mpaRoutes.includes(pathname)) {
        req.url = `/${pathname}/index.html${query}`;
      } else if (pathname === '404') {
        req.url = `/404.html${query}`;
      }
      next();
    });

    app.use(vite.middlewares);

    // Fallback handler in development to serve the requested index.html or root
    app.use(async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let templatePath = path.resolve(__dirname, 'index.html');
        const pathname = url.split('?')[0].replace(/^\/|\/$/g, '');

        if (mpaRoutes.includes(pathname)) {
          templatePath = path.resolve(__dirname, pathname, 'index.html');
        } else if (pathname === '404') {
          templatePath = path.resolve(__dirname, '404.html');
        }

        if (fs.existsSync(templatePath)) {
          let template = fs.readFileSync(templatePath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
          return;
        }

        next();
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Black Label Server] Running at http://${HOST}:${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Black Label Server] Fatal startup error:', err);
  process.exit(1);
});
