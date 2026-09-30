import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crea il Tuo Gioiello Personalizzato',
  description:
    "Dai vita alla tua visione: raccontaci la tua idea e realizziamo insieme un gioiello unico fatto a mano in oro 18kt, diamanti e pietre preziose.",
  keywords: [
    'gioielli su misura',
    'anelli fidanzamento oro 18kt',
    'gioielli personalizzati',
    'crea gioiello',
    'gioiello personalizzato',
  ],
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/custom-jewel',
  },
  openGraph: {
    title: 'Crea il Tuo Gioiello Personalizzato | GDC Jewellery Lab',
    description:
      'Raccontaci la tua idea: realizziamo insieme un gioiello unico fatto a mano in oro 18kt, diamanti e pietre preziose.',
    url: 'https://gdc-jewellery-lab.vercel.app/custom-jewel',
    images: ['/og-cover.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crea il Tuo Gioiello Personalizzato | GDC Jewellery Lab',
    images: ['/og-cover.jpg'],
  },
};

export default function CustomJewelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
