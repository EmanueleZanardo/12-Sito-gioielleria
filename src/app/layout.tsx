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
import { WhatsAppFloat } from '@/components/whatsapp-float';

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
  // QA 03/10 (builder B2): rimosso il canonical globale '/' ereditato da TUTTE
  // le pagine — segnalava a Google che ogni pagina fosse un duplicato della
  // home. Il canonical self-referencing della homepage è impostato via
  // useEffect in src/app/page.tsx (la home è un client component: niente
  // export metadata possibile lì); le altre pagine lo hanno via metadata
  // nei layout di rotta.
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
  // QA 03/10 (miglioria builder B2): il layout globale non ospita più
  // BreadcrumbList — era semanticamente sbagliato (elencava tutte le pagine
  // come briciole della pagina corrente). I BreadcrumbList ora sono per-pagina
  // (home inclusa) e JewelryStore vive solo in homepage; qui resta WebSite.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GDC Jewellery Lab',
    url: baseUrl,
  };
  return (
    <html lang="it" className={`${montserrat.variable} ${cormorant.variable} dark`}>
      <head>
        {/* QA 03/10 20:36: tutte le immagini prodotto sono su i.postimg.cc
            (cross-origin): il preconnect + dns-prefetch riduce la latenza di
            handshake TCP/TLS sul primo fetch immagini (hero + gallery). */}
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
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
              {/* tabIndex={-1}: il <main> è il target dello SkipLink ("salta al
                  contenuto"). Senza tabindex focalizzabile il link sposta solo
                  lo scroll ma non il focus da tastiera/screen reader in alcuni
                  browser; -1 lo rende focalizzabile programmaticamente senza
                  aggiungerlo all'ordine di tabulazione. */}
              <main id="main-content" tabIndex={-1} className="flex-grow outline-none">{children}</main>
              <Footer />
            </div>
            <div className="fixed bottom-6 right-6 z-50">
                <ShareDialog size="lg" className="rounded-full h-14 w-14 shadow-lg" />
            </div>
            {/* CTA WhatsApp sempre visibile (bottom-left), con messaggio
                precompilato nella lingua attiva. */}
            <WhatsAppFloat />
            <Toaster />
        </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
