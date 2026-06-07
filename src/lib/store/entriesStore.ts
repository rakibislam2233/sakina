import { DUMMY_ENTRIES } from '@/lib/data/dummyEntries';
import { JournalEntry } from '@/types';

let entries: JournalEntry[] = [...DUMMY_ENTRIES];

export function getEntries(): JournalEntry[] {
  return entries;
}

export function getEntryById(id: string): JournalEntry | undefined {
  return entries.find((e) => e.id === id);
}

export function addEntry(entry: JournalEntry): JournalEntry {
  entries = [entry, ...entries];
  return entry;
}

export function updateEntry(id: string, updates: Partial<JournalEntry>): JournalEntry | null {
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated: JournalEntry = { ...entries[index], ...updates };
  if (updates.content !== undefined) {
    updated.wordCount = updates.content.trim().split(/\s+/).filter(Boolean).length;
  }
  entries[index] = updated;
  return updated;
}

export function deleteEntry(id: string): boolean {
  const before = entries.length;
  entries = entries.filter((e) => e.id !== id);
  return entries.length < before;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
