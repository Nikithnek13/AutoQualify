
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './UI/Buttons';
import { LogOut, Send, Loader2, Bot, User as UserIcon } from 'lucide-react';
import { chatWithAgent } from '../services/geminiService';
import { LeadResult, ChatMessage } from '../types';

interface UserDashboardProps {
  email: string;
  onLogout: () => void;
  onLeadQualified: (result: LeadResult) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ email, onLogout, onLeadQualified }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      text: "Hi! Welcome to AutoQualify. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await chatWithAgent(messages, input, email);
      if (data) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: data.chatResponse,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botMsg]);
        onLeadQualified(data); // Send live update to admin
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col h-screen overflow-hidden">
      <header className="px-6 h-16 border-b border-white/10 flex items-center justify-between glass z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Bot size={18} />
          </div>
          <div>
            <span className="font-bold tracking-tight block leading-none">AutoQualify</span>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1 block">Agent Active</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Session</p>
            <p className="text-xs text-blue-400 font-mono">{email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${msg.role === 'user' ? 'bg-white/10' : 'bg-blue-600/20'}`}>
                  {msg.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} className="text-blue-400" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'glass border-white/5'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] opacity-40 mt-2 block">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 border border-white/10">
                  <Bot size={14} className="text-blue-400" />
                </div>
                <div className="glass p-4 rounded-2xl border-white/5 flex items-center">
                  <Loader2 size={16} className="animate-spin text-blue-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl shrink-0">
          <div className="relative glass rounded-2xl border border-white/10 p-1 flex items-center shadow-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm placeholder:text-gray-600 text-white"
            />
            <Button 
              size="sm" 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="rounded-xl"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-3 uppercase tracking-widest font-medium">
            Standard AI response time: 0.8s — Autonomous Sales Engine
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
