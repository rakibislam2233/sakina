'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { JournalEntry } from '@/types';

interface JournalContextType {
  entries: JournalEntry[];
  loading: boolean;
  refreshEntries: () => Promise<void>;
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (entry: JournalEntry) => void;
  removeEntry: (id: string) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within JournalProvider');
  }
  return context;
}

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshEntries = useCallback(async () => {
    try {
      const response = await fetch('/api/entries');
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

  const addEntry = useCallback((entry: JournalEntry) => {
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const updateEntry = useCallback((entry: JournalEntry) => {
    setEntries((prev) => prev.map((e) => (e.id === entry.id ? entry : e)));
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return (
    <JournalContext.Provider
      value={{ entries, loading, refreshEntries, addEntry, updateEntry, removeEntry }}
    >
      {children}
    </JournalContext.Provider>
  );
}
