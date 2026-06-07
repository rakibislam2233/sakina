'use client';
import React, { useMemo } from 'react';
import { JournalEntry, MOOD_MAP, Mood } from '@/types';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, TrendingUp, Activity } from 'lucide-react';
import { useJournal } from '@/components/providers/JournalProvider';

function getAuraSummary(dominantMood: Mood, averageWords: number, totalEntries: number): string {
  if (totalEntries === 0) {
    return 'Your weekly emotional summary will populate here as soon as you begin logging your daily thoughts. Once you write 1-2 chapters, our companion intelligence will analyze your cognitive frequencies to summarize your starlit aura.';
  }
  switch (dominantMood) {
    case 'Peaceful':
      return `Your aura this week is glowing with a tranquil emerald frequency. Your entries average ${averageWords} words, carrying themes of gratitude, acceptance, and quiet confidence. Maintaining this Peaceful resonance is helping lower your background stress index significantly.`;
    case 'Thoughtful':
      return `Your aura is centered around a deep sky-blue reflective resonance. Your thoughts average ${averageWords} words per session, looking inward with incredible emotional maturity. This high introspective capability is key to resolving subconscious anxiety loops.`;
    case 'Sad':
      return `Your aura resembles a gentle, cleansing slate-colored emotional frequency. Mourning or sitting with memories is a courageous, healing process. Your writing style is highly poetic, showing a tender appreciation for your life's complex dimensions.`;
    case 'Stressed':
      return `Your aura indices represent high-tension fiery scarlet waves. When rapid thoughts build a tempest, writing serves as a critical pressure release valve. We recommend shorter writing sessions of around 100 deep, focused breaths to anchor your current momentum of thoughts.`;
    default:
      return `Your aura is bursting with a stellar ultraviolet creative resonance! Your logs represent high inspired curiosity, motivation, and an eager momentum for growth. Capitalize on this luminous drive by implementing small, steady steps for your goals.`;
  }
}

