import type { Metadata } from 'next';

export const metadata: Metadata = {
  // QA 22/10 01:36 (miglioria ciclo): robots index/follow qui nella
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
  title: 'Privacy Policy | GDC Jewellery Lab',
  description:
    'Informativa sul trattamento dei dati personali di GDC Jewellery Lab: quali dati raccogliamo dai moduli del sito, perché li usiamo e quali sono i tuoi diritti.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/privacy',
  },
  openGraph: {
    type: 'website',
    // QA 11/10 14:36: siteName ridichiarato — i layout di sezione sovrascrivono
    // l'openGraph del root layout e og:site_name andava perso nelle pagine
    // interne (presente solo in home). Zero cambi visivi.
    siteName: 'GDC Jewellery Lab',
    title: 'Privacy Policy | GDC Jewellery Lab',
    description:
      'Informativa sul trattamento dei dati personali: quali dati raccogliamo, perché li usiamo e quali sono i tuoi diritti.',
    url: 'https://gdc-jewellery-lab.vercel.app/privacy',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        secureUrl: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Gioielli artigianali su misura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | GDC Jewellery Lab',
    description:
      'Informativa sul trattamento dei dati personali: quali dati raccogliamo, perché li usiamo e quali sono i tuoi diritti.',
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Gioielli artigianali su misura',
      },
    ],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
