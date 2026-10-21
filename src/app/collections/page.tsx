'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { orderedProducts, collectionOnlyProducts } from '@/lib/data';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';
import { ImageLightbox } from '@/components/image-lightbox';

type CollectionDef = {
  id: 'rings' | 'necklaces' | 'weddingRings' | 'moto' | 'earrings' | 'bracelets';
  /** id dei gruppi di data.ts che compongono la collezione (vuoto = solo su misura) */
  groupIds: string[];
  /** immagine rappresentativa della collezione (vuota = card su misura senza foto) */
  imageUrl?: string;
  /** mostra la striscia con gli altri pezzi della collezione sotto l'immagine */
  showStrip?: boolean;
};

const COLLECTIONS: CollectionDef[] = [
  {
    id: 'rings',
    groupIds: ['group_003', 'group_006', 'group_005'],
    imageUrl: 'https://i.postimg.cc/htZry19G/Gemini-Generated-Image-cwx29lcwx29lcwx2.png',
  },
  {
    id: 'necklaces',
    groupIds: ['group_001', 'group_002', 'group_004'],
    imageUrl: 'https://i.postimg.cc/Dww6PMbF/Gemini-Generated-Image-lr2kymlr2kymlr2k.png',
  },
  {
    id: 'weddingRings',
    groupIds: ['group_007'],
    imageUrl: 'https://i.postimg.cc/HkpNxLcF/photo-2026-04-24-07-41-22.jpg',
  },
  {
    id: 'moto',
    groupIds: ['group_008'],
    imageUrl: '/collections/moto/moto-01.jpg',
    showStrip: true,
  },
  {
    id: 'earrings',
    groupIds: [],
  },
  {
    id: 'bracelets',
    groupIds: [],
  },
];

/** id ancora di categoria per il deep-link (QA 03/10: card homepage
 *  e redirect /collections/<slug> puntano qui) */
const COLLECTION_ANCHORS: Record<CollectionDef['id'], string> = {
  rings: 'anelli',
  necklaces: 'collane-e-pendenti',
  weddingRings: 'fedi',
  moto: 'moto',
  earrings: 'orecchini',
  bracelets: 'bracciali',
};

