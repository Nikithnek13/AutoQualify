
import React from 'react';
import { Button } from './UI/Buttons';
import { ChevronRight, Zap, Target, BarChart3, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Target size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AutoQualify</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Safety</a>
        </div>
        <Button variant="outline" size="sm" onClick={onStart}>Admin Login</Button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
          <Zap size={12} />
          Now with Intent-Based Scoring
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl mx-auto leading-[0.95] text-white">
          Qualify Sales Leads <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Autonomously</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Deploy an intelligent agent that analyzes conversation intent, buying signals, and business needs in real-time. No manual filtering required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={onStart} className="bg-blue-600 hover:bg-blue-500 min-w-[200px]">
            Deploy Agent <ChevronRight className="ml-2" size={20} />
          </Button>
          <Button variant="outline" size="lg" className="min-w-[200px]">View Analytics Demo</Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          <div className="p-8 glass rounded-3xl border border-white/5">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
              <Target size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Intent Scoring</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Automatic point-based scoring based on product interest, timeline, and decision-making language.</p>
          </div>
          <div className="p-8 glass rounded-3xl border border-white/5">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-6 border border-indigo-500/20">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Live Feed</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Admins receive standardized real-time updates for every user interaction with high-fit surfacing.</p>
          </div>
          <div className="p-8 glass rounded-3xl border border-white/5">
            <div className="w-12 h-12 bg-green-600/10 rounded-2xl flex items-center justify-center text-green-500 mb-6 border border-green-500/20">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Safe Filtering</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Detects curiosity vs. true intent. Automatically ignores job seekers, students, and low-fit inquiries.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
