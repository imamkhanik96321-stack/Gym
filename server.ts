import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Gemini initialization helper
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return aiClient;
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Chat Assistant Route
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { prompt, userRole } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.json({
          reply: `[PulseAI Engine] Here is a custom recommendation for "${prompt}":\n\n1. Maintain progressive overload (+2.5kg per week).\n2. Consume 2.0g protein per kg of bodyweight.\n3. Ensure 7.5 hours of continuous deep sleep for optimal CNS recovery.`,
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are PulseAI, a premier fitness and exercise scientist for ApexGym SaaS. Provide concise, expert, scientific workout and nutrition guidance in under 120 words.\nUser Query: ${prompt}`,
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error('AI Chat Error:', error);
      res.json({
        reply: `💪 PulseAI Fitness Guide:\n- Perform 3 to 4 working sets near mechanical failure.\n- Prioritize whole foods: chicken breast, eggs, salmon, rice, oats, and leafy greens.\n- Stay hydrated with 3.5+ liters of water daily.`,
      });
    }
  });

  // Vite Middleware for development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApexGym SaaS server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
