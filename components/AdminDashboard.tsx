
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Activity,
  Zap,
  Target,
  BarChart3,
  Mail,
  MessageSquare
} from 'lucide-react';
import { LeadResult } from '../types';
import { Button } from './UI/Buttons';

interface AdminDashboardProps {
  onLogout: () => void;
  liveUpdates: LeadResult[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, liveUpdates }) => {
  return (
    <div className="min-h-screen bg-[#050505] flex text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 hidden lg:flex shrink-0">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-7 h-7 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center">
            <Target size={16} />
          </div>
          <span className="font-bold text-lg tracking-tight">AutoQualify</span>
        </div>
        <nav className="space-y-1 flex-1">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Agent Feed" active />
          <SidebarItem icon={<Activity size={18} />} label="Analytics" />
          <SidebarItem icon={<Users size={18} />} label="Lead Queue" />
          <div className="pt-10 mb-4 px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Configuration</div>
          <SidebarItem icon={<Settings size={18} />} label="AI Logic" />
        </nav>
        <button onClick={onLogout} className="mt-auto flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-white transition-colors group">
          <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
          <span className="font-medium text-sm group-hover:text-white transition-colors">Log Out</span>
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between shrink-0 bg-[#050505]/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold uppercase tracking-widest text-gray-400">Admin Dashboard</h1>
            <span className="h-4 w-px bg-white/10 mx-2"></span>
            <span className="text-xs text-green-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Agent Monitoring
            </span>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input type="text" placeholder="Search leads..." className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs outline-none w-48 focus:w-64 transition-all" />
            </div>
            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block"><Bell size={18} /></button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 border border-white/20 hidden xs:block"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout} 
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut size={16} className="sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatBox icon={<Zap className="text-yellow-500" />} label="Live Signals" value={liveUpdates.length} />
            <StatBox icon={<Target className="text-green-500" />} label="High Intent Leads" value={liveUpdates.filter(l => l.adminInsight.interested === 'YES').length} />
            <StatBox icon={<BarChart3 className="text-blue-500" />} label="System Uptime" value="99.9%" />
          </div>

          {/* Structured Lead Feed */}
          <div className="glass rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-gray-300">
                <TrendingUp size={16} className="text-blue-500" />
                Live Standardized Insights
              </h3>
              <div className="text-[10px] text-gray-500 font-mono">ROLE: ADMIN (READ-ONLY)</div>
            </div>
            
            <div className="p-0">
              {liveUpdates.length === 0 ? (
                <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 border-dashed">
                    <Activity size={24} className="text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium italic">Establishing websocket connection to AutoQualify agent...</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {liveUpdates.slice().reverse().map((item) => (
                    <div key={item.id} className="p-8 hover:bg-white/[0.02] transition-all">
                      <div className="flex flex-col gap-6">
                        {/* Header: User Email and Timestamp */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                              <Mail size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">User Email</p>
                              <p className="text-lg font-bold text-white break-all sm:break-normal">{item.adminInsight.userEmail}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-gray-600 bg-white/5 px-2 py-1 rounded border border-white/5 shrink-0 ml-2">{item.timestamp}</span>
                        </div>

                        {/* Last Message Section */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                          <div className="flex items-center gap-2 mb-2 text-gray-500">
                            <MessageSquare size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Last Message</span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed italic">"{item.adminInsight.lastMessage}"</p>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <AdminField 
                            label="Lead Score" 
                            value={`${item.adminInsight.score}/100`} 
                            accent={item.adminInsight.score >= 70 ? 'text-green-400' : 'text-blue-400'} 
                          />
                          <AdminField 
                            label="Interested in Buying" 
                            value={item.adminInsight.interested} 
                            accent={item.adminInsight.interested === 'YES' ? 'text-green-500' : 'text-red-500'} 
                          />
                          <AdminField 
                            label="Lead Status" 
                            value={item.adminInsight.status} 
                            accent={item.adminInsight.status === 'Pursuable' ? 'text-green-400' : 'text-yellow-400'} 
                          />
                        </div>

                        {/* Secondary Details */}
                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Intent:</span>
                            <span className="text-xs text-gray-400">{item.adminInsight.detectedIntent}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                            <span>REASONING:</span>
                            <span className="text-gray-400 truncate max-w-[250px] sm:max-w-xs">{item.adminInsight.reasoning}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: any) => (
  <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {icon}
    <span className="font-semibold text-xs uppercase tracking-widest">{label}</span>
  </a>
);

const StatBox = ({ icon, label, value }: any) => (
  <div className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
      <h4 className="text-xl font-bold tracking-tight">{value}</h4>
    </div>
  </div>
);

const AdminField = ({ label, value, accent }: { label: string, value: string | number, accent: string }) => (
  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-lg font-bold tracking-tight ${accent}`}>{value}</p>
  </div>
);

export default AdminDashboard;
