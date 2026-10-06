import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, User as UserIcon, ArrowRight } from 'lucide-react';

export const SignInScreen = ({ onSuccess }) => {
  const {
    setIsGoogleModalOpen,
    loginWithApple,
    loginWithCredentials,
    registerWithCredentials,
  } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isRegisterMode) {
        if (!name) {
          setErrorMessage('Please enter your name');
          setIsSubmitting(false);
          return;
        }
        await registerWithCredentials(name, email, password);
      } else {
        await loginWithCredentials(email, password);
      }
      if (onSuccess) onSuccess();
    } catch {
      setErrorMessage('Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsSubmitting(true);
    await loginWithCredentials('demo.user@board.io', 'demo123');
    if (onSuccess) onSuccess();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* LEFT SECTION: Board Branding */}
      <div className="w-full lg:w-[42%] lg:min-h-screen bg-[#000000] flex items-center justify-center p-8 lg:p-16 text-white shrink-0 relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10 text-center lg:text-left">
          <h1 className="font-montserrat font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white select-none">
            Board.
          </h1>
          <p className="mt-3 text-slate-400 text-sm max-w-xs mx-auto lg:mx-0 font-normal">
            Real-time business analytics and executive schedule management.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-[385px]">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-black">
              {isRegisterMode ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {isRegisterMode
                ? 'Register your account to access Board'
                : 'Sign in to your account'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => setIsGoogleModalOpen(true)}
              className="flex items-center justify-center gap-2.5 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-[#858585] font-medium transition-all shadow-xs active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="truncate">Sign in with Google</span>
            </button>

            {/* Apple Sign In */}
            <button
              type="button"
              onClick={loginWithApple}
              className="flex items-center justify-center gap-2.5 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-[#858585] font-medium transition-all shadow-xs active:scale-[0.98]"
            >
              <svg className="w-4 h-4 shrink-0 fill-current text-black" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.85-11.75-14.44-6.3-9.98-11.19-21.75-14.67-35.3-3.48-13.56-5.22-26.11-5.22-37.66 0-16.14 4.02-29.56 12.06-40.26 8.04-10.7 18.25-16.16 30.63-16.38 5.76 0 11.74 1.37 17.94 4.11 6.2 2.74 10.22 4.17 12.06 4.3 2.12-.13 6.46-1.63 13.02-4.51 6.56-2.88 12.51-4.22 17.85-4.01 10.11.43 18.8 3.86 26.07 10.29 4.35 3.8 7.78 8.44 10.29 13.91-9.13 5.54-13.63 13.15-13.5 22.82.11 8.04 3.26 14.89 9.46 20.54 6.2 5.65 13.58 9 22.14 10.05-1.96 6.09-4.35 12.39-7.18 18.91zM119.22 31.84c0-7.72 2.72-14.99 8.16-21.82 5.43-6.83 12.28-10.82 20.54-11.97.22 1.3.33 2.5.33 3.59 0 7.61-2.93 15-8.8 22.17-5.87 7.17-12.83 11.08-20.87 11.73-.21-1.09-.36-2.32-.36-3.7z" />
              </svg>
              <span className="truncate">Sign in with Apple</span>
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100">
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nithin Babu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F5F5F5] border-0 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="johndoe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-0 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-0 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isRegisterMode && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo registered email.')}
                    className="text-xs text-[#346BD4] hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#000000] hover:bg-neutral-800 active:scale-[0.99] text-white font-montserrat font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : isRegisterMode ? 'Sign Up' : 'Sign In'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {/* Toggle between Register and Sign In */}
          <div className="text-center mt-5 text-xs text-slate-500">
            {isRegisterMode ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="text-[#346BD4] font-medium hover:underline ml-0.5"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="text-[#346BD4] font-medium hover:underline ml-0.5"
                >
                  Register here
                </button>
              </>
            )}
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Quick Test:</span>
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="text-xs font-semibold text-slate-700 hover:text-black bg-slate-200/60 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Explore Dashboard Demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
