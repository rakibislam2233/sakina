'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Heart, Compass, BookMarked } from 'lucide-react';
import { AIReflectionResponse } from '@/types';

interface SakinaInsightsProps {
  reflection: AIReflectionResponse;
  showSectionHeader?: boolean;
  headerKey?: string;
  children?: React.ReactNode;
}

export function SakinaInsights({
  reflection,
  showSectionHeader = true,
  headerKey = 'insights.header',
  children,
}: SakinaInsightsProps) {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === 'bn';

  const embraceText =
    reflection.companion_embrace ||
    (reflection as { companionsEmbrace?: string }).companionsEmbrace ||
    (reflection as { poeticResponse?: string }).poeticResponse;

  return (
    <div className="space-y-5 sm:space-y-6 w-full min-w-0">
      {showSectionHeader && (
        <div className="flex items-center gap-2 pb-2 border-b border-border max-w-full select-none">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
          <h3 className="font-serif text-sm sm:text-sm font-semibold text-primary uppercase tracking-wider">
            {t(headerKey)}
          </h3>
        </div>
      )}

      {children}

      {/* Companion's Embrace */}
      <div className="insight-panel insight-panel-embrace relative overflow-hidden p-4 sm:p-6 md:p-8 space-y-3">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 text-primary select-none">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <h4 className="font-serif text-sm font-semibold tracking-wide uppercase">
            {t('insights.embrace')}
          </h4>
        </div>
        <p className="font-serif text-sm sm:text-base text-foreground/90 leading-relaxed italic border-l-2 border-primary/30 pl-4 sm:pl-5 pt-1 font-light break-words">
          &ldquo;{embraceText}&rdquo;
        </p>
      </div>

      {/* Spiritual Tranquility */}
      {reflection.spiritual_tranquility && (
        <div className="insight-panel insight-panel-spiritual p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-emerald-700 dark:text-emerald-400 select-none border-b border-emerald-500/15 pb-3 sm:pb-4">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <h4 className="font-serif text-sm font-semibold tracking-wide uppercase">
              {t('insights.spiritual')}
            </h4>
            <span className="text-xs font-sans font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 ml-auto uppercase tracking-wider">
              {isBn ? 'ঐশ্বরিক প্রশান্তি' : 'Spiritual Solace'}
            </span>
          </div>

          {reflection.spiritual_tranquility.quran_verses &&
            reflection.spiritual_tranquility.quran_verses.length > 0 && (
              <div className="space-y-4">
                <h5 className="font-serif text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider select-none">
                  {isBn ? 'কোরআনিক আয়াতসমূহ' : 'Quranic Verses'}
                </h5>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {reflection.spiritual_tranquility.quran_verses.map((verse, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-4 sm:p-5 border border-emerald-500/10 bg-muted/40 space-y-4"
                    >
                      <div className="flex flex-wrap justify-between items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-md border border-border">
                        <span className="font-serif text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                          {verse.surah_name}
                        </span>
                        <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 uppercase font-bold tracking-wider">
                          {verse.verse_number}
                        </span>
                      </div>
                      <div
                        className="py-2 text-center select-all font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-loose tracking-wide rtl break-words"
                        dir="rtl"
                      >
                        {verse.arabic}
                      </div>
                      <div className="space-y-2 pt-3 border-t border-emerald-500/10">
                        <p className="font-sans text-sm italic text-foreground/85 leading-relaxed text-center px-2 sm:px-4 break-words">
                          &ldquo;{verse.translation}&rdquo;
                        </p>
                        <p className="font-sans text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed pt-2 bg-emerald-500/5 p-3 rounded border border-emerald-500/10 break-words">
                          <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                            {isBn ? 'সাকীনা মনন' : 'Resonance Context'}
                          </span>
                          {verse.resonance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {reflection.spiritual_tranquility.hadith_narrations &&
            reflection.spiritual_tranquility.hadith_narrations.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-emerald-500/10">
                <h5 className="font-serif text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider select-none">
                  {isBn ? 'হাদীস বাণীসমূহ' : 'Prophetic Hadiths'}
                </h5>
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {reflection.spiritual_tranquility.hadith_narrations.map((hadith, index) => (
                    <div
                      key={index}
                      className="rounded-xl p-4 sm:p-5 border border-emerald-500/10 bg-muted/40 space-y-3"
                    >
                      <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded uppercase tracking-widest bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                        {hadith.source}
                      </span>
                      <p className="font-serif text-sm sm:text-sm text-foreground/90 leading-relaxed pl-3 border-l border-emerald-500/25 break-words">
                        {hadith.narration}
                      </p>
                      <p className="font-sans text-sm text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed bg-emerald-500/5 p-3 rounded border border-emerald-500/10 break-words">
                        <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                          {isBn ? 'হৃদয়ের সান্ত্বনা' : 'Solace Resonance'}
                        </span>
                        {hadith.resonance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Voices of Wisdom */}
      {reflection.voices_of_wisdom && (
        <div className="grid grid-cols-1 gap-5 sm:gap-6">
          {reflection.voices_of_wisdom.scholar_quotes &&
            reflection.voices_of_wisdom.scholar_quotes.length > 0 && (
              <div className="insight-panel insight-panel-wisdom p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-amber-700 dark:text-amber-400 select-none border-b border-amber-500/15 pb-3 sm:pb-4">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <h4 className="font-serif text-sm font-semibold tracking-wide uppercase">
                    {isBn ? 'মনীষীদের উক্তি' : 'Voices of Wisdom'}
                  </h4>
                  <span className="text-xs font-sans text-amber-700/80 dark:text-amber-300/80 ml-auto select-none">
                    {isBn ? 'প্রজ্ঞাশীল চিন্তাবিদদের বাণী' : 'Scholar Quotes'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {reflection.voices_of_wisdom.scholar_quotes.map((quoteObj, index) => (
                    <div
                      key={index}
                      className="bg-muted/40 p-4 rounded-lg border border-amber-500/10 flex flex-col justify-between italic space-y-3"
                    >
                      <p className="font-serif text-sm sm:text-sm text-foreground/90 leading-relaxed font-light break-words">
                        &ldquo;{quoteObj.quote}&rdquo;
                      </p>
                      <span className="font-sans text-xs font-bold text-amber-700/80 dark:text-amber-300/80 not-italic block uppercase tracking-widest text-right select-none">
                        — {quoteObj.scholar_name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {reflection.voices_of_wisdom.extensive_book_shelf &&
            reflection.voices_of_wisdom.extensive_book_shelf.length > 0 && (
              <div className="insight-panel insight-panel-shelf p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-sky-700 dark:text-sky-400 select-none pb-3 sm:pb-4 border-b border-sky-500/15">
                  <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <h4 className="font-serif text-sm font-semibold tracking-wide uppercase">
                    {t('insights.shelf')}
                  </h4>
                  <span className="text-xs font-sans text-sky-700/80 dark:text-sky-300/80 ml-auto">
                    {t('insights.shelfSubtitle')}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {reflection.voices_of_wisdom.extensive_book_shelf.map((book, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/40 p-4 sm:p-5 rounded-lg border border-sky-500/10 hover:border-sky-500/20 transition-colors space-y-2 min-w-0"
                    >
                      <span className="inline-block px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20 select-none">
                        {book.language_type}
                      </span>
                      <h5 className="font-serif text-sm font-semibold text-foreground leading-snug break-words">
                        {book.title}
                      </h5>
                      <p className="font-sans text-sm text-muted-foreground break-words">
                        {isBn ? 'লেখক' : 'by'} {book.author}
                      </p>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed pt-1 break-words">
                        {book.why_it_helps}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
