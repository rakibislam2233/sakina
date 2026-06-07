'use client';

import { useEffect } from 'react';
import { SakinaStatusView } from '@/components/layout/SakinaStatusView';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <SakinaStatusView variant="error" onRetry={reset} />;
}
