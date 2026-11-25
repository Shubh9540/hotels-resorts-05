import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import rawData from '@/data/templates.json';
import { HotelsResortsTemplateData } from '@/types/templates.types';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pin Hotels & Resorts | Sanctuary of Pines & Palms',
  description:
    'Experience refined hospitality, private lagoon villas, pine-canopy suites, and unhurried coastal calm at Pin Hotels & Resorts.',
  icons: {
    icon: '/main logo/header logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const data = rawData as HotelsResortsTemplateData;
  const sections = data.categories.HotelsResorts.sections;
  const fontStyle = {
    '--font-site': 'var(--font-sans)',
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`scroll-smooth ${cormorant.variable} ${dmSans.variable}`}
    >
      <body style={fontStyle} className="font-sans antialiased">
        <Header data={sections.Header.variants.HotelsResortsHeader2} />
        {children}
        <Footer data={data.common.Footer} />
      </body>
    </html>
  );
}
