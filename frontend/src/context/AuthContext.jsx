import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'jobportal.auth';

function loadStoredAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { token: null, user: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => loadStoredAuth());

  const setAuth = useCallback((token, user) => {
    const next = { token, user };
    setAuthState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const clearAuth = useCallback(() => {
    const next = { token: null, user: null };
    setAuthState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const value = useMemo(() => ({
    token: authState.token,
    user: authState.user,
    setAuth,
    clearAuth,
  }), [authState, setAuth, clearAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
