'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (user: AuthUser, options?: { password?: string }) => void;
  signOut: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  changePassword: (currentPassword: string, newPassword: string) => { ok: true } | { ok: false; message: string };
  deleteAccount: () => void;
  hasStoredPassword: () => boolean;
}

const CREDENTIAL_KEY = 'sakina_credential';

function readStoredPassword(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CREDENTIAL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { password?: string };
    return parsed.password ?? null;
  } catch {
    return null;
  }
}

function writeStoredPassword(password: string) {
  localStorage.setItem(CREDENTIAL_KEY, JSON.stringify({ password }));
}

function clearAccountStorage() {
  localStorage.removeItem('sakina_user');
  localStorage.removeItem('sakina_profile');
  localStorage.removeItem(CREDENTIAL_KEY);
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sakina_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('sakina_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback((authUser: AuthUser, options?: { password?: string }) => {
    setUser(authUser);
    localStorage.setItem('sakina_user', JSON.stringify(authUser));
    if (options?.password) {
      writeStoredPassword(options.password);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sakina_user');
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      localStorage.setItem('sakina_user', JSON.stringify(next));
      return next;
    });
  }, []);

  const changePassword = useCallback((currentPassword: string, newPassword: string) => {
    const stored = readStoredPassword();
    if (stored && stored !== currentPassword) {
      return { ok: false as const, message: 'Current password is incorrect.' };
    }
    if (newPassword.length < 6) {
      return { ok: false as const, message: 'New password must be at least 6 characters.' };
    }
    writeStoredPassword(newPassword);
    return { ok: true as const };
  }, []);

  const deleteAccount = useCallback(() => {
    setUser(null);
    clearAccountStorage();
  }, []);

  const hasStoredPassword = useCallback(() => !!readStoredPassword(), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        updateUser,
        changePassword,
        deleteAccount,
        hasStoredPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
