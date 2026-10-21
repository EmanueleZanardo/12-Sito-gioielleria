'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import heroImage from '@/lib/hero-image.json';
import { orderedProducts, type ProductImage } from '@/lib/data';
import { motion } from 'framer-motion';
import { ImageLightbox } from '@/components/image-lightbox';
import { JsonLd, SITE_URL } from '@/components/json-ld';
import { useTranslation } from '@/hooks/use-translation';
import { ProductCard } from '@/components/product-card';
import { ShareDialog } from '@/components/share/share-dialog';
import { Badge } from '@/components/ui/badge';
import { Check, MessageCircle, ArrowRight, Hammer, Gem, PencilRuler, Sparkles } from 'lucide-react';

const TEASER_COLLECTIONS = [
  {
    // QA 03/10: le card puntano alle ancore di categoria in /collections,
    // non più alla pagina generica.
    href: '/collections#anelli',
    imageUrl: 'https://i.postimg.cc/htZry19G/Gemini-Generated-Image-cwx29lcwx29lcwx2.png',
    key: 'rings' as const,
  },
  {
    href: '/collections#collane-e-pendenti',
    imageUrl: 'https://i.postimg.cc/Dww6PMbF/Gemini-Generated-Image-lr2kymlr2kymlr2k.png',
    key: 'necklaces' as const,
  },
  {
    href: '/collections#fedi',
    imageUrl: 'https://i.postimg.cc/HkpNxLcF/photo-2026-04-24-07-41-22.jpg',
    key: 'weddingRings' as const,
  },
  {
    href: '/collections#moto',
    imageUrl: '/collections/moto/moto-01.jpg',
    key: 'moto' as const,
  },
];

