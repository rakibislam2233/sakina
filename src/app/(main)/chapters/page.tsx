import { createPageMetadata } from '@/lib/seo/metadata';
import { ChapterListView } from '@/components/chapters/ChapterListView';

export const metadata = createPageMetadata({
  title: 'Chapters',
  description: 'Browse your Sakina journal chapters — search, filter, and revisit past reflections.',
  path: '/chapters',
});

export default function ChaptersPage() {
  return <ChapterListView />;
}