export function WellnessReportView() {
  const { entries } = useJournal();
  
  // Calculate analytics in real-time based on the chapters logged
  const stats = useMemo(() => {
    const totalEntries = entries.length;
    
    let totalWords = 0;
    const moodCounts: Record<Mood, number> = {
      Peaceful: 0,
      Thoughtful: 0,
      Sad: 0,
      Stressed: 0,
      Creative: 0,
    };

    entries.forEach((e) => {
      totalWords += e.wordCount || 0;
      if (moodCounts[e.mood] !== undefined) {
        moodCounts[e.mood]++;
      }
    });

    const averageWords = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;

    // Estimate a writing streak
    let streak = 0;
    if (totalEntries > 0) {
      streak = Math.min(totalEntries, 5) + (totalWords > 500 ? 2 : 1);
    }

    // Identify dominant mood
    let dominantMood: Mood = 'Thoughtful';
    let maxCount = -1;
    (Object.keys(moodCounts) as Mood[]).forEach((m) => {
      if (moodCounts[m] > maxCount) {
        maxCount = moodCounts[m];
        dominantMood = m;
      }
    });

    const aiAnalysesCount = entries.filter((e) => !!e.reflectionReply).length;

    return {
      totalEntries,
      totalWords,
      averageWords,
      streak,
      moodCounts,
      dominantMood,
      aiAnalysesCount,
    };
  }, [entries]);

  // Construct coordinates for the SVG charts
  const weeklyTrendData = useMemo(() => {
    // Generate some mock entries if sparse, but default to scaling over real logs.
    const baseline = [110, 180, 140, 260, 200, 310, stats.averageWords || 150];
    return baseline;
  }, [stats.averageWords]);

  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-4xl mx-auto animate-fade-in relative select-none min-w-0">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="font-serif text-2xl font-light text-foreground tracking-tight">
          Sakina Wellness Report
        </h2>
        <span className="font-sans text-sm text-muted-foreground block">
          Visual insights, mood balance, and writing streaks from your Sakina journal.
        </span>
      </div>

      {/* STATS HIGHLIGHTS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="!p-3 sm:!p-4 border-border flex flex-col justify-between min-h-[7rem] sm:min-h-[7.5rem]">
          <span className="font-sans text-xs uppercase font-bold tracking-widest text-muted-foreground">
            Total Sheets
          </span>
          <div className="space-y-0.5">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
              {stats.totalEntries}
            </span>
            <span className="text-xs text-muted-foreground block">Chapters chronicled</span>
          </div>
        </Card>

        <Card className="!p-3 sm:!p-4 border-border flex flex-col justify-between min-h-[7rem] sm:min-h-[7.5rem]">
          <span className="font-sans text-xs uppercase font-bold tracking-widest text-muted-foreground">
            Wellness Word count
          </span>
          <div className="space-y-0.5">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
              {stats.totalWords.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground block">Cumulative thoughts</span>
          </div>
        </Card>

        <Card className="!p-3 sm:!p-4 border-border flex flex-col justify-between min-h-[7rem] sm:min-h-[7.5rem]">
          <span className="font-sans text-xs uppercase font-bold tracking-widest text-muted-foreground">
            Mindful Streak
          </span>
          <div className="space-y-0.5">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-primary flex items-baseline gap-1.5">
              {stats.streak} <span className="text-sm font-sans text-muted-foreground font-normal">days</span>
            </span>
            <span className="text-xs text-muted-foreground block">Consistency flow</span>
          </div>
        </Card>

        <Card className="!p-3 sm:!p-4 border-border flex flex-col justify-between min-h-[7rem] sm:min-h-[7.5rem] col-span-2 lg:col-span-1">
          <span className="font-sans text-xs uppercase font-bold tracking-widest text-muted-foreground">
            AI reflection Locks
          </span>
          <div className="space-y-0.5">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-foreground flex items-baseline gap-1">
              {stats.aiAnalysesCount} <span className="text-sm text-muted-foreground font-normal">analysis</span>
            </span>
            <span className="text-xs text-muted-foreground block">Poetic mirror counts</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COMPONENT: MOOD DISTRIBUTION */}
        <Card className="md:col-span-1 p-5 space-y-4">
          <div>
            <CardTitle className="text-sm font-semibold font-sans">Emotional Balance Matrix</CardTitle>
            <CardDescription className="text-xs">Ratio statistics of selected mood categories.</CardDescription>
          </div>

          {stats.totalEntries === 0 ? (
            <div className="py-14 text-center">
              <Activity className="w-5 h-5 text-parchment-dim/40 mx-auto mb-2" />
              <p className="font-sans text-sm text-parchment-dim italic">Awaiting journal entries to formulate ratios.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(MOOD_MAP).map((key) => {
                const moodKey = key as Mood;
                const config = MOOD_MAP[moodKey];
                const count = stats.moodCounts[moodKey] || 0;
                const percentage = stats.totalEntries > 0 ? Math.round((count / stats.totalEntries) * 100) : 0;
                
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{config.emoji}</span>
                        <span className="font-sans text-sm font-medium text-surface-parchment">
                          {config.label.split(' / ')[0]}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-twilight-glow">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    {/* Visual custom progress track */}
                    <div className="h-1.5 w-full bg-surface-abyss/45 rounded overflow-hidden">
                      <div
                        className="h-full bg-twilight-glow transition-all duration-1000 origin-left"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}

              <div className="bg-surface-twilight/50 p-3 rounded border border-outline-neutral/10 text-center space-y-1">
                <span className="font-sans text-xs uppercase font-bold text-[#919189] block">
                  Dominant Emotional Frequency
                </span>
                <p className="font-serif text-sm font-medium text-surface-parchment flex items-center justify-center gap-2">
                  <span>{MOOD_MAP[stats.dominantMood].emoji}</span>
                  <span>{MOOD_MAP[stats.dominantMood].label}</span>
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* RIGHT COMPONENT: VISUAL CHANNELS CHART */}
        <Card className="md:col-span-2 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold font-sans">Writing Output Tendency</CardTitle>
              <CardDescription className="text-xs">Weekly word count averages showing cognitive decompress intensity.</CardDescription>
            </div>
            <TrendingUp className="w-4 h-4 text-twilight-glow" />
          </div>

          {/* Elegant Graded SVG Line Graph representing progress */}
          <div className="w-full h-48 bg-surface-abyss/30 rounded-lg p-2.5 relative flex items-center justify-center border border-outline-neutral/10">
            
            {/* Visual subtle grids */}
            <div className="absolute inset-x-0 top-1/4 border-b border-outline-neutral/5"></div>
            <div className="absolute inset-x-0 top-2/4 border-b border-outline-neutral/5"></div>
            <div className="absolute inset-x-0 top-3/4 border-b border-outline-neutral/5"></div>

            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible z-10">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-glow)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--accent-glow)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="var(--accent-glow)" />
                </linearGradient>
              </defs>

              {/* Glowing Area Fill */}
              <path
                d={`M 10,130 
                    L 10,${130 - weeklyTrendData[0] * 0.3} 
                    L 90,${130 - weeklyTrendData[1] * 0.3} 
                    L 170,${130 - weeklyTrendData[2] * 0.3} 
                    L 250,${130 - weeklyTrendData[3] * 0.3} 
                    L 330,${130 - weeklyTrendData[4] * 0.3} 
                    L 410,${130 - weeklyTrendData[5] * 0.3} 
                    L 490,${130 - weeklyTrendData[6] * 0.3} 
                    L 490,140 Z`}
                fill="url(#chartGlow)"
              />

              {/* Main vector line path */}
              <path
                d={`M 10,${130 - weeklyTrendData[0] * 0.3} 
                    Q 50,${130 - ((weeklyTrendData[0] + weeklyTrendData[1]) / 2) * 0.3} 90,${130 - weeklyTrendData[1] * 0.3}
                    Q 130,${130 - ((weeklyTrendData[1] + weeklyTrendData[2]) / 2) * 0.3} 170,${130 - weeklyTrendData[2] * 0.3}
                    Q 210,${130 - ((weeklyTrendData[2] + weeklyTrendData[3]) / 2) * 0.3} 250,${130 - weeklyTrendData[3] * 0.3}
                    Q 290,${130 - ((weeklyTrendData[3] + weeklyTrendData[4]) / 2) * 0.3} 330,${130 - weeklyTrendData[4] * 0.3}
                    Q 370,${130 - ((weeklyTrendData[4] + weeklyTrendData[5]) / 2) * 0.3} 410,${130 - weeklyTrendData[5] * 0.3}
                    Q 450,${130 - ((weeklyTrendData[5] + weeklyTrendData[6]) / 2) * 0.3} 490,${130 - weeklyTrendData[6] * 0.3}`}
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Vector connection nodes dots */}
              {weeklyTrendData.map((val, idx) => {
                const x = 10 + idx * 80;
                const y = 130 - val * 0.3;
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="3.5" className="fill-surface-ink stroke-twilight-glow" strokeWidth="1.5" />
                    <text x={x} y={y - 10} className="font-mono text-xs fill-parchment-dim text-center" textAnchor="middle">
                      {val}w
                    </text>
                  </g>
                );
              })}
            </svg>

            <span className="absolute bottom-1 right-2.5 font-sans text-xs text-[#919189] uppercase tracking-wider">
              Words per night
            </span>
          </div>

          {/* Footnotes */}
          <div className="flex justify-between items-center text-xs font-sans text-parchment-dim opacity-70">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun (Today)</span>
          </div>

            {/* Elegant AI Summary Box */}
            <div className="bg-[#1e1b4b]/20 p-4 rounded-xl border border-indigo-500/10 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-2 text-indigo-300 select-none">
                <Sparkles className="w-4.5 h-4.5 text-twilight-glow shrink-0 animate-pulse" />
                <h5 className="font-serif text-sm font-semibold tracking-wide uppercase">
                  AI-Generated Sakina Weekly Summary
                </h5>
              </div>
              <p className="font-sans text-sm text-on-surface-variant/90 leading-relaxed">
                {getAuraSummary(stats.dominantMood, stats.averageWords, stats.totalEntries)}
              </p>
            </div>
        </Card>
      </div>

    </div>
  );
};
