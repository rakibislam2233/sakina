import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo/metadata';
import { ChapterDetailView } from '@/components/chapters/ChapterDetailView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return createPageMetadata({
    title: 'Chapter',
    description: 'Read a Sakina journal chapter and its wellness insights.',
    path: `/chapters/${id}`,
  });
}

export default async function ChapterDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ChapterDetailView entryId={id} />;
}
