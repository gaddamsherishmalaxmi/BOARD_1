import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const STORAGE_KEY = 'board_dashboard_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const loginWithGoogle = async (customEmail, customName) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const email = customEmail || 'tnithinbabu@gmail.com';
    const name = customName || (email.split('@')[0] ? email.split('@')[0].replace('.', ' ') : 'Nithin Babu');

    const googleUser = {
      id: 'g_' + Math.random().toString(36).substring(2, 9),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      provider: 'google',
      createdAt: new Date().toISOString(),
    };

    saveUserSession(googleUser);
    setIsLoading(false);
    setIsGoogleModalOpen(false);
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const appleUser = {
      id: 'apple_' + Math.random().toString(36).substring(2, 9),
      name: 'Apple User',
      email: 'user@icloud.com',
      provider: 'apple',
      createdAt: new Date().toISOString(),
    };

    saveUserSession(appleUser);
    setIsLoading(false);
  };

  const loginWithCredentials = async (email, password) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    const username = email.split('@')[0] || 'User';
    const credUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: email,
      provider: 'credentials',
      createdAt: new Date().toISOString(),
    };

    saveUserSession(credUser);
    setIsLoading(false);
    return true;
  };

  const registerWithCredentials = async (name, email, password) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    const regUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: name,
      email: email,
      provider: 'credentials',
      createdAt: new Date().toISOString(),
    };

    saveUserSession(regUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithApple,
        loginWithCredentials,
        registerWithCredentials,
        logout,
        isGoogleModalOpen,
        setIsGoogleModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
