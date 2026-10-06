import type { Metadata } from 'next';

export const metadata: Metadata = {
  // QA 06/10 22:36: suffisso brand aggiunto per coerenza con tutte le altre
  // pagine (title SEO unici con "| GDC Jewellery Lab").
  title: 'Modulo Ordine Gioiello su Misura | GDC Jewellery Lab',
  description:
    'Richiedi il tuo gioiello personalizzato: compila il modulo con materiali, pietre e misure. Ti risponderemo con preventivo e tempistiche.',
  robots: {
    // QA 03/10 (miglioria ciclo): i moduli di preventivo/ordine non devono
    // essere indicizzati — Google mostra solo le pagine vetrina.
    index: false,
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
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
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
    images: [
      {
        url: '/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Ordina il tuo gioiello personalizzato',
      },
    ],
  },
};

export default function OrderFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
