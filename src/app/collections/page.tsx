'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { orderedProducts } from '@/lib/data';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';

type CollectionDef = {
  id: 'rings' | 'necklaces' | 'weddingRings' | 'earrings' | 'bracelets';
  /** id dei gruppi di data.ts che compongono la collezione (vuoto = solo su misura) */
  groupIds: string[];
  /** immagine rappresentativa della collezione (vuota = card su misura senza foto) */
  imageUrl?: string;
  imageHint: string;
};

const COLLECTIONS: CollectionDef[] = [
  {
    id: 'rings',
    groupIds: ['group_003', 'group_006', 'group_005'],
    imageUrl: 'https://i.postimg.cc/htZry19G/Gemini-Generated-Image-cwx29lcwx29lcwx2.png',
    imageHint: 'gold ring with sapphire',
  },
  {
    id: 'necklaces',
    groupIds: ['group_001', 'group_002', 'group_004'],
    imageUrl: 'https://i.postimg.cc/Dww6PMbF/Gemini-Generated-Image-lr2kymlr2kymlr2k.png',
    imageHint: 'gold necklace with ruby',
  },
  {
    id: 'weddingRings',
    groupIds: ['group_007'],
    imageUrl: 'https://i.postimg.cc/HkpNxLcF/photo-2026-04-24-07-41-22.jpg',
    imageHint: 'hammered gold wedding rings',
  },
  {
    id: 'earrings',
    groupIds: [],
    imageHint: 'custom earrings',
  },
  {
    id: 'bracelets',
    groupIds: [],
    imageHint: 'custom bracelet',
  },
];

/** id ancora di categoria per il deep-link (QA 03/10: card homepage
 *  e redirect /collections/<slug> puntano qui) */
const COLLECTION_ANCHORS: Record<CollectionDef['id'], string> = {
  rings: 'anelli',
  necklaces: 'collane-e-pendenti',
  weddingRings: 'fedi',
  earrings: 'orecchini',
  bracelets: 'bracciali',
};

export default function CollectionsPage() {
  const { t } = useTranslation('collections');
  const { t: tCommon } = useTranslation('common');

  const collections = COLLECTIONS.map((def) => {
    const pieces = orderedProducts.filter((p) => def.groupIds.includes(p.groupInfo.id));
    return { ...def, pieces };
  });

  // ItemList delle 5 collezioni (nome localizzato + deep-link all'ancora di
  // categoria) + briciole Home > Collezioni.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tCommon('nav.collections'),
    itemListElement: COLLECTIONS.map((def, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t(`${def.id}.name`),
      url: `${SITE_URL}/collections#${COLLECTION_ANCHORS[def.id]}`,
    })),
  };

  return (
    <div className="flex flex-col bg-background">
      <JsonLd data={itemListJsonLd} />
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
      <section className="container mx-auto px-4 py-12 md:py-16">
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
                className="group relative flex flex-col overflow-hidden rounded-xl border border-gold/15 bg-card shadow-lg transition-all duration-500 hover:border-gold/50 hover:shadow-[0_14px_44px_rgba(201,168,106,0.14)] scroll-mt-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {collection.imageUrl ? (
                    <Image
                      src={collection.imageUrl}
                      alt={t(`${collection.id}.name`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                    />
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
                      <Link href={orderHref}>
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
    </div>
  );
}
