
import React, { useState } from 'react';
import { Button } from './UI/Buttons';
import { Mail, Lock, ShieldCheck, ArrowLeft, User, Shield, Loader2 } from 'lucide-react';
import { UserRole } from '../types';

interface AuthPageProps {
  onBack: () => void;
  onSignUp: (role: UserRole, email: string) => void;
  onLogin: (role: UserRole, email: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack, onSignUp, onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API delay for sending verification email
    setTimeout(() => {
      if (isSignUp) {
        onSignUp(role, email);
      } else {
        onLogin(role, email);
      }
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none"></div>
      
      <div className="absolute top-10 left-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Secure Access</h2>
          <p className="text-gray-400 mt-2">Enterprise-grade Authentication</p>
        </div>

        <div className="glass p-1 rounded-xl mb-6 flex">
          <button
            onClick={() => setRole(UserRole.USER)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === UserRole.USER 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <User size={16} />
            User Login
          </button>
          <button
            onClick={() => setRole(UserRole.ADMIN)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === UserRole.ADMIN 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Shield size={16} />
            Admin Login
          </button>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm text-white"
                  required
                />
              </div>
            </div>

            <Button className="w-full py-4 text-sm tracking-wide" type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <><Loader2 className="animate-spin mr-2" size={18} /> {isSignUp ? 'Sending verification...' : 'Authenticating...'}</>
              ) : (
                isSignUp ? 'Create Account' : `Sign In as ${role === UserRole.ADMIN ? 'Admin' : 'User'}`
              )}
            </Button>

            <p className="text-center text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
