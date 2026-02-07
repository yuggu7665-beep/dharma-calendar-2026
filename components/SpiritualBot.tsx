
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';
import { getSpiritualGuidance } from '../services/longcatService';
import { ChatMessage } from '../types';

const SpiritualBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am Dharma Sahayak. My wisdom is now enhanced by the stars. How can I guide you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getSpiritualGuidance(userMessage, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || "The divine flow is quiet right now. Try again later." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered a blockage in the cosmic energy. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full gradient-saffron text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 border-4 border-white animate-bounce-slow"
      >
        <Bot size={32} />
        <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full shadow-md">
          <Sparkles className="text-yellow-500" size={14} />
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 border border-orange-100 overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16 shadow-lg' : 'h-[550px]'}`}>
      <div className="p-4 gradient-saffron text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide">Dharma Sahayak AI</h3>
            {!isMinimized && <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Divine Intelligence</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg">
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-orange-50/50 to-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-orange-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-tighter">Meditating</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your spiritual journey..."
                className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-all active:scale-95 shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpiritualBot;
