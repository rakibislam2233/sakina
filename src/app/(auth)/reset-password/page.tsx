import { createPageMetadata } from '@/lib/seo/metadata';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata = createPageMetadata({
  title: 'Reset Password',
  description: 'Set a new password for your Sakina account.',
  path: '/reset-password',
});

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
