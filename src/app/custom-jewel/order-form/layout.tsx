import type { Metadata } from 'next';

export const metadata: Metadata = {
  // QA 21/10 05:36 (fix ciclo, sezione sweep 128 PAGE-TITLE-UNIQUE): rimosso
  // il suffisso brand dal title — il root layout applica il template
  // '%s | GDC Jewellery Lab' a ogni title-string figlio, quindi qui veniva
  // renderizzato DOPPIO ('... | GDC Jewellery Lab | GDC Jewellery Lab',
  // 76 caratteri). Il template riaggiunge il brand da solo: il title
  // renderizzato resta identico all'intento originale, brand una volta sola.
  title: 'Modulo Ordine Gioiello su Misura',
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
    type: 'website',
    // QA 11/10 14:36: siteName ridichiarato — i layout di sezione sovrascrivono l'openGraph del root layout e og:site_name
    // andava perso nelle 7 pagine interne (presente solo in home). Zero cambi visivi.
    siteName: 'GDC Jewellery Lab',
    title: 'Ordina il Tuo Gioiello su Misura | GDC Jewellery Lab',
    description:
      'Compila il modulo d\u2019ordine: ti risponderemo con preventivo e tempistiche.',
    url: 'https://gdc-jewellery-lab.vercel.app/custom-jewel/order-form',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        // QA 12/10 04:36 (miglioria ciclo): secureUrl esplicito —
        // completa la miglioria 03:36 (root layout) su tutte le rotte
        // con openGraph proprio: og:image:secure_url e' letto da
        // LinkedIn/Telegram/WhatsApp oltre a og:image. Solo additivo.
        secureUrl: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Ordina il tuo gioiello personalizzato',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ordina il Tuo Gioiello su Misura | GDC Jewellery Lab',
    // QA 11/10 15:36 (miglioria ciclo): description mancante — unico dei 7
    // layout di sezione senza (about, collections, contact, custom-jewel,
    // orders, services lo hanno tutti). X/Twitter senza description fa
    // fallback su og:description, ma la descrizione esplicita è il pattern
    // corretto e 1:1 con quella OG. Zero cambi visivi.
    description: 'Compila il modulo d\u2019ordine: ti risponderemo con preventivo e tempistiche.',
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
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
