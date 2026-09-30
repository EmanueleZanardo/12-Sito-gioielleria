import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';
import { ShareDialog } from '@/components/share/share-dialog';

export const metadata: Metadata = {
  metadataBase: new URL('https://gdc-jewellery-lab.vercel.app'),
  title: {
    default: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    template: '%s | GDC Jewellery Lab',
  },
  description: 'GDC Jewellery Lab: laboratorio orafo artigianale. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose, restauro e riparazioni. Preventivo gratuito.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    description: 'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    url: 'https://gdc-jewellery-lab.vercel.app',
    siteName: 'GDC Jewellery Lab',
    type: 'website',
    locale: 'it_IT',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — laboratorio orafo artigianale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    description: 'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    images: ['https://gdc-jewellery-lab.vercel.app/og-cover.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'GDC Jewellery Lab',
    description:
      'Laboratorio orafo artigianale. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose, restauro e riparazioni.',
    url: 'https://gdc-jewellery-lab.vercel.app',
    image: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
    telephone: '+393451114337',
    email: 'laboratorio.ticino@gmail.com',
    sameAs: ['https://www.instagram.com/gdc_jewellery_lab'],
  };
  return (
    <html lang="it" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <div className="fixed bottom-6 right-6 z-50">
                <ShareDialog size="lg" className="rounded-full h-14 w-14 shadow-lg" />
            </div>
            <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
