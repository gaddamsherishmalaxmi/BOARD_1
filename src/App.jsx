/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SignInScreen } from './components/SignInScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { Layers, CheckCircle2 } from 'lucide-react';

const MainApp = () => {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('signin');

  useEffect(() => {
    if (user) {
      setCurrentScreen('dashboard');
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      {/* Top Floating Screen Switcher for reviewer inspection */}
      <aside aria-label="Reviewer inspection toolbar" className="sticky top-0 z-40 bg-black/90 backdrop-blur-md text-white py-2 px-4 border-b border-white/10 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-montserrat font-bold tracking-tight">Figma 2-Screen Viewer:</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 p-0.5 rounded-lg">
          <button
            onClick={() => setCurrentScreen('signin')}
            className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
              currentScreen === 'signin'
                ? 'bg-white text-black shadow-xs font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Screen 1: Sign In</span>
          </button>

          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
              currentScreen === 'dashboard'
                ? 'bg-white text-black shadow-xs font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Screen 2: Dashboard</span>
            {user && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-300 text-[11px]">
          {user ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>{user.email}</span>
            </span>
          ) : (
            <span className="text-slate-400">Not authenticated (Guest)</span>
          )}
        </div>
      </aside>

      {/* Screen Rendering */}
      {currentScreen === 'signin' ? (
        <SignInScreen onSuccess={() => setCurrentScreen('dashboard')} />
      ) : (
        <DashboardScreen onSwitchToAuth={() => setCurrentScreen('signin')} />
      )}

      {/* Google Authentication Dialog */}
      <GoogleAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
