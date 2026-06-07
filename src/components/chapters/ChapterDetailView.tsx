'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Trash2, Edit2, Clock } from 'lucide-react';
import { JournalEntry, Mood, AIReflectionResponse } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/Toast';
import { useJournal } from '@/components/providers/JournalProvider';
import { SakinaInsights } from '@/components/chapters/SakinaInsights';

interface ChapterDetailViewProps {
  entryId: string;
}

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

export function ChapterDetailView({ entryId }: ChapterDetailViewProps) {
  const router = useRouter();
  const { entries, updateEntry, removeEntry } = useJournal();
  const entry = entries.find((e) => e.id === entryId) ?? null;
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (entry) {
      setEditTitle(entry.title);
      setEditContent(entry.content);
      setIsEditing(false);
    }
  }, [entry]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [entry]);

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 select-none px-4">
        <p className="font-serif text-sm italic text-muted-foreground select-none animate-pulse text-center">
          {t('history.loadedWarning', 'No chapter was loaded. Returning back...')}
        </p>
        <Button onClick={() => router.push('/chapters')} size="sm" variant="outline" className="mt-4">
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          <span>{t('nav.back')}</span>
        </Button>
      </div>
    );
  }

  let aiReflection: AIReflectionResponse | null = null;
  if (entry.reflectionReply) {
    try {
      aiReflection = JSON.parse(entry.reflectionReply);
    } catch {
      // Ignored
    }
  }

  const getMoodConfig = (mood: Mood) => {
    const isBn = i18n.language === 'bn';
    const names: Record<Mood, { en: string; bn: string; emoji: string }> = {
      Peaceful: { en: 'Peaceful', bn: 'প্রশান্ত', emoji: '🍃' },
      Thoughtful: { en: 'Thoughtful', bn: 'চিন্তামগ্ন', emoji: '💭' },
      Sad: { en: 'Sad', bn: 'বিষাদময়', emoji: '🌧️' },
      Stressed: { en: 'Stressed', bn: 'ক্লান্ত/ব্যতিব্যস্ত', emoji: '⚡' },
      Creative: { en: 'Creative', bn: 'সৃজনশীল', emoji: '✨' },
    };
    const cfg = names[mood] ?? names.Peaceful;
    return {
      emoji: cfg.emoji,
      badgeClass: getMoodBadgeClass(mood),
      localizedName: isBn ? cfg.bn : cfg.en,
    };
  };

  const moodConfig = getMoodConfig(entry.mood);
  const localeCode = i18n.language === 'bn' ? 'bn-BD' : 'en-US';

  const handleUpdate = async () => {
    if (editContent.trim().length < 10) {
      toast(t('desk.characterWarning'), 'error');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/entries/${entry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!response.ok) throw new Error('Failed to save journal updates.');

      const updated = await response.json();
      updateEntry(updated);
      setIsEditing(false);
      toast(t('desk.draftSaved'), 'success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error occurred while saving.';
      toast(message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSelf = async () => {
    if (confirm(t('history.deleteConfirm'))) {
      try {
        const response = await fetch(`/api/entries/${entry.id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Deletion request failed.');
        removeEntry(entry.id);
        toast(t('history.deleteSuccess', 'Chapter deleted.'), 'success');
        router.push('/chapters');
      } catch {
        toast(t('history.deleteError', 'Error trying to delete entry.'), 'error');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12 sm:pb-16 min-w-0"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 select-none">
        <Button
          onClick={() => router.push('/chapters')}
          variant="outline"
          size="sm"
          className="group transition-all duration-300 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>{t('nav.back')}</span>
        </Button>

        <span className="font-mono text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border">
          {t('nav.view')}
        </span>
      </div>

      <Card className="glass-panel-elevated relative overflow-hidden space-y-5 sm:space-y-6">
        <div className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-4 pb-4 border-b border-border">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>
                {new Date(entry.createdAt).toLocaleDateString(localeCode, {
                  weekday: 'short',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono sm:border-l sm:border-border sm:pl-3">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>
                {new Date(entry.createdAt).toLocaleTimeString(localeCode, {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </span>
            </div>

            <span
              className={`text-xs font-sans font-bold tracking-widest px-2.5 py-0.5 rounded uppercase border select-none flex items-center gap-1 ${moodConfig.badgeClass}`}
            >
              <span>{moodConfig.emoji}</span>
              <span>{moodConfig.localizedName}</span>
            </span>
          </div>

          {!isEditing && (
            <div className="flex flex-wrap items-center gap-2 select-none">
              <Button variant="outline" size="xs" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-3 h-3 mr-1.5" />
                <span>{t('nav.edit')}</span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                onClick={handleDeleteSelf}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-1.5" />
                <span>{t('nav.delete')}</span>
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4 min-w-0">
          {!isEditing ? (
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground break-words">
              {entry.title || t('history.untitled', 'Untitled Chapter Reflection')}
            </h1>
          ) : (
            <div className="space-y-1.5">
              <label className="font-sans text-xs uppercase font-bold text-muted-foreground">
                {t('desk.fieldTitle')}
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg py-2.5 px-4 font-serif text-base text-foreground focus:border-primary/40 focus:bg-card outline-none transition-all duration-300"
                placeholder={t('desk.placeholderTitle')}
              />
            </div>
          )}

          {!isEditing ? (
            <div className="font-serif text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed whitespace-pre-wrap select-text selection:bg-primary/20 font-light tracking-wide pt-2 sm:pt-4 max-w-3xl border-l-2 border-primary/15 pl-4 sm:pl-6 my-4 sm:my-6 italic break-words">
              {entry.content}
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="font-sans text-xs uppercase font-bold text-muted-foreground">
                {t('desk.fieldThoughts')}
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={10}
                className="w-full bg-muted/50 border border-border rounded-lg p-4 font-sans text-sm text-foreground focus:border-primary/40 focus:bg-card outline-none tracking-wide leading-relaxed resize-y min-h-[200px] transition-all duration-300"
                placeholder={t('desk.placeholderThoughts')}
              />
            </div>
          )}

          {isEditing && (
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">
                {t('nav.cancel')}
              </Button>
              <Button type="button" variant="primary" size="sm" isLoading={isSaving} onClick={handleUpdate} className="w-full sm:w-auto">
                {t('nav.save')}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {aiReflection && !isEditing && <SakinaInsights reflection={aiReflection} />}
    </motion.div>
  );
}
