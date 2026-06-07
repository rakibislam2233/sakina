'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Compass, BookMarked, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

const CALMING_SUGGESTIONS_EN = [
  'Taking a deep breath...',
  'Gathering words of tranquility...',
  'Looking into the shelf of wisdom...',
  'Listening to the silence within...',
  'Washing away daytime storm noise...',
  'Connecting your state with eternal guidance...',
  'Composing a peaceful companion embrace...'
];

const CALMING_SUGGESTIONS_BN = [
  'একটি দীর্ঘ গভীর শ্বাস নিন...',
  'প্রশান্তির বাণী খুঁজছি...',
  'জ্ঞানের তাক থেকে বই মিলাচ্ছি...',
  'ভেতরের মৌনতার সুর শুনছি...',
  'সারাদিনের ব্যস্ত কোলাহল ধুয়ে দিচ্ছি...',
  'আপনার অবস্থাকে চিরন্তন নির্দেশিকার সাথে সংযুক্ত করছি...',
  'একটি শান্ত সহযাত্রীর আলিঙ্গন তৈরি করছি...'
];

export function ComposeSkeleton() {
  const { t, i18n } = useTranslation();
  const [textIndex, setTextIndex] = useState(0);

  const localizedSuggestions = i18n.language === 'bn' ? CALMING_SUGGESTIONS_BN : CALMING_SUGGESTIONS_EN;

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % localizedSuggestions.length);
    }, 3800);
    return () => clearInterval(textInterval);
  }, [localizedSuggestions.length]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 select-none py-4 animate-fade-in">
      {/* Floating Header loading label */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 pb-2">
        <div className="relative">
          <div className="absolute inset-0 bg-[#3b82f6]/20 blur-xl rounded-full scale-110 animate-pulse"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
            className="relative p-4 rounded-full bg-surface-twilight border border-twilight-glow/20"
          >
            <Sparkles className="w-8 h-8 text-twilight-glow fill-twilight-glow/5" />
          </motion.div>
        </div>

        {/* Dynamic Calming Slogan */}
        <div className="h-14 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-lg md:text-xl italic text-twilight-glow font-medium max-w-md"
            >
              {localizedSuggestions[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <p className="font-sans text-sm text-[#919189]">
          {t('desk.analyzing')}
        </p>
      </div>

      {/* SAKINA SKELETON REPORT */}
      <div className="space-y-6">
        
        {/* Companion embrace skeleton */}
        <div className="bg-[#1a1a24]/20 border border-purple-500/10 rounded-xl p-6 md:p-8 space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-2 text-purple-300">
            <Heart className="w-4.5 h-4.5 animate-pulse" />
            <span className="font-serif text-sm font-semibold uppercase tracking-wider">{t('insights.embrace')}</span>
          </div>
          <div className="space-y-2.5 pl-4 border-l-2 border-purple-500/20">
            <Skeleton className="h-4.5 w-11/12" />
            <Skeleton className="h-4.5 w-full" />
            <Skeleton className="h-4.5 w-10/12" />
          </div>
        </div>

        {/* Spiritual tranquility skeleton */}
        <div className="bg-[#0f2a1d]/10 border border-emerald-500/10 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-emerald-400">
            <Compass className="w-4.5 h-4.5" />
            <span className="font-serif text-sm font-semibold uppercase tracking-wider">{t('insights.spiritual')}</span>
          </div>
          <div className="py-6 bg-emerald-950/15 rounded-xl flex flex-col items-center justify-center gap-1.5 px-6">
            <Skeleton className="h-8 w-2/3 rounded-lg" />
            <Skeleton className="h-4 w-1/3 rounded-md mt-4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-4/5 mx-auto" />
            <Skeleton className="h-3 w-1/2 mx-auto" />
          </div>
        </div>

        {/* Mindful shelf skeleton */}
        <div className="bg-[#1c2434]/10 border border-blue-500/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-450">
            <BookMarked className="w-4.5 h-4.5" />
            <span className="font-serif text-sm font-semibold uppercase tracking-wider">{t('insights.shelf')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/20 p-5 rounded-lg border border-blue-500/5 space-y-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-4/5" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
              </div>
            </div>

            <div className="bg-slate-950/20 p-5 rounded-lg border border-blue-500/5 space-y-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-4/5" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
