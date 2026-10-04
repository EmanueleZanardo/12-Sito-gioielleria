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
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        // Foto reale di gioiello (prod_001 in src/lib/data.ts) — CTR migliore della cover generica (QA SEO 04/10/2026 M4)
        url: 'https://i.postimg.cc/jS3Xg4zs/Gemini-Generated-Image-5ooedx5ooedx5ooe.png',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Collezioni di gioielli artigianali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Collezioni | GDC Jewellery Lab',
    description:
      'Anelli, collane, fedi, orecchini e bracciali artigianali in oro 18kt: pezzi unici già pronti o il punto di partenza per la tua creazione su misura.',
    images: [
      {
        url: 'https://i.postimg.cc/jS3Xg4zs/Gemini-Generated-Image-5ooedx5ooedx5ooe.png',
        alt: 'GDC Jewellery Lab — Collezioni di gioielli artigianali',
      },
    ],
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
