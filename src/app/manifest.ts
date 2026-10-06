import type { MetadataRoute } from 'next';

// QA 03/10 15:36 (miglioria del ciclo): Web App Manifest per "Aggiungi a
// schermata Home" su mobile (Android usa theme_color/background_color e
// l'icona 180px già esistente; iOS usa apple-touch-icon). Solo additive,
// zero cambi visivi/design.
// QA 06/10 14:36 (miglioria del ciclo): `id` esplicito — identità stabile
// dell'app installata anche se start_url dovesse mai cambiare (Chrome usa
// start_url come fallback, ma la spec W3C raccomanda l'id esplicito).
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'GDC Jewellery Lab — Gioielli Artigianali su Misura',
    short_name: 'GDC Jewellery Lab',
    description:
      'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0b08',
    theme_color: '#0d0b08',
    lang: 'it',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  };
}
