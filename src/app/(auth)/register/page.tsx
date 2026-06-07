import { createPageMetadata } from '@/lib/seo/metadata';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = createPageMetadata({
  title: 'Create Account',
  description: 'Join Sakina and start your personal wellness journaling journey.',
  path: '/register',
});

export default function RegisterPage() {
  return <RegisterForm />;
}
