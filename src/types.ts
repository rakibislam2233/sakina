export type Mood = 'Peaceful' | 'Thoughtful' | 'Sad' | 'Stressed' | 'Creative';

export interface MoodConfig {
  name: Mood;
  label: string;
  description: string;
  emoji: string;
  colorLight: string;
  colorDark: string;
  borderColor: string;
  bgGlow: string;
}

export const MOOD_MAP: Record<Mood, MoodConfig> = {
  Peaceful: {
    name: 'Peaceful',
    label: 'Peaceful (Feeling quiet, relaxed, and at ease)',
    description: 'Feeling quiet, relaxed, and at ease',
    emoji: '🍃',
    colorLight: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    colorDark: 'text-emerald-300 bg-emerald-950/40 border-emerald-800/30',
    borderColor: 'border-emerald-500/20',
    bgGlow: 'bg-emerald-400',
  },
  Thoughtful: {
    name: 'Thoughtful',
    label: 'Thoughtful (Introspective, pondering, or deep)',
    description: 'Introspective, pondering, or deep',
    emoji: '💭',
    colorLight: 'text-sky-600 bg-sky-50 border-sky-100',
    colorDark: 'text-sky-300 bg-sky-950/40 border-sky-800/30',
    borderColor: 'border-sky-500/20',
    bgGlow: 'bg-sky-400',
  },
  Sad: {
    name: 'Sad',
    label: 'Sad (Poetic nostalgia, sorrowful, or soft tears)',
    description: 'Poetic nostalgia, sorrowful, or soft tears',
    emoji: '🌧️',
    colorLight: 'text-slate-600 bg-slate-100 border-slate-200',
    colorDark: 'text-slate-300 bg-slate-900/40 border-slate-800/30',
    borderColor: 'border-slate-500/20',
    bgGlow: 'bg-slate-400',
  },
  Stressed: {
    name: 'Stressed',
    label: 'Stressed (Anxious thoughts or dynamic high-gear)',
    description: 'Anxious thoughts or dynamic high-gear',
    emoji: '⚡',
    colorLight: 'text-rose-600 bg-rose-50 border-rose-100',
    colorDark: 'text-rose-300 bg-rose-950/40 border-rose-800/30',
    borderColor: 'border-rose-500/20',
    bgGlow: 'bg-rose-400',
  },
  Creative: {
    name: 'Creative',
    label: 'Creative (Luminous ideas, motivated, bursting)',
    description: 'Luminous ideas, motivated, bursting',
    emoji: '✨',
    colorLight: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    colorDark: 'text-indigo-300 bg-indigo-950/40 border-indigo-800/30',
    borderColor: 'border-indigo-500/20',
    bgGlow: 'bg-indigo-400',
  },
};

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
  wordCount: number;
  reflectionPrompt?: string;
  reflectionReply?: string;
}

export interface QuranVerse {
  surah_name: string;
  verse_number: string;
  arabic: string;
  translation: string;
  resonance: string;
}

export interface HadithNarration {
  source: string;
  narration: string;
  resonance: string;
}

export interface SpiritualTranquility {
  quran_verses: QuranVerse[];
  hadith_narrations: HadithNarration[];
}

export interface ScholarQuote {
  scholar_name: string;
  quote: string;
}

export interface ExtensiveBookCuration {
  title: string;
  author: string;
  language_type: string;
  why_it_helps: string;
}

export interface VoicesOfWisdom {
  scholar_quotes: ScholarQuote[];
  extensive_book_shelf: ExtensiveBookCuration[];
}

export interface AIReflectionResponse {
  companion_embrace: string;
  spiritual_tranquility: SpiritualTranquility;
  voices_of_wisdom: VoicesOfWisdom;
  title_suggestion: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  joinedDate: string;
  dailyGoalWords: number;
  mindfulnessQuote: string;
  notificationsEnabled: boolean;
  selectedAuraGoal: string;
}
