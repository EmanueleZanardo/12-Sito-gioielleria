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
    images: ['/og-cover.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Come Ordinare | GDC Jewellery Lab',
    images: ['/og-cover.jpg'],
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
