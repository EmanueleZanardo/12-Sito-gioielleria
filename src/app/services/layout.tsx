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
  // QA 10/10 17:36 (miglioria ciclo): title accorciato da 74 a 57 caratteri
  // renderizzati ("Servizi Orafo: Restauro, Riparazioni e Messa in Misura |
  // GDC Jewellery Lab" veniva troncato da Google a ~65ch, perdendo il brand
  // in coda). "Messa in misura" resta in description e keywords. Zero cambi
  // visivi.
  title: 'Servizi Orafo: Restauro e Riparazioni',
  description:
    'Design e realizzazione gioielli personalizzati, restauro gioielli vintage, messa in misura anelli e bracciali, cambio pila orologi e rimessa a nuovo completa.',
  keywords: [
    'restauro gioielli',
    'messa in misura anelli',
    'riparazione gioielli',
    'restauro gioielli vintage',
    'cambio pila orologi',
    'restauro bracciali orologi',
    'rimessa a nuovo gioielli',
  ],
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/services',
  },
  openGraph: {
    type: 'website',
    // QA 11/10 14:36: siteName ridichiarato — i layout di sezione sovrascrivono l'openGraph del root layout e og:site_name
    // andava perso nelle 7 pagine interne (presente solo in home). Zero cambi visivi.
    siteName: 'GDC Jewellery Lab',
    title: 'I Nostri Servizi | GDC Jewellery Lab',
    description:
      'Cura e personalizzazione dei tuoi gioielli e orologi: restauro, riparazioni, messa in misura e design personalizzato.',
    url: 'https://gdc-jewellery-lab.vercel.app/services',
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
        alt: 'GDC Jewellery Lab — Servizi orafo: restauro e riparazioni',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I Nostri Servizi | GDC Jewellery Lab',
    description:
      'Cura e personalizzazione dei tuoi gioielli e orologi: restauro, riparazioni, messa in misura e design personalizzato.',
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Servizi orafo: restauro e riparazioni',
      },
    ],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
