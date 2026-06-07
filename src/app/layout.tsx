import type { Metadata } from 'next';
import { Inter, Noto_Serif, Hind_Siliguri } from 'next/font/google';
import { AppProviders } from '@/components/providers/AppProviders';
import { rootMetadata } from '@/lib/seo/metadata';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-en',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif-en',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-bn',
  display: 'swap',
});

export const metadata: Metadata = rootMetadata;

const themeInitScript = `(function(){try{var t=localStorage.getItem('sakina_theme')||'night';if(t==='dark')t='night';if(t==='light')t='parchment';var ok=['parchment','night','dawn','forest','ocean'];if(ok.indexOf(t)===-1)t='night';document.documentElement.setAttribute('data-theme',t);var l=localStorage.getItem('sakina_lang')||'en';document.documentElement.lang=l;if(l==='bn')document.documentElement.classList.add('lang-bn');}catch(e){document.documentElement.setAttribute('data-theme','night');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="night"
      className={`${inter.variable} ${notoSerif.variable} ${hindSiliguri.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
