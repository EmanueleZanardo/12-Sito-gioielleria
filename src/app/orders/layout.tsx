import type { Metadata } from 'next';

export const metadata: Metadata = {
  // QA 08/10 11:36 (miglioria ciclo): robots index/follow qui nella
  // metadata di rotta invece che nel layout radice — il root layout viene
  // ereditato anche dalla 404, dove Next.js inietta automaticamente
  // <meta name="robots" content="noindex"/>: il risultato era una coppia di
  // meta robots conflittuali (noindex + index,follow) sulla pagina 404 live.
  // Con i robots per-rotta, la 404 emette solo noindex. Zero cambi visivi.
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
  title: 'Come Ordinare il Tuo Gioiello su Misura',
  description:
    'Ogni gioiello GDC è realizzato su misura: scegli o disegna il tuo pezzo, richiedi preventivo e tempistiche, conferma e ricevi il gioiello fatto a mano.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/orders',
  },
  openGraph: {
    type: 'website',
    // QA 11/10 14:36: siteName ridichiarato — i layout di sezione sovrascrivono l'openGraph del root layout e og:site_name
    // andava perso nelle 7 pagine interne (presente solo in home). Zero cambi visivi.
    siteName: 'GDC Jewellery Lab',
    title: 'Come Ordinare | GDC Jewellery Lab',
    description:
      'Ogni gioiello GDC è realizzato su misura. Ecco come funziona, passo dopo passo.',
    url: 'https://gdc-jewellery-lab.vercel.app/orders',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        // QA 12/10 04:36 (miglioria ciclo): secureUrl esplicito —
        // completa la miglioria 03:36 (root layout) su tutte le rotte
        // con openGraph proprio: og:image:secure_url e' letto da
        // LinkedIn/Telegram/WhatsApp oltre a og:image. Solo additivo.
        secureUrl: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        // QA 22/10 07:36 (miglioria ciclo): type esplicito — og:image:type viene letto da alcuni crawler social per validare l'asset senza fetch extra dei header. Solo additivo, zero cambi visivi.
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Come ordinare il tuo gioiello su misura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Come Ordinare | GDC Jewellery Lab',
    description:
      'Ogni gioiello GDC è realizzato su misura. Ecco come funziona, passo dopo passo.',
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Come ordinare il tuo gioiello su misura',
      },
    ],
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
