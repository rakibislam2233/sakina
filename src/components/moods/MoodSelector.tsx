'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mood, MOOD_MAP } from '@/types';

interface MoodSelectorProps {
  selectedMood: Mood;
  onChange: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onChange }) => {
  const { t } = useTranslation();
  const moods = Object.values(MOOD_MAP);

  return (
    <div className="space-y-3">
      <div className="flex flex-col select-none">
        <label className="font-serif text-sm font-semibold text-foreground">
          {t('moods.header')}
        </label>
        <span className="font-sans text-sm text-muted-foreground mt-0.5">
          {t('moods.subheader')}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {moods.map((m) => {
          const isSelected = selectedMood === m.name;
          const localizedLabel = t(`moods.${m.name}`);
          const localizedDesc = t(`moods.${m.name}Desc`);

          return (
            <button
              key={m.name}
              type="button"
              onClick={() => onChange(m.name)}
              className={`flex flex-col items-start px-2.5 py-3 rounded-md transition-all duration-300 text-left cursor-pointer border min-w-0 ${
                isSelected
                  ? 'bg-muted border-primary/40 shadow-sm ring-1 ring-primary/20'
                  : 'bg-card border-border hover:border-primary/25 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm select-none" role="img" aria-label={localizedLabel}>
                  {m.emoji}
                </span>
                
                <span
                  className={`font-sans text-sm font-semibold tracking-wide ${
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {localizedLabel}
                </span>
              </div>
              <p className="font-sans text-xs leading-tight text-muted-foreground opacity-80 mt-1.5 min-h-[2.5rem] line-clamp-2">
                {localizedDesc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

