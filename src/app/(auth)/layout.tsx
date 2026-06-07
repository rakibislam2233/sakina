import { AuthShell } from '@/components/auth/AuthShell';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Account',
  description: 'Sign in or create your Sakina wellness journal account.',
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
