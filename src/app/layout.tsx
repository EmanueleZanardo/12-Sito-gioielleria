import type { Metadata, Viewport } from 'next';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import { MotionProvider } from '@/components/motion-provider';
import { SkipLink } from '@/components/skip-link';
import { serializeJsonLd } from '@/components/json-ld';
import './globals.css';
import { ShareDialog } from '@/components/share/share-dialog';
import { WhatsAppFloat } from '@/components/whatsapp-float';

// Montserrat self-hosted via next/font: elimina la <link> render-blocking
// verso fonts.googleapis.com (e risolve il warning eslint no-page-custom-font).
// display=swap per evitare FOIT; i font Belleza/Lora non erano usati da
// nessun componente (solo Montserrat in tailwind fontFamily), quindi non
// vengono più caricati.
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Cormorant Garamond: serif di lusso per i titoli (headline),
// self-hosted via next/font. display=swap per evitare FOIT.
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const viewport: Viewport = {
  // Il sito è sempre dark (className="dark" su <html>): color-scheme dark
  // allinea scrollbars e controlli nativi (input, date picker) al tema scuro.
  // themeColor unico (niente media query): con tema di sistema chiaro la
  // barra del browser resterebbe beige chiaro su un sito sempre scuro.
  colorScheme: 'dark',
  themeColor: '#0d0b08',
  // QA 10/10 14:36: viewport-fit=cover — SENZA, iOS Safari azzera tutti gli
  // env(safe-area-inset-*): i float con safe-area-inset-bottom (WhatsApp 07/10,
  // share FAB 07/10) su iPhone con home indicator ricevevano inset 0 e sedevano
  // troppo in basso. Con cover gli inset diventano reali; l'header sticky riceve
  // pt safe-area-inset-top (sotto) così la Dynamic Island non lo copre.
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gdc-jewellery-lab.vercel.app'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  title: {
    default: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    template: '%s | GDC Jewellery Lab',
  },
  // QA 10/10 17:36 (miglioria ciclo): description accorciata da 177 a ~151
  // caratteri — oltre ~160 Google la tronca in SERP. Tolto "artigianale" e
  // "fatti a mano" (ridondanti col brand), keyword e CTA invariati.
  description:
    'GDC Jewellery Lab: laboratorio orafo in Ticino. Gioielli su misura in oro 18kt, diamanti e pietre preziose, restauro e riparazioni. Preventivo gratuito.',
  // Il <meta name="theme-color"> è emesso dall'export `viewport` sopra (forma
  // corretta in Next.js 14+): qui in metadata è deprecato e il build
  // stampava "Unsupported metadata themeColor" sulle rotte che fondono i
  // metadata (/contact, /collections, /custom-jewel/order-form).
  keywords: [
    'gioielli su misura Ticino',
    'orafo artigianale',
    'anelli fidanzamento oro 18kt',
    'restauro gioielli',
    'gioielli personalizzati',
    'messa in misura anelli',
    'restauro gioielli vintage',
    'riparazione gioielli',
    'laboratorio orafo',
    'anelli personalizzati',
    'diamanti',
    'pietre preziose',
  ],
  category: 'jewelry',
  // QA 08/10 11:36 (miglioria ciclo): rimosso il blocco robots globale —
  // il layout radice è ereditato anche dalla 404, dove Next.js inietta
  // automaticamente <meta name="robots" content="noindex"/>: sulla 404 live
  // risultavano due meta robots conflittuali (noindex + index,follow).
  // I robots index/follow ora vivono nelle metadata di ogni rotta vetrina.
  // QA 03/10 (builder B2): rimosso il canonical globale '/' ereditato da TUTTE
  // le pagine — segnalava a Google che ogni pagina fosse un duplicato della
  // home. QA 07/10 04:36 (ciclo QA): il canonical self-referencing della
  // homepage è impostato via export `metadata` in src/app/page.tsx (server
  // component che renderizza home-client.tsx — prima era iniettato via
  // useEffect/DOM, ora arriva da SSR); le altre pagine lo hanno via metadata
  // nei layout di rotta.
  // QA 12/10 15:36 (miglioria ciclo): formatDetection.telephone=false —
  // iOS Safari avvolge ogni numero di telefono nel testo in un <a href="tel:">
  // con lo stile UA (blu sottolineato), anche dentro i toast di errore e i
  // fallback <noscript> dove il numero è testo semplice. Il sito fornisce
  // già ovunque link espliciti stilizzati (tel:/wa.me con visited: gold),
  // quindi l'auto-detection aggiungeva solo link non stilizzati. Solo
  // additivo, zero cambi visivi su desktop/Android.
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    description:
      'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    url: 'https://gdc-jewellery-lab.vercel.app',
    siteName: 'GDC Jewellery Lab',
    type: 'website',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'fr_FR', 'de_DE'],
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        // QA 12/10 03:36 (miglioria ciclo): secureUrl esplicito —
        // og:image:secure_url viene letto da alcuni crawler social
        // (LinkedIn, Telegram, WhatsApp) oltre al classico og:image.
        // Solo additivo, zero cambi visivi.
        secureUrl: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        // QA 22/10 07:36 (miglioria ciclo): type esplicito — og:image:type viene letto da alcuni crawler social per validare l'asset senza fetch extra dei header. Solo additivo, zero cambi visivi.
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Gioielli artigianali su misura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDC Jewellery Lab | Gioielli Artigianali su Misura',
    description:
      'Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose. Restauro, riparazioni e preventivo gratuito.',
    images: [
      {
        url: 'https://gdc-jewellery-lab.vercel.app/og-cover.jpg',
        alt: 'GDC Jewellery Lab — Gioielli artigianali su misura',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = 'https://gdc-jewellery-lab.vercel.app';
  // QA 03/10 (miglioria builder B2): il layout globale non ospita più
  // BreadcrumbList — era semanticamente sbagliato (elencava tutte le pagine
  // come briciole della pagina corrente). I BreadcrumbList ora sono per-pagina
  // (home inclusa) e JewelryStore vive solo in homepage; qui resta WebSite.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GDC Jewellery Lab',
    url: baseUrl,
    // QA 10/10 10:36 (miglioria ciclo): inLanguage — il sito serve contenuti
    // in 4 lingue (src/locales/{it,en,fr,de}.json, 384 chiavi pari, switch
    // client-side in language-context.tsx); dichiararlo aiuta Google a capire
    // che il contenuto è multilingua anche senza path di locale.
    // QA 11/10 12:36 (miglioria ciclo): speakable (SpeakableSpecification)
    // sulla tagline hero — era qui nel WebSite globale, ma il layout radice
    // lo emetteva su TUTTE le pagine mentre id="hero-subtitle" esiste solo in
    // homepage (Google ignora i selettori non risolti: verificato 13/10 04:36
    // sulle 7 pagine prerenderizzate, MISSING su 6/7). Spostato nel JSON-LD
    // JewelryStore della home (home-client.tsx), dove entrambi gli id
    // risolvono. Qui resta WebSite senza speakable. Zero cambi visivi.
    // QA 11/10 19:36 (miglioria ciclo): sameAs con il profilo Instagram
    // ufficiale — collega il WebSite al profilo social nelle Knowledge Graph
    // di Google. URL verificato contro i link già presenti nel sito
    // (footer/contatti). Zero cambi visivi.
    sameAs: ['https://www.instagram.com/gdc_jewellery_lab'],
    // QA 12/10 07:36 (miglioria ciclo): publisher (Organization + logo) sul
    // WebSite — completa il collegamento entità: WebSite → publisher con
    // logo 1:1 col logo reale in header/footer (stesso URL postimg), più il
    // sameAs Instagram già presente. Google usa publisher.logo per i
    // Knowledge Graph/brand. Solo additivo, zero cambi visivi.
    publisher: {
      '@type': 'Organization',
      name: 'GDC Jewellery Lab',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: 'https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png',
        // QA 12/10 09:36 (miglioria ciclo): width/height MISURATI (606x412,
        // header IHDR del PNG scaricato live) — stesso pattern del ciclo
        // 00:36 sull'image del JewelryStore (1200x630 misurati). Google usa
        // le dimensioni dichiarate per il logo nei Knowledge Graph/brand;
        // l'URL e' 1:1 col logo visibile in header/footer/hero. Dato onesto,
        // solo additivo, zero cambi visivi.
        width: 606,
        height: 412,
      },
    },
    inLanguage: ['it', 'en', 'fr', 'de'],
  };
  return (
    <html lang="it" className={`${montserrat.variable} ${cormorant.variable} dark`}>
      <head>
        {/* QA 11/10 16:36 (miglioria ciclo): sync anticipata del lang.
            Il layout emette <html lang="it"> statico e il LanguageProvider
            sincronizza document.documentElement.lang solo a hydration avvenuta:
            chi torna con un'altra lingua salvata (en/fr/de) aveva un flash di
            lang errato nel DOM iniziale (gli screen reader leggono il lang
            dall'avvio). Questo script bloccante in <head> legge la stessa
            chiave usata dal provider ('gdc-jewellery-lab:language') e imposta
            il lang prima del first paint — whitelist dei 4 codici validi,
            try/catch contro localStorage non disponibile, no-op se assente.
            Zero cambi visivi, nessuna CSP a bloccare gli inline script. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('gdc-jewellery-lab:language');if(l==='it'||l==='en'||l==='fr'||l==='de'){document.documentElement.lang=l}}catch(e){}`,
          }}
        />
        {/* QA 13/10 01:36 (miglioria ciclo): rimosso il preconnect morto a
            i.postimg.cc (introdotto il 03/10) — tutte le immagini passano per
            il loader di next/image e sono servite da /_next/image (same
            origin; verificato nel live HTML: 313 riferimenti /_next/image,
            zero connessioni dirette del browser a i.postimg.cc, nessuno
            service worker, nessun fetch() diretto). Il browser non apre mai
            connessioni verso quell'origin, quindi il preconnect era un hint
            morto. Stesso pattern della rimozione dns-prefetch del ciclo
            00:36: un tag <link> in meno da parsare, zero cambi
            funzionali/visivi. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <MotionProvider>
        <LanguageProvider>
            <SkipLink />
            <div className="flex min-h-screen flex-col overflow-x-clip">
              <Header />
              {/* tabIndex={-1}: il <main> è il target dello SkipLink ("salta al
                  contenuto"). Senza tabindex focalizzabile il link sposta solo
                  lo scroll ma non il focus da tastiera/screen reader in alcuni
                  browser; -1 lo rende focalizzabile programmaticamente senza
                  aggiungerlo all'ordine di tabulazione. */}
              {/* QA 20/10 15:36 (focus-not-obscured, WCAG 2.4.11): lo scroll-mt
                  compensa l'header sticky (h-20 + safe-area-inset-top): senza,
                  il salto dello skip link portava l'inizio del contenuto sotto
                  l'header. Formula identica all'altezza reale dell'header. */}
              <main id="main-content" tabIndex={-1} className="flex-grow scroll-mt-[calc(5rem+env(safe-area-inset-top))] outline-none">{children}</main>
              <Footer />
            </div>
            {/* QA 07/10 (worker A, micro-UX mobile): safe-area-inset-bottom come
                il float WhatsApp (bottom-left) — su iPhone con home indicator
                il bottone restava nella zona non sicura. */}
            <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-50">
                <ShareDialog size="lg" className="rounded-full h-14 w-14 shadow-lg" />
            </div>
            {/* CTA WhatsApp sempre visibile (bottom-left), con messaggio
                precompilato nella lingua attiva. */}
            <WhatsAppFloat />
            <Toaster />
        </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
