import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modulo Ordine Gioiello su Misura',
  description:
    'Richiedi il tuo gioiello personalizzato: compila il modulo con materiali, pietre e misure. Ti risponderemo con preventivo e tempistiche.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/custom-jewel/order-form',
  },
  openGraph: {
    title: 'Ordina il Tuo Gioiello su Misura | GDC Jewellery Lab',
    description:
      'Compila il modulo d\u2019ordine: ti risponderemo con preventivo e tempistiche.',
    url: 'https://gdc-jewellery-lab.vercel.app/custom-jewel/order-form',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Ordina il tuo gioiello personalizzato',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ordina il Tuo Gioiello su Misura | GDC Jewellery Lab',
    images: ['/og-cover.jpg'],
  },
};

export default function OrderFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
