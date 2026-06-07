import type { Metadata } from 'next';

const SITE_NAME = 'Sakina';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sakina.app';
const DEFAULT_DESCRIPTION =
  'Sakina is your quiet sanctuary for mental wellness, journaling, self-compassion, and peaceful reflection.';

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    keywords: [
      'Sakina',
      'mental wellness',
      'journal',
      'mindfulness',
      'reflection',
      'self-care',
      'Bangla journal',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['bn_BD'],
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const rootMetadata: Metadata = {
  ...createPageMetadata({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  }),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};
