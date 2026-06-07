'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Moon, PenTool, Home, RefreshCw, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type SakinaStatusViewProps =
  | { variant: 'not-found' }
  | { variant: 'error'; onRetry?: () => void };

export function SakinaStatusView(props: SakinaStatusViewProps) {
  const { t } = useTranslation();
  const isNotFound = props.variant === 'not-found';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background text-foreground relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(100%,28rem)] h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Card className="relative w-full max-w-md text-center space-y-6 glass-panel-elevated border-primary/15 animate-fade-in">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-125" />
            <div className="relative p-4 rounded-full bg-muted/60 border border-primary/20">
              {isNotFound ? (
                <Compass className="w-8 h-8 text-primary" />
              ) : (
                <Moon className="w-8 h-8 text-primary fill-primary/10" />
              )}
            </div>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {isNotFound ? '404' : '500'}
          </p>

          <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-foreground">
            {isNotFound ? t('errors.notFoundTitle') : t('errors.errorTitle')}
          </h1>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {isNotFound ? t('errors.notFoundDesc') : t('errors.errorDesc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center pt-1">
          <Button asChild variant="primary" className="font-serif w-full sm:w-auto">
            <Link href="/compose">
              <PenTool className="w-4 h-4" />
              {t('errors.goCompose')}
            </Link>
          </Button>

          {isNotFound ? (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4" />
                {t('errors.goHome')}
              </Link>
            </Button>
          ) : (
            props.onRetry && (
              <Button type="button" variant="outline" onClick={props.onRetry} className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4" />
                {t('errors.tryAgain')}
              </Button>
            )
          )}
        </div>
      </Card>

      <p className="mt-8 font-serif text-sm italic text-muted-foreground/80 text-center max-w-xs">
        {t('errors.footerQuote')}
      </p>
    </div>
  );
}