export default function HomeClient() {
  const { t } = useTranslation('home');
  const { t: tCol } = useTranslation('collections');
  const { t: tCommon } = useTranslation('common');
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);

  // WhatsApp con recapito già presente nel sito (pagina contatti)
  const whatsappUrl = `https://wa.me/393451114337?text=${encodeURIComponent(
    t('customJewel.whatsappPrefill')
  )}`;

  const allProducts = orderedProducts.map(product => ({
    ...product,
    groupName: t(`collections.${product.groupInfo.id}.name`),
    // Descrizione localizzata (home.gallery.descriptions): la caption della
    // galleria segue la lingua attiva invece di restare sempre in italiano.
    description: t(`gallery.descriptions.${product.groupInfo.id}`)
  }));

  const handleImageClick = (product: ProductImage) => {
    const index = allProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      setLightboxImageIndex(index);
      // Deep-link via hash: #lightbox/<id> — la lightbox si riapre alla
      // stessa immagine con back/forward del browser o link condiviso.
      window.location.hash = `lightbox/${allProducts[index].id}`;
    }
  };

  const handleCloseLightbox = () => {
    setLightboxImageIndex(null);
    if (window.location.hash.startsWith('#lightbox/')) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`
      );
    }
  };

  // QA 07/10 02:36: il canonical self-referencing della homepage ora arriva
  // da SSR (export metadata in page.tsx): l'App Router lo aggiorna da solo
  // nella navigazione client-side — niente più iniezione DOM via effect.
  // Ref stabile per l'effect hash: allProducts è un array nuovo a ogni render,
  // usarlo come dipendenza ri-eseguirebbe la sincronizzazione hash → stato
  // a ogni render, vanificando prev/next della lightbox.
  const allProductsRef = useRef(allProducts);
  allProductsRef.current = allProducts;

  // Legge l'hash all'apertura e lo segue (hashchange): #lightbox/<id>
  // apre la lightbox, qualsiasi altro hash la chiude.
  useEffect(() => {
    const openFromHash = () => {
      const m = window.location.hash.match(/^#lightbox\/([\w-]+)$/);
      const list = allProductsRef.current;
      if (m) {
        const idx = list.findIndex((p) => p.id === m[1]);
        setLightboxImageIndex(idx >= 0 ? idx : null);
      } else {
        setLightboxImageIndex(null);
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  // Tiene l'hash sincronizzato con l'immagine mostrata (deep-link stabile).
  // replaceState: aggiorna l'hash senza sparare hashchange (niente loop).
  const syncHashToIndex = (index: number) => {
    const id = allProductsRef.current[index]?.id;
    if (id) {
      window.history.replaceState(null, '', `#lightbox/${id}`);
    }
  };

  const handleNext = () => {
    if (lightboxImageIndex !== null) {
      const next = (lightboxImageIndex + 1) % allProductsRef.current.length;
      setLightboxImageIndex(next);
      syncHashToIndex(next);
    }
  };

  const handlePrevious = () => {
    if (lightboxImageIndex !== null) {
      const len = allProductsRef.current.length;
      const prev = (lightboxImageIndex - 1 + len) % len;
      setLightboxImageIndex(prev);
      syncHashToIndex(prev);
    }
  };
  
  const currentProduct = lightboxImageIndex !== null ? allProducts[lightboxImageIndex] : null;

  // URL delle immagini adiacenti per il preload nella lightbox
  const preloadSrcs =
    lightboxImageIndex !== null
      ? [
          allProducts[(lightboxImageIndex + 1) % allProducts.length].imageUrl,
          allProducts[(lightboxImageIndex - 1 + allProducts.length) % allProducts.length].imageUrl,
        ]
      : [];


  // JSON-LD homepage: JewelryStore con SOLO dati già pubblici sul sito
  // (nome, url, telefono/email della pagina contatti, "in Ticino" dal copy).
  // Niente indirizzo fisico: non è pubblicato da nessuna parte, non inventarlo.
  const jewelryStoreJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'GDC Jewellery Lab',
    description:
      'Laboratorio orafo artigianale in Ticino. Gioielli su misura fatti a mano in oro 18kt, diamanti e pietre preziose, restauro e riparazioni.',
    url: SITE_URL,
    // QA 12/10 05:36 (miglioria ciclo): inLanguage — il blocco WebSite del
    // root layout lo dichiara dal 10/10; JewelryStore e ItemList della home
    // non lo avevano. Contenuto in italiano di default (og:locale it_IT),
    // coerente col resto della pagina. Solo additivo, zero cambi visivi.
    inLanguage: 'it',
    // QA 12/10/2026 00:36 (miglioria ciclo): image come ImageObject con
    // dimensioni verificate (1200x630 — og-cover.jpg scaricata live e
    // misurata, stesse dimensioni gia' dichiarate nell'openGraph del
    // layout) invece di stringa semplice: Google legge meglio le immagini
    // dei LocalBusiness nei rich result. Dato onesto, zero cambi visivi.
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/og-cover.jpg`,
      width: 1200,
      height: 630,
    },
    telephone: '+393451114337',
    email: 'laboratorio.ticino@gmail.com',
    priceRange: '€€',
    // QA 12/10 11:36 (miglioria ciclo): contactPoint — schema.org lo raccomanda
    // sul LocalBusiness per il punto di contatto clienti: stesso telefono reale
    // già dichiarato come `telephone` (WhatsApp +39 345 111 4337, pubblicato in
    // footer/contatti) con contactType 'customer service' e le 4 lingue reali
    // del sito (src/locales/{it,en,fr,de}.json, switch client-side) come
    // availableLanguage. Aiuta Google/assistenti vocali a capire come e in che
    // lingua contattare il laboratorio. Dato onesto, solo additivo, zero cambi
    // visivi.
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+393451114337',
      contactType: 'customer service',
      availableLanguage: ['Italian', 'English', 'French', 'German'],
    },
    // QA 11/10 21:36 (miglioria ciclo): slogan — la tagline "Gioielli
    // Artigianali su Misura" è già nel <title> e nell'og:title; dichiararla
    // come slogan (proprietà Organization di schema.org) rafforza il
    // collegamento nome-attività nelle Knowledge Graph. Dato onesto, già
    // pubblicato sul sito. Zero cambi visivi.
    slogan: 'Gioielli Artigianali su Misura',
    // QA 11/10 22:36 (miglioria ciclo): knowsAbout — i 6 servizi della pagina
    // /services (src/locales/it.json services.serviceList, copy gia' pubblico
    // sul sito): schema.org lo raccomanda sull'Organization per collegare
    // attivita' e competenze nelle Knowledge Graph. Niente inventato, solo
    // i nomi dei servizi gia' pubblicati. Zero cambi visivi.
    knowsAbout: [
      'Gioielli personalizzati su misura',
      'Messa in misura di anelli e bracciali',
      'Restauro e modifica di gioielli vintage',
      'Rimessa a nuovo di gioielli',
      'Cambio pila orologi',
      'Restauro di bracciali orologi',
    ],
    // QA 10/10 20:36 (miglioria ciclo): currenciesAccepted — schema.org lo
    // raccomanda sul LocalBusiness; il laboratorio è in Ticino (Svizzera),
    // la valuta è il franco svizzero. Zero cambi visivi.
    currenciesAccepted: 'CHF',
    // QA 11/10 07:36 (miglioria ciclo): speakable (SpeakableSpecification,
    // cssSelector #perche-gdc) sulla sezione "Perché GDC" visibile —
    // il candidato naturale per gli assistenti vocali sul JewelryStore
    // (descrizione del laboratorio artigianale), stesso pattern di #storia
    // su /about (03:36), #steps su /orders (05:36), #lightbox deep-link
    // galleria (04:36) e #recapiti su /contact (06:36); 1:1 col contenuto
    // visibile, i18n attiva, zero cambi visivi.
    // QA 13/10 04:36 (fix ciclo): aggiunto #hero-subtitle (tagline hero, era
    // nello speakable del WebSite globale del layout dove non risolveva su
    // 6/7 pagine — Google ignora i selettori non risolti). Qui entrambi gli
    // id esistono nel prerenderizzato della home (verificato in build).
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#hero-subtitle', '#perche-gdc'],
    },
    sameAs: ['https://www.instagram.com/gdc_jewellery_lab'],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Ticino' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
  };

  // ItemList delle creazioni in galleria (Product senza offers/prezzo:
  // laboratorio artigianale su misura, corretto così).
  // QA 04/10 23:36 (miglioria ciclo): url su ogni item — la galleria non ha
  // pagine-prodotto singole, ma ogni creazione è visibile nella sezione
  // #gallery della home: l'URL con ancora è il riferimento canonico legittimo
  // dell'item per Google (item senza url = segnale più debole).
  // Blitz SEO 07/10/2026 (worker B): niente più slice(0, 20) — tutti i 21 pezzi
  // della galleria sono nell'ItemList.
  // QA 12/10/2026 17:36 (miglioria ciclo): dimensioni reali delle 21 foto
  // della galleria (scaricate live da i.postimg.cc e misurate con PIL il
  // 12/10/2026) — servono per l'ImageObject qui sotto. Ogni filename e'
  // unico nei path (verificato: zero duplicati), quindi la chiave filename
  // e' sicura. Stesso pattern dei Product Rombo d'Argento (10:36), delle
  // copertine /collections (12:36), del logo publisher (09:36) e della cover
  // JewelryStore (00:36). Dato onesto, zero cambi visivi.
  const GALLERY_IMAGE_DIMS: Record<string, { width: number; height: number }> = {
    'Gemini-Generated-Image-36eugs36eugs36eu.png': { width: 533, height: 800 },
    'Gemini-Generated-Image-4p38yd4p38yd4p38.png': { width: 535, height: 800 },
    'Gemini-Generated-Image-5ooedx5ooedx5ooe.png': { width: 483, height: 800 },
    'Gemini-Generated-Image-9d3b8t9d3b8t9d3b.png': { width: 612, height: 800 },
    'Gemini-Generated-Image-c4uur4c4uur4c4uu.png': { width: 555, height: 800 },
    'Gemini-Generated-Image-ckrev3ckrev3ckre.png': { width: 488, height: 800 },
    'Gemini-Generated-Image-cwx29lcwx29lcwx2.png': { width: 768, height: 800 },
    'Gemini-Generated-Image-fz223lfz223lfz22.png': { width: 591, height: 800 },
    'Gemini-Generated-Image-jrfgvljrfgvljrfg.png': { width: 555, height: 800 },
    'Gemini-Generated-Image-lr2kymlr2kymlr2k.png': { width: 555, height: 800 },
    'Gemini-Generated-Image-ppnciqppnciqppnc.png': { width: 509, height: 800 },
    'Gemini-Generated-Image-uirhw7uirhw7uirh.png': { width: 509, height: 800 },
    'Gemini-Generated-Image-waufz6waufz6wauf.png': { width: 656, height: 800 },
    'photo-2026-04-24-07-41-22.jpg': { width: 588, height: 800 },
    'photo-2026-04-24-07-42-21.jpg': { width: 699, height: 800 },
    'photo-2026-04-24-07-44-56.jpg': { width: 1280, height: 894 },
    'photo-6005879377222552120-y.jpg': { width: 533, height: 800 },
    'photo-6005879377222552124-y.jpg': { width: 533, height: 800 },
    'photo-6005879377222552125-y.jpg': { width: 533, height: 800 },
    'photo-6005879377222552126-y.jpg': { width: 533, height: 800 },
    'photo-6005879377222552127-y.jpg': { width: 533, height: 800 },
  };

  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Galleria creazioni GDC Jewellery Lab',
    // QA 12/10 05:36 (miglioria ciclo): inLanguage 'it' — come sul
    // JewelryStore qui sopra e sul WebSite del root layout (10/10).
    // Solo additivo, zero cambi visivi.
    inLanguage: 'it',
    // QA 10/10 18:36 (miglioria ciclo): numberOfItems dinamico da
    // orderedProducts.length — schema.org lo raccomanda sull'ItemList e
    // Google lo usa per i rich result di liste; stesso pattern di
    // services/page.tsx (numberOfItems: serviceList.length). Zero cambi visivi.
    numberOfItems: orderedProducts.length,
    // QA 11/10 10:36 (miglioria ciclo): speakable (SpeakableSpecification)
    // sulla sezione galleria visibile (id="gallery") — completamento della
    // serie: #servizi /services (08:36), #collezioni /collections (09:36),
    // #perche-gdc home (07:36), #recapiti /contact (06:36), #steps /orders
    // (05:36), #storia /about (03:36), FAQPage /custom-jewel (00:36).
    // Titolo sezione ("Galleria" + sottotitolo) 1:1 col name dell'ItemList,
    // nomi creazioni negli aria-label delle card. Zero cambi visivi.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#gallery'],
    },
    itemListElement: orderedProducts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.description,
        description: p.description,
        // QA 12/10/2026 17:36 (miglioria ciclo): image come ImageObject con
        // width/height misurate (GALLERY_IMAGE_DIMS qui sopra) invece di
        // stringa semplice — stesso pattern delle copertine /collections
        // (12:36). Google usa le dimensioni dichiarate per il rendering nei
        // rich result. Dato onesto, zero cambi visivi.
        image: {
          '@type': 'ImageObject',
          url: p.imageUrl,
          ...(GALLERY_IMAGE_DIMS[p.imageUrl.split('/').pop() ?? ''] ?? {}),
        },
        // QA 11/10 04:36 (miglioria ciclo): deep-link per-prodotto
        // #lightbox/<id> invece dell'ancora generica #gallery — la lightbox
        // si riapre davvero su quell'hash (hashchange listener qui sopra:
        // back/forward e link condivisi funzionano), quindi ogni creazione
        // ha ora un riferimento 1:1 col suo stato visualizzabile invece di
        // condividere un'unica ancora in 21. Zero cambi visivi.
        url: `${SITE_URL}/#lightbox/${p.id}`,
        brand: { '@type': 'Brand', name: 'GDC Jewellery Lab' },
      },
    })),
  };

  return (
    <div className="flex flex-col bg-background">
      {/* Dati strutturati: JewelryStore (solo homepage) + briciole Home */}
      <JsonLd data={jewelryStoreJsonLd} />
      {/* Dati strutturati: ItemList dei prodotti in galleria (QA SEO 04/10/2026 M1) */}
      <JsonLd data={productListJsonLd} />
      {/* QA 10/10 16:36 (miglioria ciclo): rimosso il BreadcrumbList con un
          solo item ("Home" → sé stessa): Google ignora le briciole a item
          singolo e schema.org le sconsiglia sulla homepage. Le briciole
          restano su tutte le sottopagine (2+ item). Zero cambi visivi. */}
      {/* Hero Section */}
      {/* QA 21/10 15:36: hero-dvh (globals.css) invece di h-[80vh]/md:h-screen:
          su iOS Safari la hero segue l'altezza visibile reale (dvh), niente
          fondo tagliato dietro la toolbar; fallback vh per browser vecchi. */}
      <section
        className="relative hero-dvh w-full flex items-center justify-center text-center text-white"
      >
        <Image
          src={heroImage.imageUrl}
          alt={t('hero.alt')}
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          quality={80}
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/50" />
        {/* Vignettatura calda: profondità senza riflessi anomali */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,7,4,0.55)_100%)]" />
        <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
          {/* h1 nascosto visivamente: la hero usa il logo come brand, ma la
              pagina deve avere un h1 descrittivo per SEO e screen reader.
              "Galleria" sotto diventa h2 per mantenere la gerarchia. */}
          <h1 className="sr-only">GDC Jewellery Lab — {t('hero.subtitle')}</h1>
          <div className="relative h-64 w-full max-w-[360px] md:h-80 md:w-[640px] md:max-w-none">
          {/* Niente priority sul logo: fetchPriority="high" resta solo sullo sfondo
              hero (candidato LCP). next/image senza priority mette loading="lazy"
              di default: il logo brand, above the fold, veniva differito.
              QA 10/10 01:36: loading="eager" esplicito — parte subito.
              QA 10/10 09:36 (correzione commento): contrariamente a quanto scritto
              sopra, next/image 14.2.35 EMETTE un <link rel="preload" as="image">
              anche per loading="eager" (verificato sull'HTML compilato: 3 preload
              immagine sulla home — logo header priority, sfondo hero priority,
              logo hero eager — contro 1 solo su about/contact/collections).
              Il preload eager NON ha fetchPriority, quindi non contende la banda
              con lo sfondo (fp=high vince): il comportamento resta quello voluto,
              solo il commento era impreciso. */}
            <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt={t('hero.logoAlt')} fill sizes="(max-width: 768px) 360px, 640px" loading="eager" className="object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]" />
          </div>
          {/* QA 11/10 12:36 (miglioria ciclo): id="hero-subtitle" come target del
              `speakable` (SpeakableSpecification) nel JSON-LD WebSite del
              layout: la tagline visibile dell'hero è il candidato naturale
              per gli assistenti vocali ("che cos'è GDC Jewellery Lab").
              Completamento serie speakable: #gallery e #perche-gdc su home
              (10:36/07:36), #moto e #collezioni su /collections (11:36/09:36),
              #servizi su /services (08:36), #recapiti su /contact (06:36),
              #steps su /orders (05:36), #storia su /about (03:36), FAQPage
              su /custom-jewel (00:36). Zero cambi visivi. */}
          <p id="hero-subtitle" className="max-w-2xl font-headline text-xl md:text-2xl italic text-ivory/90 lux-title">
            {t('hero.subtitle')}
          </p>
          <div className="gold-divider" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="sm" variant="outline" className="bg-transparent border-gold/70 text-gold hover:bg-gold/10 hover:text-gold-light hover:border-gold-light active:bg-gold/20 active:text-gold-light visited:text-gold focus-visible:text-gold-light font-semibold text-sm md:text-base py-3 px-8 md:py-4 md:px-8 rounded-full tracking-[0.18em] uppercase">
              <Link href="/#gallery">{t('hero.galleryButton')}</Link>
            </Button>
            <Button asChild size="sm" className="bg-gold hover:bg-gold-light text-[#171106] visited:text-[#171106] font-semibold text-sm md:text-base py-3 px-8 md:py-4 md:px-8 rounded-full tracking-[0.18em] uppercase shadow-[0_8px_28px_rgba(201,168,106,0.35)]">
              {/* QA 17/10 19:36: visited:text-[#171106] esplicito — la variant default
                  pinna visited:text-primary-foreground, ma il className qui ridefinisce
                  il base a text-[#171106]; twMerge tiene il visited: di pagina. Su :visited
                  il testo resta il marrone scuro del base, nessun cambio colore post-click. */}
              <Link href="/custom-jewel">{t('hero.createButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {/* QA 10/10 15:36 (miglioria ciclo): scroll-mt con calc che include
          env(safe-area-inset-top). Il ciclo 14:36 ha aggiunto pt safe-area
          all'header sticky: su iPhone con notch l'header è alto 80px + inset
          (fino a ~139px) e i 96px fissi di scroll-mt-24 non bastavano più —
          il titolo sezione finiva parzialmente sotto l'header nei salti ad
          ancora (bottone GALLERIA, redirect /gallery). Con viewport-fit=cover
          (14:36) env() è reale su iOS; su desktop/telefoni senza notch
          env() = 0 e resta 96px come prima (05/10). */}
      {/* QA 12/10 18:36 (miglioria ciclo): aria-labelledby sulla sezione
          galleria — e' il target dell'ancora #gallery (bottone GALLERIA in
          hero + redirect /gallery): con i landmark navigabili gli screen
          reader annunciano il nome della sezione al salto. id statico
          (testo i18n), zero cambi visivi. */}
      <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-[calc(6rem+env(safe-area-inset-top))]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('gallery.eyebrow')}</p>
            <h2 id="gallery-title" className="font-headline text-4xl md:text-6xl font-medium text-foreground lux-title">
              {t('gallery.title')}
            </h2>
            <div className="gold-divider" aria-hidden="true" />
            <p className="text-lg text-foreground/75 mt-2 max-w-2xl mx-auto font-light">
              {t('gallery.subtitle')}
            </p>
          </div>

          {/* Griglia masonry: 2 colonne su telefono (anteprime più grandi,
              layout mobile pulito), 3 colonne da sm in su. */}
          <div className="columns-2 sm:columns-3 gap-4 md:gap-8">
            {allProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="break-inside-avoid mb-4 md:mb-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  groupName={product.groupName}
                  onImageClick={() => handleImageClick(product)}
                />
              </motion.div>
            ))}
          </div>

          {/* Collections teaser */}
          <div className="mt-8 md:mt-12">
            <div className="text-center mb-8">
              <p className="eyebrow mb-3">{tCol('teaser.eyebrow')}</p>
              <h2 className="font-headline text-3xl md:text-5xl font-medium text-foreground lux-title">
                {tCol('teaser.title')}
              </h2>
              <div className="gold-divider" aria-hidden="true" />
              <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto font-light">
                {tCol('teaser.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {TEASER_COLLECTIONS.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-gold/20 shadow-[0_10px_36px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-gold/60 hover:shadow-[0_14px_44px_rgba(201,168,106,0.18)]"
                  >
                    <Image
                      src={item.imageUrl}
                      // L'immagine è dentro lo stesso Link del nome visibile
                      // qui sotto: alt vuoto per non farla annunciare due
                      // volte agli screen reader (immagine decorativa).
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      // Teaser in griglia max-w-6xl (1152px): 1 colonna su telefono
                      // (~100vw), 2 colonne da sm, 4 da lg (~270px per card): sizes
                      // calibrato per non scaricare varianti sovradimensionate.
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                      <span className="font-headline text-xl md:text-2xl font-medium text-ivory tracking-wide">
                        {tCol(`${item.key}.name`)}
                      </span>
                      <ArrowRight aria-hidden="true" className="h-5 w-5 text-gold transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/collections">
                  {tCol('teaser.viewAll')}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Trust signals sobri (tutti claim già presenti nel sito) */}
          {/* QA 11/10 07:36 (miglioria ciclo): id="perche-gdc" come target del
              `speakable` (SpeakableSpecification) nel JSON-LD JewelryStore
              della home qui sopra: la sezione "Perché GDC" descrive il
              laboratorio artigianale ed è il candidato naturale per gli
              assistenti vocali — stesso pattern di #recapiti su /contact
              (06:36). 1:1 col contenuto visibile, i18n attiva, zero cambi
              visivi. */}
          {/* QA 21/10 23:36 (miglioria ciclo): scroll-mt con
              env(safe-area-inset-top) — stesso pattern di #gallery (10/10
              15:36): l'id e' target di frammento (speakable JSON-LD, deep link
              da assistenti/crawler): senza scroll-mt il salto ad ancora
              nasconderebbe l'inizio sotto l'header sticky (80px + notch).
              scroll-margin non tocca il layout: zero cambi visivi. */}
          <div id="perche-gdc" className="mt-16 md:mt-24 max-w-5xl mx-auto scroll-mt-[calc(6rem+env(safe-area-inset-top))]">
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">{t('trust.label')}</p>
              <h2 className="font-headline text-3xl md:text-5xl font-medium text-foreground lux-title">
                {t('trust.title')}
              </h2>
              <div className="gold-divider" aria-hidden="true" />
              <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto font-light">
                {t('trust.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Hammer, n: '1' },
                { icon: Gem, n: '2' },
                { icon: PencilRuler, n: '3' },
                { icon: Sparkles, n: '4' },
              ].map(({ icon: Icon, n }, index) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center px-4"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 mb-4">
                    <Icon aria-hidden="true" className="h-6 w-6 text-gold" />
                  </span>
                  <h3 className="font-headline text-lg text-foreground">
                    {t(`trust.${n}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t(`trust.${n}.text`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Su Misura — conversion band */}
          <div className="my-16 md:my-24 px-4 relative z-10">
            <div className="bg-card border border-gold/25 rounded-2xl px-6 py-10 md:py-14 max-w-4xl mx-auto text-center shadow-[0_18px_60px_rgba(0,0,0,0.5)]">
              <Badge variant="secondary" className="mb-5 text-xs px-5 py-1.5 uppercase tracking-[0.22em] border-gold/40 text-gold bg-gold/10">
                {t('customJewel.badge')}
              </Badge>
              <h2 className="font-headline text-3xl md:text-5xl font-medium text-foreground max-w-2xl mx-auto lux-title">
                {t('customJewel.title')}
              </h2>
              <div className="gold-divider" aria-hidden="true" />
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto font-light">
                {t('customJewel.subtitle')}
              </p>
              <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-base font-medium text-foreground/90">
                {['p1', 'p2', 'p3'].map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <Check aria-hidden="true" className="h-5 w-5 text-gold shrink-0" />
                    {t(`customJewel.${k}`)}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-[#171106] visited:text-[#171106] hover:bg-gold-light font-semibold rounded-full px-8 tracking-[0.12em] uppercase text-sm shadow-[0_8px_28px_rgba(201,168,106,0.35)]"
                >
                  {/* QA 17/10 19:36: visited:text-[#171106] come nel bottone hero in alto */}
                  <Link href="/custom-jewel">
                    {t('customJewel.buttonOrder')}
                    <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold rounded-full px-8 border-gold/50 text-gold hover:bg-gold/10 hover:text-gold-light hover:border-gold active:bg-gold/20 active:text-gold-light visited:text-gold focus-visible:text-gold-light tracking-[0.12em] uppercase text-sm">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
                    {t('customJewel.buttonWhatsapp')}
                    {/* QA 20/10 08:36: annuncio nuova scheda (a11y) */}
                    <span className="sr-only">{tCommon('newTab')}</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {currentProduct && lightboxImageIndex !== null && (
        <ImageLightbox
          image={currentProduct}
          index={lightboxImageIndex}
          total={allProducts.length}
          preloadSrcs={preloadSrcs}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
