import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const result = await authService.signInWithEmail(email, password);
    return result;
  };

  const signup = async (email, password, displayName) => {
    const result = await authService.signUpWithEmail(email, password, displayName);
    return result;
  };

  const loginAnonymously = async () => {
    const result = await authService.signInAnonymously();
    return result;
  };

  const logout = async () => {
    const result = await authService.signOut();
    if (result.success) {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
    return result;
  };

  const getUserDisplayName = () => {
    return authService.getUserDisplayName();
  };

  const isAnonymous = () => {
    return currentUser ? currentUser.isAnonymous : false;
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    signup,
    loginAnonymously,
    logout,
    getUserDisplayName,
    isAnonymous
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}