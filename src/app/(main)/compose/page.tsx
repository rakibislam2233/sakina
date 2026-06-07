import { createPageMetadata } from '@/lib/seo/metadata';
import { ComposeView } from '@/components/chapters/ComposeView';

export const metadata = createPageMetadata({
  title: 'Compose',
  description: 'Write your thoughts in Sakina — capture moods, reflections, and daily wellness notes.',
  path: '/compose',
});

export default function ComposePage() {
  return <ComposeView />;
}
