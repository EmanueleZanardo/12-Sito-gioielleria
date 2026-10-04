import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Come Ordinare il Tuo Gioiello su Misura',
  description:
    'Ogni gioiello GDC è realizzato su misura: scegli o disegna il tuo pezzo, richiedi preventivo e tempistiche, conferma e ricevi il gioiello fatto a mano.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/orders',
  },
  openGraph: {
    title: 'Come Ordinare | GDC Jewellery Lab',
    description:
      'Ogni gioiello GDC è realizzato su misura. Ecco come funziona, passo dopo passo.',
    url: 'https://gdc-jewellery-lab.vercel.app/orders',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: '/og-cover.jpg',
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
        url: '/og-cover.jpg',
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
