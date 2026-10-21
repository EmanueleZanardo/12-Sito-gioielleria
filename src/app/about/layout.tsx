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
  // QA 16/10 13:36 (miglioria ciclo): title accorciato da 61 a 59 caratteri
  // renderizzati ('Chi Siamo | Laboratorio Orafo Artigianale | GDC Jewellery
  // Lab' superava di 1 il limite ~60 di Google: brand in coda a rischio
  // troncamento). 'Artigiano' al posto di 'Artigianale', senso invariato.
  // Zero cambi visivi.
  title: 'Chi Siamo | Laboratorio Orafo Artigiano',
  description:
    'GDC Jewellery Lab: la tradizione dell\u2019artigianato orafo, la passione per la perfezione. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/about',
  },
  openGraph: {
    type: 'website',
    // QA 11/10 14:36: siteName ridichiarato — i layout di sezione sovrascrivono l'openGraph del root layout e og:site_name
    // andava perso nelle 7 pagine interne (presente solo in home). Zero cambi visivi.
    siteName: 'GDC Jewellery Lab',
    title: 'Chi Siamo | GDC Jewellery Lab',
    description:
      'Una tradizione di artigianato, una passione per la perfezione. Gioielli che creano emozioni.',
    url: 'https://gdc-jewellery-lab.vercel.app/about',
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
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Chi siamo, laboratorio orafo artigianale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi Siamo | GDC Jewellery Lab',
    description:
      'Una tradizione di artigianato, una passione per la perfezione. Gioielli che creano emozioni.',
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Chi siamo, laboratorio orafo artigianale',
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
