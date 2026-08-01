import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, X, Send, Bot, User, Loader2, Dumbbell, Utensils, Zap } from 'lucide-react';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello ${currentUser?.name || 'Athlete'}! I am PulseAI, your dedicated Gym & Fitness Consultant. Ask me anything about workout routines, nutrition macros, or exercise form tips.`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Suggest a 400-calorie high-protein post-workout meal',
    'How do I improve my bench press plateau?',
    'Calculate target calories for fat loss at 80kg',
    'Quick 20-min HIIT workout plan',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, userRole: currentUser?.role }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.reply || 'Here is your custom AI fitness recommendation.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('Fallback mode');
      }
    } catch {
      // Local fallback response
      let fallbackText = `Here is a custom recommendation for "${query}":\n\n1. Maintain progressive overload (+2.5kg per week).\n2. Consume 2.0g protein per kg of bodyweight.\n3. Ensure 7.5 hours of continuous deep sleep for optimal CNS recovery.`;
      if (query.toLowerCase().includes('meal') || query.toLowerCase().includes('protein')) {
        fallbackText = `💪 High-Protein Meal Recommendation:\n- 200g Grilled Chicken Breast or Paneer (45g protein)\n- 150g Boiled Quinoa or Brown Rice (40g carbs)\n- Steamed Broccoli & 1 tbsp Olive Oil (12g healthy fats)\nTotal: ~450 kcal, 48g Protein.`;
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: fallbackText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 text-black shadow-lg shadow-orange-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                PulseAI Gym Assistant
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Gemini 2.5 Active
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Smart Workouts, Macro Calculator & Science-backed Guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="p-3 bg-zinc-900/40 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="shrink-0 text-[11px] px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-zinc-300 hover:text-orange-300 transition-all cursor-pointer"
            >
              ⚡ {qp}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-orange-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-orange-500 text-black font-medium rounded-tr-none shadow-md'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span
                  className={`text-[9px] mt-1.5 block ${
                    m.sender === 'user' ? 'text-black/70 text-right' : 'text-zinc-500'
                  }`}
                >
                  {m.time}
                </span>
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-orange-400 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>PulseAI is compiling exercise data & nutrition specs...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask PulseAI about workouts, nutrition, or gym advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
