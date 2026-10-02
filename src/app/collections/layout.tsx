import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collezioni | Anelli, Collane, Fedi su Misura',
  description:
    'Esplora le collezioni GDC Jewellery Lab: anelli, collane, fedi nuziali, orecchini e bracciali in oro 18kt fatti a mano. Pezzi unici pronti o base per la tua creazione su misura.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/collections',
  },
  openGraph: {
    title: 'Le Collezioni | GDC Jewellery Lab',
    description:
      'Anelli, collane, fedi, orecchini e bracciali artigianali in oro 18kt: pezzi unici già pronti o il punto di partenza per la tua creazione su misura.',
    url: 'https://gdc-jewellery-lab.vercel.app/collections',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Collezioni di gioielli artigianali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Collezioni | GDC Jewellery Lab',
    images: ['/og-cover.jpg'],
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
