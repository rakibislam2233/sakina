export type SakinaThemeId = 'parchment' | 'night' | 'dawn' | 'forest' | 'ocean';

export interface SakinaTheme {
  id: SakinaThemeId;
  name: string;
  nameBn: string;
  emoji: string;
  description: string;
  descriptionBn: string;
}

export const SAKINA_THEMES: SakinaTheme[] = [
  {
    id: 'parchment',
    name: 'Sakina Parchment',
    nameBn: 'সাকীনা কাগজ',
    emoji: '📜',
    description: 'Warm light tones for calm daytime reflection.',
    descriptionBn: 'শান্ত দিনের প্রতিফলনের জন্য উষ্ণ হালকা রঙ।',
  },
  {
    id: 'night',
    name: 'Sakina Night',
    nameBn: 'সাকীনা রাত',
    emoji: '🌙',
    description: 'Soft dark lavender for peaceful evening journaling.',
    descriptionBn: 'শান্ত সন্ধ্যার জন্য নরম গাঢ় ল্যাভেন্ডার।',
  },
  {
    id: 'dawn',
    name: 'Sakina Dawn',
    nameBn: 'সাকীনা ভোর',
    emoji: '🌅',
    description: 'Golden peach hues for hopeful morning clarity.',
    descriptionBn: 'আশাবাদী সকালের জন্য সোনালি পীচ রঙ।',
  },
  {
    id: 'forest',
    name: 'Sakina Forest',
    nameBn: 'সাকীনা বন',
    emoji: '🌿',
    description: 'Earthy greens for grounding and natural balance.',
    descriptionBn: 'মাটির সাথে মিল রেখে প্রশান্তির সবুজ রঙ।',
  },
  {
    id: 'ocean',
    name: 'Sakina Ocean',
    nameBn: 'সাকীনা সমুদ্র',
    emoji: '🌊',
    description: 'Deep teal blues for flow, clarity, and stillness.',
    descriptionBn: 'প্রবাহ, স্পষ্টতা ও নিস্তব্ধতার গভীর নীল-সবুজ।',
  },
];

export const DEFAULT_THEME: SakinaThemeId = 'night';

export function normalizeThemeId(value: string | null): SakinaThemeId {
  if (value === 'dark') return 'night';
  if (value === 'light') return 'parchment';
  if (SAKINA_THEMES.some((t) => t.id === value)) return value as SakinaThemeId;
  return DEFAULT_THEME;
}

export function getThemeById(id: SakinaThemeId): SakinaTheme {
  return SAKINA_THEMES.find((t) => t.id === id) ?? SAKINA_THEMES[1];
}
