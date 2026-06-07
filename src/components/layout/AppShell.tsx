'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Moon } from 'lucide-react';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import { useAuth } from '@/components/providers/AuthProvider';
import { useJournal } from '@/components/providers/JournalProvider';
import { useToast } from '@/components/ui/Toast';

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, isLoading, signOut } = useAuth();
  const { entries, loading } = useJournal();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  const handleSignOut = () => {
    signOut();
    router.replace('/login');
    toast('Signed out of Sakina.', 'info');
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
        <Moon className="w-8 h-8 text-twilight-glow animate-spin" />
        <p className="font-serif text-sm italic text-muted-foreground animate-pulse">
          Opening Sakina...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-twilight-glow/5 to-transparent pointer-events-none blur-3xl" />

      <AppHeader entriesCount={entries.length} user={user} onSignOut={handleSignOut} />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10 flex flex-col gap-6 sm:gap-8 min-w-0">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <Moon className="w-8 h-8 text-twilight-glow animate-spin" />
            <p className="font-serif text-sm italic text-muted-foreground animate-pulse">
              Loading your Sakina chapters...
            </p>
          </div>
        ) : (
          <div className="flex-grow flex flex-col justify-start">{children}</div>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
