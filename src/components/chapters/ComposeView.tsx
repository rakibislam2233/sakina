'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { journalLogSchema, JournalLogFormData } from '@/lib/validations/logSchema';
import { AIReflectionResponse } from '@/types';
import { MoodSelector } from '@/components/moods/MoodSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/Toast';
import { useJournal } from '@/components/providers/JournalProvider';
import { ComposeSkeleton } from '@/components/chapters/ComposeSkeleton';
import { SakinaInsights } from '@/components/chapters/SakinaInsights';

const LOADING_MESSAGES = [
  'Consulting the silent night wind...',
  'Sifting through your quiet reflections...',
  'Whispering to the distant starlight...',
  'Crafting poetic insights for your soul...',
  'Weaving words of comfort and validation...',
];

export function ComposeView() {
  const router = useRouter();
  const { addEntry } = useJournal();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  
  // States for Gemini Reflection Partner
  const [isReflecting, setIsReflecting] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState<number>(0);
  const [reflectionResult, setReflectionResult] = useState<AIReflectionResponse | null>(null);
  const [reflectError, setReflectError] = useState<string | null>(null);

  // Form management of title, content, mood
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JournalLogFormData>({
    resolver: zodResolver(journalLogSchema),
    defaultValues: {
      title: '',
      content: '',
      mood: 'Thoughtful',
    },
  });

  const contentValue = watch('content') || '';
  const moodValue = watch('mood') || 'Thoughtful';
  const titleValue = watch('title') || '';

  // Track character and word count in real time
  useEffect(() => {
    setCharacterCount(contentValue.length);
    const words = contentValue.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [contentValue]);

  // Rotate loading messages while requesting Gemini analysis
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isReflecting) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isReflecting]);

  // Request Gemini insight for currently drafted text
  const fetchReflection = async () => {
    if (contentValue.trim().length < 10) {
      toast(t('desk.characterWarning'), 'error');
      return;
    }

    setIsReflecting(true);
    setReflectError(null);
    setReflectionResult(null);

    try {
      const response = await fetch('/api/gemini/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: contentValue,
          mood: moodValue,
          lang: i18n.language,
        }),
      });

      if (!response.ok) {
        throw new Error('Sakina could not reflect on this entry.');
      }

      const data = await response.json();
      setReflectionResult(data);
      toast('Sakina insights are ready.', 'success');
    } catch (err: any) {
      console.error(err);
      setReflectError(err.message || 'Something went wrong while consulting the stars.');
      toast('The connection to the starlit sky was lost. Attempt again shortly.', 'error');
    } finally {
      setIsReflecting(false);
    }
  };

  // Submit and create log entry
  const onSubmitLog = async (data: JournalLogFormData) => {
    setIsPublishing(true);
    try {
      let activeReflection = reflectionResult;

      // If we don't have a pre-loaded AI reflection, let's fetch it on the fly!
      if (!activeReflection) {
        try {
          const reflectRes = await fetch('/api/gemini/reflect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: data.content,
              mood: data.mood,
              lang: i18n.language,
            }),
          });
          if (reflectRes.ok) {
            activeReflection = await reflectRes.json();
          }
        } catch (refErr) {
          console.error('On-the-fly companion reflection fetch failed:', refErr);
        }
      }

      // Create backend entry
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title || activeReflection?.title_suggestion || t('desk.defaultChapterTitle', 'Untitled Sakina Chapter'),
          content: data.content,
          mood: data.mood,
          wordCount: wordCount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cache entry into chapters archive.');
      }

      const newEntry = await response.json();

      // If we have a computed companion reflection, save it to the entry
      if (activeReflection) {
        const fullPrompt = `Mood: ${data.mood} - Written Work: "${data.content.slice(0, 50)}..."`;
        const updatedResponse = await fetch(`/api/entries/${newEntry.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reflectionPrompt: fullPrompt,
            reflectionReply: JSON.stringify(activeReflection),
          }),
        });
        if (updatedResponse.ok) {
          const entryWithReflection = await updatedResponse.json();
          addEntry(entryWithReflection);
          router.push(`/chapters/${entryWithReflection.id}`);
        } else {
          addEntry(newEntry);
          router.push(`/chapters/${newEntry.id}`);
        }
      } else {
        addEntry(newEntry);
        router.push(`/chapters/${newEntry.id}`);
      }

      toast(t('desk.chapterSaved', 'Chapter saved to Sakina.'), 'success');
      reset(); // Clear form
      setReflectionResult(null); // Clear active reflection
    } catch (err: any) {
      toast(err.message || 'Failed to submit the log.', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  if (isPublishing) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <ComposeSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto animate-fade-in min-w-0 px-0">
      <div className="text-center space-y-2 select-none py-2 sm:py-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-foreground tracking-tight md:text-4xl px-2">
          {t('desk.title')}
        </h1>
        <p className="font-sans text-sm text-muted-foreground tracking-wide max-w-md mx-auto leading-relaxed">
          {t('desk.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitLog)} className="space-y-6">
        <Card className="space-y-5">
          {/* Mood Select */}
          <div>
            <Controller
              name="mood"
              control={control}
              render={({ field }) => (
                <MoodSelector selectedMood={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="title" className="font-serif text-sm font-medium text-foreground">
              {t('desk.fieldTitle')}{' '}
              <span className="text-muted-foreground">({t('desk.fieldTitleOptional')})</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="title"
                type="text"
                placeholder={t('desk.placeholderTitle')}
                className="w-full bg-muted/40 border-b border-border py-2 px-3 text-sm rounded-sm font-serif text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card outline-none transition-all duration-300"
                {...register('title')}
              />

              {reflectionResult?.title_suggestion && (
                <button
                  type="button"
                  onClick={() => setValue('title', reflectionResult.title_suggestion)}
                  className="shrink-0 flex items-center gap-1 px-3 py-1 bg-card text-sm font-sans font-medium text-primary rounded border border-primary/20 hover:bg-primary/10 transition-colors"
                  title={t('desk.btnAdopt')}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('desk.btnAdopt')}</span>
                </button>
              )}
            </div>
            {errors.title && (
              <p className="font-sans text-sm text-destructive leading-none">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label htmlFor="content" className="font-serif text-sm font-medium text-foreground">
                {t('desk.fieldThoughts')}
              </label>

              <div className="font-mono text-xs text-muted-foreground">
                {t('desk.wordCountLabel', { words: wordCount, chars: characterCount })}
              </div>
            </div>

            <textarea
              id="content"
              placeholder={t('desk.placeholderThoughts')}
              rows={10}
              className="w-full bg-muted/40 border-b border-border p-4 text-sm rounded-sm font-sans text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:bg-card outline-none tracking-wide leading-relaxed resize-none transition-all duration-300"
              {...register('content')}
            />

            {errors.content && (
              <p className="font-sans text-sm text-destructive select-none mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-between">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={contentValue.trim().length < 10 || isReflecting || isSubmitting}
              onClick={fetchReflection}
              className="group"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary group-hover:animate-pulse" />
              <span>{t('desk.btnSeekAnalysis')}</span>
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="font-serif shadow-xl shrink-0"
            >
              <span>{t('desk.btnAddChapter')}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </form>

      {/* COMPANION REFLECTION VIEW */}
      {(isReflecting || reflectionResult || reflectError) && (
        <Card className="glass-panel-elevated relative overflow-hidden border-primary/10 animate-fade-in">
          {/* Subtle decoration background aura */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-twilight-glow/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Loading Indicator with serene rotating themes */}
          {isReflecting && (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <RefreshCw className="w-7 h-7 text-primary animate-spin" />
              <div className="text-center space-y-1 px-4">
                <p className="font-serif text-sm italic text-foreground animate-pulse">
                  {LOADING_MESSAGES[loadingMsgIdx]}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {t('desk.analyzing')}
                </p>
              </div>
            </div>
          )}

          {reflectError && (
            <div className="py-2 text-center space-y-3 px-4">
              <p className="font-sans text-sm text-destructive">{reflectError}</p>
              <Button type="button" variant="outline" size="sm" onClick={fetchReflection}>
                {t('desk.retry', 'Try again')}
              </Button>
            </div>
          )}

          {reflectionResult && !isReflecting && (
            <SakinaInsights reflection={reflectionResult} headerKey="insights.title" showSectionHeader>
              {reflectionResult.title_suggestion && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/50 p-4 rounded-lg border border-border">
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-sans text-xs text-muted-foreground block uppercase tracking-wider">
                      {t('desk.titleSuggestion', 'Suggested Chapter Title')}
                    </span>
                    <span className="font-serif text-sm font-medium text-foreground italic break-words">
                      &ldquo;{reflectionResult.title_suggestion}&rdquo;
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 group py-1 h-8 w-full sm:w-auto"
                    onClick={() => {
                      setValue('title', reflectionResult.title_suggestion);
                      toast(t('desk.draftSaved', 'Suggested title applied above.'), 'success');
                    }}
                  >
                    <Check className="w-3.5 h-3.5 mr-1.5 text-primary" />
                    <span>{t('desk.btnAdopt', 'Adopt Title')}</span>
                  </Button>
                </div>
              )}
            </SakinaInsights>
          )}
        </Card>
      )}
    </div>
  );
};
