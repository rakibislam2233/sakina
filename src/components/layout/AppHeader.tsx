'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  Moon,
  PenTool,
  BookOpen,
  BarChart2,
  User,
  LogOut,
  Languages,
  Menu,
  X,
} from 'lucide-react';
import { ThemePicker } from '@/components/layout/ThemePicker';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  entriesCount: number;
  user: { name: string; email: string; avatarUrl: string } | null;
  onSignOut: () => void;
}

const NAV_ITEMS = [
  { href: '/compose', icon: PenTool, labelKey: 'nav.write' as const },
  { href: '/chapters', icon: BookOpen, labelKey: 'nav.chapters' as const, showCount: true },
  { href: '/wellness', icon: BarChart2, labelKey: 'nav.report' as const },
  { href: '/account', icon: User, labelKey: 'nav.profile' as const },
];

export function AppHeader({ entriesCount, user, onSignOut }: AppHeaderProps) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLanguage = i18n.language || 'en';

  const isActive = (path: string) => {
    if (path === '/chapters') return pathname.startsWith('/chapters');
    return pathname === path;
  };

  const handleToggleLanguage = () => {
    const nextLang = currentLanguage === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('sakina_lang', nextLang);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinkClass = (path: string) =>
    cn(
      'inline-flex items-center gap-2 shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-md text-xs font-sans font-medium transition-all duration-300',
      isActive(path)
        ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80',
    );

  return (
    <header className="w-full border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-14 sm:h-16 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 min-w-0">
        <Link href="/compose" className="flex items-center gap-2 min-w-0 shrink-0 justify-self-start">
          <Moon className="w-5 h-5 text-primary fill-primary/10 animate-pulse shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-sm sm:text-base tracking-wide text-foreground font-bold leading-none truncate">
              Sakina
            </span>
            <span className="font-mono text-xs sm:text-xs text-muted-foreground tracking-widest mt-0.5 uppercase hidden sm:block truncate">
              {currentLanguage === 'bn' ? 'মানসিক শান্তির নীড়' : 'Sakina Journal'}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex w-fit shrink-0 items-center justify-center gap-1 bg-muted/50 p-1.5 rounded-lg border border-border justify-self-center">
          {NAV_ITEMS.map(({ href, icon: Icon, labelKey, showCount }) => (
            <Link key={href} href={href} className={cn(navLinkClass(href), 'relative')}>
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{t(labelKey)}</span>
              {showCount && entriesCount > 0 && (
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-mono leading-none',
                    isActive(href) ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground',
                  )}
                >
                  {entriesCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 justify-self-end col-start-3">
          <button
            type="button"
            onClick={handleToggleLanguage}
            className="flex items-center justify-center gap-1.5 h-8 min-w-8 px-2 rounded-md hover:bg-muted/60 text-primary border border-border text-xs font-medium transition-colors cursor-pointer"
            title="Toggle Language / ভাষা পরিবর্তন করুন"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono text-xs font-bold sm:inline">
              {currentLanguage.toUpperCase()}
            </span>
          </button>

          <ThemePicker />

          <div className="hidden lg:flex flex-col text-right pl-1">
            <span className="font-mono text-xs text-primary tracking-wide">{time || '--:--'}</span>
            <span className="font-sans text-xs text-muted-foreground tracking-wider">
              {t('nav.clock')}
            </span>
          </div>

          {user && (
            <div className="hidden md:flex items-center gap-1.5 pl-1 border-l border-border ml-0.5">
              <Link
                href="/account"
                className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden bg-muted/30 p-0.5 cursor-pointer shrink-0"
                title={t('nav.profile')}
              >
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                title={t('nav.logout')}
                aria-label={t('nav.logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-md border border-border text-foreground hover:bg-muted/60 transition-colors cursor-pointer ml-0.5"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 bg-background/70 backdrop-blur-sm z-40 md:hidden"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden relative z-50 border-t border-border bg-background/98 backdrop-blur-lg animate-fade-in shadow-lg">
            <nav className="max-w-[1240px] mx-auto px-4 py-3 space-y-1">
              {NAV_ITEMS.map(({ href, icon: Icon, labelKey, showCount }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-foreground hover:bg-muted/60 border border-transparent',
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1">{t(labelKey)}</span>
                    {showCount && entriesCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-primary/15 text-primary border border-primary/20">
                        {entriesCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {user && (
              <div className="max-w-[1240px] mx-auto px-4 pb-4 pt-2 border-t border-border mt-1">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Link href="/account" className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden bg-muted/30 p-0.5 shrink-0">
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="font-mono text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 border border-destructive/20 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
