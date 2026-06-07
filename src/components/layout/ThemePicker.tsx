'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import type { SakinaThemeId } from '@/lib/themes';
import { cn } from '@/lib/utils';

export function ThemePicker() {
  const { i18n } = useTranslation();
  const { theme, themes, setTheme, themeConfig } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isBn = i18n.language === 'bn';

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-8 px-2.5 rounded-md hover:bg-accent/50 text-primary border border-border text-xs font-medium transition-colors cursor-pointer"
        title={isBn ? 'থিম পরিবর্তন' : 'Change theme'}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{themeConfig.emoji}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-popover text-popover-foreground shadow-lg z-50 py-1 animate-fade-in"
        >
          <p className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
            {isBn ? 'সাকীনা থিম' : 'Sakina Themes'}
          </p>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              role="option"
              aria-selected={theme === t.id}
              onClick={() => {
                setTheme(t.id as SakinaThemeId);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-start gap-2.5 px-3 py-2 text-left text-xs hover:bg-accent/40 transition-colors cursor-pointer',
                theme === t.id && 'bg-accent/25',
              )}
            >
              <span className="text-base leading-none mt-0.5">{t.emoji}</span>
              <span className="flex-1 min-w-0">
                <span className="font-medium block text-foreground">
                  {isBn ? t.nameBn : t.name}
                </span>
                <span className="text-sm text-muted-foreground leading-snug block mt-0.5">
                  {isBn ? t.descriptionBn : t.description}
                </span>
              </span>
              {theme === t.id && <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
