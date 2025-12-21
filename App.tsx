
import React, { useState } from 'react';
import { ViewState, UserRole, LeadResult } from './types';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import VerifyEmail from './components/VerifyEmail';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [role, setRole] = useState<UserRole | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [leadUpdates, setLeadUpdates] = useState<LeadResult[]>([]);

  const handleStart = () => {
    setView(ViewState.AUTH);
  };

  const handleSignUp = (selectedRole: UserRole, email: string) => {
    setRole(selectedRole);
    setCurrentUserEmail(email);
    setView(ViewState.VERIFY_EMAIL);
  };

  const handleLogin = (selectedRole: UserRole, email: string) => {
    setRole(selectedRole);
    setCurrentUserEmail(email);
    // Simulation: Mandatory verification check for all new sessions
    setView(ViewState.VERIFY_EMAIL);
  };

  const handleVerified = () => {
    if (role === UserRole.ADMIN) {
      setView(ViewState.ADMIN_DASHBOARD);
    } else {
      setView(ViewState.USER_DASHBOARD);
    }
  };

  const handleLogout = () => {
    setRole(null);
    setCurrentUserEmail('');
    setView(ViewState.LANDING);
  };

  const handleBack = () => {
    setView(ViewState.LANDING);
  };

  const onLeadQualified = (result: LeadResult) => {
    setLeadUpdates(prev => [...prev, result]);
  };

  switch (view) {
    case ViewState.AUTH:
      return <AuthPage onBack={handleBack} onSignUp={handleSignUp} onLogin={handleLogin} />;
    case ViewState.VERIFY_EMAIL:
      return <VerifyEmail email={currentUserEmail} onVerified={handleVerified} />;
    case ViewState.USER_DASHBOARD:
      return <UserDashboard email={currentUserEmail} onLogout={handleLogout} onLeadQualified={onLeadQualified} />;
    case ViewState.ADMIN_DASHBOARD:
      return <AdminDashboard onLogout={handleLogout} liveUpdates={leadUpdates} />;
    case ViewState.LANDING:
    default:
      return <LandingPage onStart={handleStart} />;
  }
};

export default App;
