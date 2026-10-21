import type { Metadata } from 'next';

export const metadata: Metadata = {
  // QA 08/10 11:36 (miglioria ciclo): robots index/follow qui nella
  // metadata di rotta invece che nel layout radice — il root layout viene
  // ereditato anche dalla 404, dove Next.js inietta automaticamente
  // <meta name="robots" content="noindex"/>: il risultato era una coppia di
  // meta robots conflittuali (noindex + index,follow) sulla pagina 404 live.
  // Con i robots per-rotta, la 404 emette solo noindex. Zero cambi visivi.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Blitz SEO 07/10/2026 (worker B): "Rombo d'Argento" nel title/description —
  // è il nome ufficiale della collezione moto (ex "Iron Soul"), keyword distintiva.
  // QA 10/10 17:36 (miglioria ciclo): title accorciato da 72 a 57 caratteri
  // renderizzati ("Collezioni | Anelli, Collane, Fedi e Rombo d’Argento | GDC
  // Jewellery Lab" veniva troncato da Google a ~65ch, perdendo il brand in
  // coda). "Rombo d'Argento" resta nel title; Anelli/Collane/Fedi restano in
  // description, OG e JSON-LD. Zero cambi visivi.
  title: 'Collezioni: Gioielli e Rombo d’Argento',
  description:
    'Le collezioni GDC: anelli, collane, fedi in oro 18kt fatti a mano e la collezione Rombo d’Argento — ciondoli moto in argento 925 forgiati a mano.',
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/collections',
  },
  openGraph: {
    type: 'website',
    // QA 11/10 14:36: siteName ridichiarato — i layout di sezione sovrascrivono l'openGraph del root layout e og:site_name
    // andava perso nelle 7 pagine interne (presente solo in home). Zero cambi visivi.
    siteName: 'GDC Jewellery Lab',
    title: 'Le Collezioni | GDC Jewellery Lab',
    description:
      'Anelli, collane, fedi in oro 18kt fatti a mano e la collezione Rombo d’Argento: ciondoli moto in argento 925 forgiati a mano. Pezzi unici o base per la tua creazione su misura.',
    url: 'https://gdc-jewellery-lab.vercel.app/collections',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        // Foto reale di gioiello (prod_001 in src/lib/data.ts) — CTR migliore della cover generica (QA SEO 04/10/2026 M4)
        url: 'https://i.postimg.cc/jS3Xg4zs/Gemini-Generated-Image-5ooedx5ooedx5ooe.png',
        // QA 12/10 08:36 (miglioria ciclo): secureUrl esplicito —
        // questo era l'UNICO layout per-rotta senza (about, services,
        // orders, contact, custom-jewel, order-form lo avevano dal ciclo
        // 04:36; collections era sfuggito perché usa un'immagine
        // postimg.cc invece della og-cover generica — anche lei HTTPS,
        // quindi secure_url coincide con url). og:image:secure_url e'
        // letto da LinkedIn/Telegram/WhatsApp oltre a og:image.
        // Solo additivo, zero cambi visivi.
        secureUrl: 'https://i.postimg.cc/jS3Xg4zs/Gemini-Generated-Image-5ooedx5ooedx5ooe.png',
        // QA 17/10 16:36 (bugfix ciclo): width/height erano 1200x630 ma
        // l'immagine reale e' 483x800 (verificato su IHDR del PNG) —
        // i metadati falsi facevano pre-allocare la card con aspect
        // sbagliato. Dimensioni oneste = nessun cambio visivo sul sito.
        width: 483,
        height: 800,
        alt: 'GDC Jewellery Lab — Collezioni di gioielli artigianali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Collezioni | GDC Jewellery Lab',
    description:
      'Anelli, collane, fedi in oro 18kt fatti a mano e la collezione Rombo d’Argento: ciondoli moto in argento 925 forgiati a mano. Pezzi unici o base per la tua creazione su misura.',
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
