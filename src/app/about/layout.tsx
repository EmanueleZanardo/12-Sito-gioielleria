import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi Siamo | Laboratorio Orafo Artigianale',
  description:
    'GDC Jewellery Lab: la tradizione dell\u2019artigianato orafo, la passione per la perfezione. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/about',
  },
  openGraph: {
    title: 'Chi Siamo | GDC Jewellery Lab',
    description:
      'Una tradizione di artigianato, una passione per la perfezione. Gioielli che creano emozioni.',
    url: 'https://gdc-jewellery-lab.vercel.app/about',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Chi siamo, laboratorio orafo artigianale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chi Siamo | GDC Jewellery Lab',
    images: [
      {
        url: '/og-cover.jpg',
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
