import type { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';
import { ShareDialog } from '@/components/share/share-dialog';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f3ea' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0b08' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gdc-jewellery-lab.vercel.app'),
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
    images: ['/og-cover.jpg'],
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
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Come posso ottenere un preventivo per un gioiello su misura?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Compila il modulo di contatto o il modulo d\u2019ordine personalizzato: ti risponderemo con preventivo e tempistiche senza impegno.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quali materiali utilizzate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Realizziamo i gioielli a mano in oro 18kt, con diamanti e pietre preziose selezionate.',
            },
          },
          {
            '@type': 'Question',
            name: 'Che servizi offrite oltre alla creazione su misura?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Messa in misura di anelli e bracciali, restauro e modifica di gioielli vintage, rimessa a nuovo completa di ogni tipo di gioiello, cambio pila orologi e restauro bracciali orologi.',
            },
          },
          {
            '@type': 'Question',
            name: 'Come funziona l\u2019ordine di un gioiello personalizzato?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Scegli il tuo gioiello o disegna un pezzo unico, inviaci la richiesta tramite modulo, dopo la conferma viene realizzato a mano nel nostro laboratorio e ti aggiorniamo fino alla consegna del pezzo finito.',
            },
          },
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
        ],
      },
    ],
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
