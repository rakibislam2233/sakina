'use client';
import { AppProviders } from '@/components/providers/AppProviders';
import { SakinaStatusView } from '@/components/layout/SakinaStatusView';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="night">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>
          <SakinaStatusView variant="error" onRetry={reset} />
        </AppProviders>
      </body>
    </html>
  );
}
