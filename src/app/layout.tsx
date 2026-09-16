import type { Metadata } from 'next';
import { Playfair_Display, Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GREEN BEAR CAFE — Luxury Bakery & Cafe Franchise Opportunity',
  description:
    'Enter the world of Green Bear Cafe. Discover a proven luxury bakery brand, structured operational support, artisan patisserie mastery, and a clear path to franchise growth.',
  keywords: [
    'Green Bear Cafe',
    'bakery franchise',
    'cafe franchise opportunity',
    'luxury patisserie',
    'specialty coffee business',
    'artisan bakery franchise',
  ],
  authors: [{ name: 'Green Bear Cafe Franchise Group' }],
  openGraph: {
    title: 'GREEN BEAR CAFE — Luxury Bakery & Cafe Franchise Opportunity',
    description:
      'Build your own Green Bear Cafe with a proven brand, structured support, and a clear path to growth.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Green Bear Cafe',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen selection:bg-brand-accent selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
