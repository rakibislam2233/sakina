'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Search, Trash2, Calendar, BookOpen, Sparkles, X, Eye } from 'lucide-react';
import { Mood } from '@/types';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/Toast';
import { useJournal } from '@/components/providers/JournalProvider';

function getMoodBadgeClass(mood: Mood) {
  switch (mood) {
    case 'Peaceful':
      return 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25';
    case 'Thoughtful':
      return 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/25';
    case 'Sad':
      return 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25';
    case 'Stressed':
      return 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/25';
    case 'Creative':
      return 'bg-violet-500/10 text-violet-800 dark:text-violet-300 border-violet-500/25';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

export function ChapterListView() {
  const router = useRouter();
  const { entries, removeEntry } = useJournal();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<Mood | 'All'>('All');

  const localeCode = i18n.language === 'bn' ? 'bn-BD' : 'en-US';

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString(localeCode, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch {
      return isoStr;
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm(t('history.deleteConfirm'))) {
      try {
        const response = await fetch(`/api/entries/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete entry.');
        removeEntry(id);
        toast(t('history.deleteSuccess', 'Chapter deleted.'), 'success');
      } catch {
        toast(t('history.deleteError', 'Error trying to delete entry.'), 'error');
      }
    }
  };

  const filteredEntries = entries.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMoodFilter === 'All' || item.mood === selectedMoodFilter;
    return matchesSearch && matchesMood;
  });

  const moodFilters: Array<Mood | 'All'> = ['All', 'Peaceful', 'Thoughtful', 'Sad', 'Stressed', 'Creative'];

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-4xl mx-auto animate-fade-in min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 select-none">
        <div className="min-w-0">
          <h2 className="font-serif text-xl sm:text-2xl font-light text-foreground tracking-tight">
            {t('history.title')}
          </h2>
          <span className="font-sans text-sm text-muted-foreground block mt-0.5">
            {t('history.subtitle')}
          </span>
        </div>

        <div className="font-mono text-xs text-muted-foreground bg-muted/50 py-1.5 px-3 rounded border border-border shrink-0 self-start">
          {t('history.archivedCount', { count: entries.length })}
        </div>
      </div>

      <Card className="flex flex-col md:flex-row gap-3 !p-4 sm:!p-5">
        <div className="flex-1 relative min-w-0">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder={t('history.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-muted/40 border-b border-border pl-9 pr-8 py-2 text-sm rounded-sm font-sans placeholder:text-muted-foreground/60 text-foreground focus:border-primary/30 outline-none transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 p-0.5 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0 -mx-1 px-1">
          <span className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-widest hidden lg:inline shrink-0">
            {t('history.filterByMood')}
          </span>
          {moodFilters.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => setSelectedMoodFilter(mood)}
              className={`px-2.5 py-1 text-sm font-sans font-medium rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedMoodFilter === mood
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {mood === 'All' ? t('moods.all') : t(`moods.${mood}`)}
            </button>
          ))}
        </div>
      </Card>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 sm:py-20 border border-dashed border-border rounded-lg select-none px-4">
          <BookOpen className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3 stroke-[1.5]" />
          <p className="font-serif text-sm text-foreground/70 italic">{t('history.emptyHistory')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-5">
          {filteredEntries.map((entry) => {
            const hasReflection = !!entry.reflectionReply;
            const wordCount = entry.content.trim().split(/\s+/).filter(Boolean).length;

            return (
              <div
                key={entry.id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/chapters/${entry.id}`)}
                onKeyDown={(e) => e.key === 'Enter' && router.push(`/chapters/${entry.id}`)}
                className="group relative rounded-lg bg-card border border-border p-4 sm:p-6 hover:border-primary/25 hover:bg-muted/30 transition-all duration-300 text-left cursor-pointer select-none overflow-hidden min-w-0"
              >
                {hasReflection && (
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-primary/40" />
                )}

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 text-sm font-mono text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{formatDate(entry.createdAt)}</span>
                      </div>

                      <span
                        className={`text-xs font-sans font-bold tracking-widest px-2 py-0.5 rounded uppercase border ${getMoodBadgeClass(entry.mood)}`}
                      >
                        {t(`moods.${entry.mood}`)}
                      </span>

                      {hasReflection && (
                        <span className="flex items-center gap-1 text-xs font-sans text-primary font-medium bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded tracking-wide">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{t('history.hasInsights', 'Insights')}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-medium text-foreground leading-tight group-hover:text-primary transition-colors break-words">
                      {entry.title || t('history.untitled', 'Untitled Sakina Chapter')}
                    </h3>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3 break-words">
                      {entry.content}
                    </p>
                  </div>

                  <div className="flex items-center md:flex-col md:items-end justify-between md:justify-start gap-3 pt-3 md:pt-0 border-t border-border md:border-t-0 shrink-0">
                    <span className="font-mono text-xs text-muted-foreground md:text-right">
                      {wordCount} {t('desk.words', 'words').toUpperCase()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/chapters/${entry.id}`);
                        }}
                        className="p-1.5 bg-muted/50 border border-border rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors uppercase font-mono text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span className="hidden sm:inline">{t('history.btnRead')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, entry.id)}
                        className="p-1.5 bg-destructive/10 border border-destructive/20 rounded text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                        aria-label={t('history.btnDelete')}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
