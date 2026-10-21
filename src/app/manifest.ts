import type { MetadataRoute } from 'next';

// QA 03/10 15:36 (miglioria del ciclo): Web App Manifest per "Aggiungi a
// schermata Home" su mobile (Android usa theme_color/background_color e
// l'icona 180px già esistente; iOS usa apple-touch-icon). Solo additive,
// zero cambi visivi/design.
// QA 06/10 14:36 (miglioria del ciclo): `id` esplicito — identità stabile
// dell'app installata anche se start_url dovesse mai cambiare (Chrome usa
// start_url come fallback, ma la spec W3C raccomanda l'id esplicito).
// QA 11/10 17:36 (miglioria ciclo): `shortcuts` — scorciatoie nel menu
// long-press dell'icona PWA installata (Android/Chrome) verso le 3 sezioni
// chiave: Collezioni, Gioiello su misura, Contatti. Nomi in italiano come il
// resto del manifest (lang 'it'); icone riusate da /icon-192.png. Zero cambi
// visivi nel sito.
// QA 11/10 23:36 (miglioria ciclo): `categories` — categorizzazione W3C della
// PWA ("shopping": laboratorio orafo che vende gioielli); aiuta gli install
// prompt/store a classificare l'app. Solo additivo, zero cambi visivi.
// QA 12/10 02:36 (miglioria ciclo): `screenshots` — anteprima visiva della
// PWA nei prompt di installazione Android/Chrome (che mostrano fino a 8
// screenshot). Riuso di og-cover.jpg (1200x630 verificati, form wide):
// immagine brand reale, zero file nuovi. Solo additivo, zero cambi visivi.
export default function manifest(): MetadataRoute.Manifest {
  const shortcutIcon = [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
  ];
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
    categories: ['shopping'],
    screenshots: [
      {
        src: '/og-cover.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
    shortcuts: [
      {
        name: 'Collezioni',
        short_name: 'Collezioni',
        description: 'Le collezioni GDC: Anelli, Collane, Fedi e Rombo d\u2019Argento.',
        url: '/collections',
        icons: shortcutIcon,
      },
      {
        name: 'Gioiello su misura',
        short_name: 'Su misura',
        description: 'Crea il tuo gioiello personalizzato con il laboratorio orafo.',
        url: '/custom-jewel',
        icons: shortcutIcon,
      },
      {
        name: 'Contatti',
        short_name: 'Contatti',
        description: 'Contatta il laboratorio: telefono, WhatsApp ed email.',
        url: '/contact',
        icons: shortcutIcon,
      },
    ],
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
        // QA 12/10 16:36 (miglioria ciclo): purpose maskable — su Android
        // l'icona adattiva viene mascherata (cerchio/squircle) senza
        // letterbox bianco; l'icona è full-bleed nera con logo centrato,
        // quindi il crop della safe zone non tocca il contenuto. La 192px
        // resta purpose any (default) per gli usi non-adattivi.
        purpose: 'maskable',
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
