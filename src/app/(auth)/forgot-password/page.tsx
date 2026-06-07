import { createPageMetadata } from '@/lib/seo/metadata';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata = createPageMetadata({
  title: 'Forgot Password',
  description: 'Reset your Sakina account password securely.',
  path: '/forgot-password',
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
