import { createPageMetadata } from '@/lib/seo/metadata';
import { AccountView } from '@/components/wellness/AccountView';

export const metadata = createPageMetadata({
  title: 'Account',
  description: 'Manage your Sakina account, wellness goals, and journal preferences.',
  path: '/account',
});

export default function AccountPage() {
  return <AccountView />;
}
