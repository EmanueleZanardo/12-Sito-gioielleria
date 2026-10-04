import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti e Preventivo Gratuito',
  description:
    'Contatta GDC Jewellery Lab per domande, collezioni o progetti personalizzati. Richiedi un preventivo gratuito per il tuo gioiello su misura in oro 18kt.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/contact',
  },
  openGraph: {
    title: 'Contattaci | GDC Jewellery Lab',
    description:
      'Saremmo felici di sentirti: inizia il tuo progetto personalizzato o richiedi un preventivo gratuito.',
    url: 'https://gdc-jewellery-lab.vercel.app/contact',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Contatti e preventivo gratuito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contattaci | GDC Jewellery Lab',
    description:
      'Saremmo felici di sentirti: inizia il tuo progetto personalizzato o richiedi un preventivo gratuito.',
    images: [
      {
        url: '/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Contatti e preventivo gratuito',
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