export default function CollectionsPage() {
  const { t, language } = useTranslation('collections');
  const { t: tCommon } = useTranslation('common');

  // I pezzi delle collezioni includono anche quelli visibili solo nella loro
  // collezione (collectionOnlyProducts), mai nella galleria generica.
  const allCollectionPieces = [...orderedProducts, ...collectionOnlyProducts];
  const collections = COLLECTIONS.map((def) => {
    const pieces = allCollectionPieces.filter((p) => def.groupIds.includes(p.groupInfo.id));
    return { ...def, pieces };
  });

  // Lightbox per la collezione Rombo d'Argento: click su immagine principale o
  // miniature → fullscreen stile galleria, navigabile tra i 5 pezzi.
  const [motoLightboxIndex, setMotoLightboxIndex] = useState<number | null>(null);
  const motoImages = (collections.find((c) => c.id === 'moto')?.pieces ?? []).map((p) => ({
    ...p,
    groupName: t('moto.name'),
  }));
  const closeMotoLightbox = () => setMotoLightboxIndex(null);
  const nextMotoImage = () =>
    setMotoLightboxIndex((i) => (i === null ? null : (i + 1) % motoImages.length));
  const prevMotoImage = () =>
    setMotoLightboxIndex((i) =>
      i === null ? null : (i - 1 + motoImages.length) % motoImages.length
    );

  // QA 12/10/2026 12:36 (miglioria ciclo): dimensioni reali delle immagini di
  // copertina delle 4 collezioni con imageUrl — servono per l'ImageObject
  // nell'ItemList qui sotto. moto-01.jpg misurata dai file in
  // public/collections/moto (stessi dati di MOTO_IMAGE_DIMS), le 3 postimg
  // scaricate e misurate il 12/10/2026 (768x800, 555x800, 588x800).
  const COLLECTION_IMAGE_DIMS: Record<string, { width: number; height: number }> = {
    'Gemini-Generated-Image-cwx29lcwx29lcwx2.png': { width: 768, height: 800 },
    'Gemini-Generated-Image-lr2kymlr2kymlr2k.png': { width: 555, height: 800 },
    'photo-2026-04-24-07-41-22.jpg': { width: 588, height: 800 },
    'moto-01.jpg': { width: 1194, height: 880 },
  };

  // ItemList delle 5 collezioni (nome localizzato + deep-link all'ancora di
  // categoria) + briciole Home > Collezioni.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tCommon('nav.collections'),
          // QA 12/10/2026 06:36 (miglioria ciclo): inLanguage DINAMICO —
    // i blocchi home (05:36) e il WebSite del root layout (10/10) lo
    // dichiarano statico 'it' perche' il contenuto e' fisso in italiano;
    // qui il copy e' i18n-driven (t()), quindi la lingua dichiarata deve
    // seguire la lingua attiva (default 'it' nel prerender, la stessa
    // che vedono i crawler). inLanguage e' proprieta' valida di
    // CreativeWork (AboutPage/HowTo/ContactPage/FAQPage/WebPage/
    // ItemList). Solo additivo, zero cambi visivi.
    inLanguage: language,
    // QA 10/10 23:36 (miglioria ciclo): numberOfItems dinamico da
    // COLLECTIONS.length — schema.org lo raccomanda sull'ItemList; stesso
    // pattern già applicato su home (gallery, 18:36) e services (serviceList).
    // Zero cambi visivi.
    numberOfItems: COLLECTIONS.length,
    // QA 11/10 09:36 (miglioria ciclo): speakable — schema.org lo
    // raccomanda sui contenuti da elenco per indicare ai motori/assistenti
    // vocali la sezione adatta alla lettura ad alta voce. cssSelector punta
    // alla griglia visibile delle collezioni (id="collezioni", 1:1 col
    // contenuto, i18n attiva). Zero cambi visivi; stesso pattern dei cicli
    // 08:36 (#servizi /services), 07:36 (#perche-gdc home), 06:36
    // (#recapiti /contact), 05:36 (#steps /orders), 03:36 (#storia /about).
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#collezioni'],
    },
    itemListElement: COLLECTIONS.map((def, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t(`${def.id}.name`),
      url: `${SITE_URL}/collections#${COLLECTION_ANCHORS[def.id]}`,
      // QA 10/10 12:36 (miglioria ciclo): image assoluta dove la collezione
      // ha una imageUrl (4/6: earrings/bracelets non ne hanno) — stesso
      // pattern del blocco Rombo d'Argento sotto (Google richiede URL
      // assoluti nei dati strutturati). Zero cambi visivi.
      // QA 12/10/2026 12:36 (miglioria ciclo): image come ImageObject con
      // width/height misurate invece di stringa semplice — moto-01.jpg dai
      // file in public/collections/moto, le 3 postimg scaricate e misurate
      // (dati onesti, verificati: 768x800 / 555x800 / 588x800). Stesso
      // pattern dei Product Rombo d'Argento (10:36), del logo publisher
      // (09:36) e della cover JewelryStore (00:36). Zero cambi visivi.
      ...(def.imageUrl
        ? {
            image: {
              '@type': 'ImageObject',
              url: def.imageUrl.startsWith('http') ? def.imageUrl : `${SITE_URL}${def.imageUrl}`,
              ...(COLLECTION_IMAGE_DIMS[def.imageUrl.split('/').pop() ?? ''] ?? {}),
            },
          }
        : {}),
    })),
  };

  // QA 12/10/2026 10:36 (miglioria ciclo): dimensioni reali delle foto moto
  // (lette dai file in public/collections/moto) — servono per l'ImageObject
  // qui sotto. Stesso pattern del logo publisher nel blocco WebSite del
  // root layout (09:36): Google usa width/height per il rendering nei rich
  // result. Solo additivo, zero cambi visivi.
  const MOTO_IMAGE_DIMS: Record<string, { width: number; height: number }> = {
    'moto-01.jpg': { width: 1194, height: 880 },
    'moto-02.jpg': { width: 1280, height: 1920 },
    'moto-03.jpg': { width: 1920, height: 1280 },
    'moto-04.jpg': { width: 1280, height: 1920 },
    'moto-05.jpg': { width: 1920, height: 1280 },
  };

  // ItemList dei 5 pezzi della collezione Rombo d'Argento (blitz SEO 07/10/2026,
  // worker B): Product con image assoluta (le foto moto sono locali in /public,
  // Google richiede URL assoluti) e deep-link all'ancora #moto.
  const romboProductsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Collezione ${t('moto.name')} — GDC Jewellery Lab`,
          // QA 12/10/2026 06:36 (miglioria ciclo): inLanguage DINAMICO —
    // i blocchi home (05:36) e il WebSite del root layout (10/10) lo
    // dichiarano statico 'it' perche' il contenuto e' fisso in italiano;
    // qui il copy e' i18n-driven (t()), quindi la lingua dichiarata deve
    // seguire la lingua attiva (default 'it' nel prerender, la stessa
    // che vedono i crawler). inLanguage e' proprieta' valida di
    // CreativeWork (AboutPage/HowTo/ContactPage/FAQPage/WebPage/
    // ItemList). Solo additivo, zero cambi visivi.
    inLanguage: language,
    // QA 11/10 02:36 (miglioria ciclo): numberOfItems dinamico da
    // motoImages.length — schema.org lo raccomanda sull'ItemList; stesso
    // pattern già applicato sull'ItemList collezioni (10/10 23:36) e sulla
    // gallery home. Zero cambi visivi.
    numberOfItems: motoImages.length,
    // QA 11/10 11:36 (miglioria ciclo): speakable (SpeakableSpecification,
    // cssSelector #moto) — candidato naturale per gli assistenti vocali: la
    // card visibile id="moto" è 1:1 col contenuto di questo ItemList (i 5
    // pezzi Rombo d'Argento, deep-link #moto); stesso pattern della serie
    // speakable (#collezioni /collections 09:36, #gallery home 10:36).
    // Zero cambi visivi.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#moto'],
    },
    itemListElement: motoImages.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.description,
        description: p.description,
        // QA 12/10/2026 10:36 (miglioria ciclo): image come ImageObject con
        // width/height misurate (MOTO_IMAGE_DIMS qui sopra) invece che
        // stringa semplice — Google la usa nei rich result dei Product.
        // Zero cambi visivi.
        image: {
          '@type': 'ImageObject',
          url: p.imageUrl.startsWith('http') ? p.imageUrl : `${SITE_URL}${p.imageUrl}`,
          ...(MOTO_IMAGE_DIMS[p.imageUrl.split('/').pop() ?? ''] ?? {}),
        },
        url: `${SITE_URL}/collections#${COLLECTION_ANCHORS.moto}`,
        brand: { '@type': 'Brand', name: 'GDC Jewellery Lab' },
      },
    })),
  };

  return (
    <div className="flex flex-col bg-background">
      <JsonLd data={itemListJsonLd} />
      {/* Dati strutturati: i 5 pezzi Rombo d'Argento (blitz SEO 07/10/2026) */}
      <JsonLd data={romboProductsJsonLd} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: tCommon('nav.collections'), url: `${SITE_URL}/collections` },
        ])}
      />
      {/* Hero */}
      <section className="container mx-auto px-4 pt-16 md:pt-24 pb-8 text-center">
        <p className="text-xs font-nav uppercase tracking-[0.3em] text-primary">
          GDC Jewellery Lab
        </p>
        <h1 className="font-headline text-4xl md:text-6xl text-foreground mt-3">
          {t('hero.title')}
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
      </section>

      {/* Griglia collezioni */}
      {/* QA 11/10 09:36 (miglioria ciclo): id="collezioni" come target del
          `speakable` (SpeakableSpecification) nel JSON-LD ItemList qui sopra:
          identifica la griglia visibile delle collezioni per gli assistenti
          vocali. Zero cambi visivi; utile anche come ancora #collezioni. */}
      {/* QA 21/10 23:36 (miglioria ciclo): scroll-mt con
          env(safe-area-inset-top) — stesso pattern delle card collezione
          (10/10 15:36, gia' coperto): la sezione e' target di frammento
          (speakable JSON-LD ItemList, "utile anche come ancora #collezioni"):
          senza scroll-mt il salto ad ancora nasconderebbe il titolo sotto
          l'header sticky (80px + notch). Zero cambi visivi. */}
      <section id="collezioni" className="container mx-auto px-4 py-12 md:py-16 scroll-mt-[calc(6rem+env(safe-area-inset-top))]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => {
            const name = t(`${collection.id}.name`);
            const orderHref = collection.imageUrl
              ? `/custom-jewel/order-form?imageUrl=${encodeURIComponent(collection.imageUrl)}&prompt=${encodeURIComponent(
                  t('prefillPrompt', { name })
                )}`
              : '/custom-jewel/order-form';
            return (
              <motion.article
                key={collection.id}
                id={COLLECTION_ANCHORS[collection.id]}
                // QA 10/10 15:36: scroll-mt con env(safe-area-inset-top) — come
                // #gallery in home: con il pt safe-area dell'header sticky
                // (ciclo 14:36) i 96px fissi non bastano su iPhone con notch.
                className="group relative flex flex-col overflow-hidden rounded-xl border border-gold/15 bg-card shadow-lg transition-all duration-500 hover:border-gold/50 hover:shadow-[0_14px_44px_rgba(201,168,106,0.14)] scroll-mt-[calc(6rem+env(safe-area-inset-top))]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {collection.imageUrl ? (
                    collection.id === 'moto' ? (
                      <button
                        type="button"
                        onClick={() => setMotoLightboxIndex(0)}
                        className="absolute inset-0 h-full w-full cursor-zoom-in"
                        aria-label={t(`${collection.id}.name`)}
                      >
                        <Image
                          src={collection.imageUrl}
                          // alt vuoto: il bottone ha già aria-label con lo stesso
                          // nome — con alt pieno gli screen reader annuncerebbero
                          // due volte (stesso pattern di product-card.tsx,
                          // QA 10/10 02:36). QA 10/10 11:36 (bug fix ciclo).
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={80}
                        />
                      </button>
                    ) : (
                      <Image
                        src={collection.imageUrl}
                        alt={t(`${collection.id}.name`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-card to-card p-8 text-center">
                      <Sparkles aria-hidden="true" className="h-12 w-12 text-primary mb-4" />
                      <p className="font-headline text-lg text-foreground/80">
                        {t(`${collection.id}.tagline`)}
                      </p>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/70 backdrop-blur text-foreground">
                      {collection.pieces.length > 0 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Images aria-hidden="true" className="h-3.5 w-3.5" />
                          {t('piecesInGallery', { count: collection.pieces.length })}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5">
                          <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                          {t('madeToOrder')}
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>

                {collection.showStrip && collection.pieces.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 px-6 pt-4">
                    {collection.pieces.slice(1).map((piece, idx) => (
                      <button
                        type="button"
                        key={piece.id}
                        onClick={() => setMotoLightboxIndex(idx + 1)}
                        className="relative aspect-square overflow-hidden rounded-md border border-gold/15 transition-colors hover:border-gold/60 cursor-zoom-in"
                        // QA 07/10 11:36: nome accessibile = descrizione italiana del pezzo
                        // (coerente con alt={product.description} in product-card e con
                        // la lightbox che mostra image.description). Prima si usava
                        // piece.imageHint, l'hint inglese dello scaffold AI originale.
                        aria-label={piece.description}
                      >
                        <Image
                          src={piece.imageUrl}
                          // alt vuoto: il bottone ha già aria-label con la stessa
                          // descrizione — con alt pieno gli screen reader
                          // annuncerebbero due volte (stesso pattern di
                          // product-card.tsx, QA 10/10 02:36). QA 10/10 11:36
                          // (bug fix ciclo).
                          alt=""
                          fill
                          className="object-cover"
                          // QA 10/10 11:36 (miglioria ciclo): sizes calibrato sulla
                          // griglia reale invece di 20vw generico. Striscia
                          // grid-cols-4 dentro la card collezione (px-6): il
                          // pollice è ~18-20vw su telefono (1 colonna) ma solo
                          // ~6-8vw da md in su (2/3 colonne). 8vw fa scegliere a
                          // next/image varianti ~96-128w invece di 256w:
                          // meno byte scaricati, zero cambi visivi.
                          sizes="(max-width: 768px) 20vw, 8vw"
                          quality={70}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-headline text-2xl text-foreground">
                    {name}
                  </h2>
                  <p className="text-sm font-nav uppercase tracking-widest text-primary mt-1">
                    {t(`${collection.id}.tagline`)}
                  </p>
                  <p className="text-muted-foreground mt-3 flex-1 leading-relaxed">
                    {t(`${collection.id}.description`)}
                  </p>

                  <div className="mt-6">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                      <Link
                        href={orderHref}
                        // QA 20/10 03:36 (bug fix ciclo, sezione 103 DUPLICATE-LINK-DEST):
                        // le card collezione mostravano tutte lo stesso CTA
                        // ("Richiedi un pezzo simile") con href diversi (prefill
                        // per collezione): uno screen reader sentiva N link
                        // identici indistinguibili. Il nome accessibile ora
                        // include il nome della collezione; contiene il testo
                        // visibile -> OK anche per WCAG 2.5.3 (sez. 101).
                        aria-label={`${collection.imageUrl ? t('requestSimilar') : t('designTogether')}: ${name}`}
                      >
                        {collection.imageUrl ? t('requestSimilar') : t('designTogether')}
                        <ArrowRight aria-hidden="true" className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Banner finale su misura */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-lg bg-primary/10 border border-primary/20 px-6 py-12 md:py-16 text-center">
          <Sparkles aria-hidden="true" className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-2xl md:text-4xl text-foreground">
            {t('banner.title')}
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t('banner.subtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/custom-jewel">
              {t('banner.cta')}
              <ArrowRight aria-hidden="true" className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {motoLightboxIndex !== null && motoImages[motoLightboxIndex] && (
        <ImageLightbox
          image={motoImages[motoLightboxIndex]}
          index={motoLightboxIndex}
          total={motoImages.length}
          preloadSrcs={[
            motoImages[(motoLightboxIndex + 1) % motoImages.length].imageUrl,
            motoImages[(motoLightboxIndex - 1 + motoImages.length) % motoImages.length]
              .imageUrl,
          ]}
          onClose={closeMotoLightbox}
          onNext={nextMotoImage}
          onPrevious={prevMotoImage}
        />
      )}
    </div>
  );
}
