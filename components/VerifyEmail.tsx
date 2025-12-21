
import React, { useState, useEffect } from 'react';
import { Button } from './UI/Buttons';
import { MailOpen, CheckCircle, Loader2, RefreshCw, AlertCircle } from 'lucide-react';

interface VerifyEmailProps {
  email: string;
  onVerified: () => void;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, onVerified }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showResendSuccess, setShowResendSuccess] = useState(false);

  useEffect(() => {
    let timer: number;
    if (resendCooldown > 0) {
      timer = window.setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulating API call to check verification status
    setTimeout(() => {
      setIsVerifying(false);
      onVerified();
    }, 2000);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    
    // Simulate sending a new verification email
    setShowResendSuccess(true);
    setResendCooldown(60);
    setTimeout(() => setShowResendSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none"></div>
      
      <div className="glass max-w-lg w-full p-8 md:p-12 rounded-[2.5rem] text-center border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.1)] relative z-10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 blur-3xl rounded-full"></div>

        <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 shadow-inner">
          <MailOpen className="text-blue-500 animate-pulse" size={44} />
        </div>
        
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-white">Check your inbox</h2>
        
        <p className="text-gray-400 mb-2 font-medium">
          A verification link has been sent to:
        </p>
        <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-blue-400 font-mono text-sm mb-8 shadow-sm">
          {email || 'your-email@example.com'}
        </div>
        
        <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
          Please click the unique link in that email to confirm your identity and activate your AutoQualify account.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full py-4 text-md shadow-lg shadow-blue-600/20" 
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <><Loader2 className="animate-spin mr-2" size={20} /> Authenticating...</>
            ) : (
              <><CheckCircle className="mr-2" size={20} /> I've Verified My Email</>
            )}
          </Button>
          
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                resendCooldown > 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'
              }`}
            >
              <RefreshCw size={16} className={resendCooldown > 0 ? '' : 'hover:rotate-180 transition-transform duration-500'} />
              {resendCooldown > 0 ? `Resend email in ${resendCooldown}s` : "Didn't receive it? Resend"}
            </button>
            
            {showResendSuccess && (
              <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={14} />
                New verification link dispatched!
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <ShieldCheck size={12} className="text-blue-500/50" />
          Secure Enterprise Protocol 2.4.0
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default VerifyEmail;
