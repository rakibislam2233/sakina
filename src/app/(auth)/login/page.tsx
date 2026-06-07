import { createPageMetadata } from '@/lib/seo/metadata';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in to Sakina — your personal wellness journal for reflection and calm.',
  path: '/login',
});

export default function LoginPage() {
  return <LoginForm />;
}
