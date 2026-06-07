import Link from 'next/link';
import { Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AuthRedirect } from '@/components/auth/AuthRedirect';
import { ThemePicker } from '@/components/layout/ThemePicker';

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 relative overflow-hidden bg-background">
      <AuthRedirect />

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
        <ThemePicker />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-md w-full z-10 space-y-4">
        <div className="text-center space-y-1 animate-fade-in">
          <Link href="/login" className="inline-flex p-2 rounded-full bg-card border border-primary/20 justify-center">
            <Moon className="w-5 h-5 text-primary fill-primary/5 animate-pulse" />
          </Link>
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">Sakina</h1>
          <p className="font-sans text-sm text-muted-foreground tracking-wide max-w-xs mx-auto leading-relaxed">
            Your quiet sanctuary for mental wellness, self-compassion, and reflection.
          </p>
        </div>

        <Card className="glass-panel-elevated border-primary/10 animate-fade-in p-0 overflow-hidden">
          <CardContent className="p-4 sm:p-5">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
