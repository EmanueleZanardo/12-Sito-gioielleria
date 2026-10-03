import type { Metadata, Viewport } from 'next';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import { MotionProvider } from '@/components/motion-provider';
import { SkipLink } from '@/components/skip-link';
import './globals.css';
import { ShareDialog } from '@/components/share/share-dialog';

// Montserrat self-hosted via next/font: elimina la <link> render-blocking
// verso fonts.googleapis.com (e risolve il warning eslint no-page-custom-font).
// display=swap per evitare FOIT; i font Belleza/Lora non erano usati da
// nessun componente (solo Montserrat in tailwind fontFamily), quindi non
// vengono più caricati.
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Cormorant Garamond: serif di lusso per i titoli (headline),
// self-hosted via next/font. display=swap per evitare FOIT.
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const viewport: Viewport = {
  // Il sito è sempre dark (className="dark" su <html>): color-scheme dark
  // allinea scrollbars e controlli nativi (input, date picker) al tema scuro.
  // themeColor unico (niente media query): con tema di sistema chiaro la
  // barra del browser resterebbe beige chiaro su un sito sempre scuro.
  colorScheme: 'dark',
  themeColor: '#0d0b08',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gdc-jewellery-lab.vercel.app'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  title: {
    default: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    template: '%s | GDC Jewellery Lab',
  },
  description:
    'GDC Jewellery Lab: laboratorio orafo artigianale in Ticino. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose, restauro e riparazioni. Preventivo gratuito.',
  keywords: [
    'gioielli su misura Ticino',
    'orafo artigianale',
    'anelli fidanzamento oro 18kt',
    'restauro gioielli',
    'gioielli personalizzati',
    'messa in misura anelli',
    'restauro gioielli vintage',
    'riparazione gioielli',
    'laboratorio orafo',
    'anelli personalizzati',
    'diamanti',
    'pietre preziose',
  ],
  category: 'jewelry',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    description:
      'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    url: 'https://gdc-jewellery-lab.vercel.app',
    siteName: 'GDC Jewellery Lab',
    type: 'website',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Gioielli artigianali su misura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    description:
      'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    images: [
      {
        url: '/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Gioielli artigianali su misura',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = 'https://gdc-jewellery-lab.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'JewelryStore',
        name: 'GDC Jewellery Lab',
        description:
          'Laboratorio orafo artigianale. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose, restauro e riparazioni.',
        url: baseUrl,
        image:
          'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        logo: 'https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png',
        telephone: '+393451114337',
        email: 'laboratorio.ticino@gmail.com',
        priceRange: '€€',
        sameAs: ['https://www.instagram.com/gdc_jewellery_lab'],
        areaServed: [
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'Country', name: 'Italy' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Chi Siamo',
            item: `${baseUrl}/about`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Servizi',
            item: `${baseUrl}/services`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Crea Gioiello',
            item: `${baseUrl}/custom-jewel`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Contatti',
            item: `${baseUrl}/contact`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Collezioni',
            item: `${baseUrl}/collections`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Come Ordinare',
            item: `${baseUrl}/orders`,
          },
        ],
      },
    ],
  };
  return (
    <html lang="it" className={`${montserrat.variable} ${cormorant.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <MotionProvider>
        <LanguageProvider>
            <SkipLink />
            <div className="flex min-h-screen flex-col overflow-x-clip">
              <Header />
              <main id="main-content" className="flex-grow">{children}</main>
              <Footer />
            </div>
            <div className="fixed bottom-6 right-6 z-50">
                <ShareDialog size="lg" className="rounded-full h-14 w-14 shadow-lg" />
            </div>
            <Toaster />
        </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
