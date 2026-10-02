import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servizi Orafo: Restauro, Riparazioni e Messa in Misura',
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
    title: 'I Nostri Servizi | GDC Jewellery Lab',
    description:
      'Cura e personalizzazione dei tuoi gioielli e orologi: restauro, riparazioni, messa in misura e design personalizzato.',
    url: 'https://gdc-jewellery-lab.vercel.app/services',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Servizi orafo: restauro e riparazioni',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I Nostri Servizi | GDC Jewellery Lab',
    images: ['/og-cover.jpg'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
