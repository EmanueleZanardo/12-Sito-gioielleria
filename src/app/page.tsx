'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import heroImage from '@/lib/hero-image.json';
import { orderedProducts, type ProductImage } from '@/lib/data';
import { motion } from 'framer-motion';
import { ImageLightbox } from '@/components/image-lightbox';
import { useTranslation } from '@/hooks/use-translation';
import { ProductCard } from '@/components/product-card';
import { ShareDialog } from '@/components/share/share-dialog';
import { Badge } from '@/components/ui/badge';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';

const TEASER_COLLECTIONS = [
  {
    href: '/collections',
    imageUrl: 'https://i.postimg.cc/htZry19G/Gemini-Generated-Image-cwx29lcwx29lcwx2.png',
    key: 'rings' as const,
  },
  {
    href: '/collections',
    imageUrl: 'https://i.postimg.cc/Dww6PMbF/Gemini-Generated-Image-lr2kymlr2kymlr2k.png',
    key: 'necklaces' as const,
  },
  {
    href: '/collections',
    imageUrl: 'https://i.postimg.cc/HkpNxLcF/photo-2026-04-24-07-41-22.jpg',
    key: 'weddingRings' as const,
  },
];

export default function Home() {
  const { t } = useTranslation('home');
  const { t: tCol } = useTranslation('collections');
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
    }
  };

  const handleCloseLightbox = () => {
    setLightboxImageIndex(null);
  };
  
  const handleNext = () => {
    if (lightboxImageIndex !== null) {
      setLightboxImageIndex((prevIndex) => (prevIndex! + 1) % allProducts.length);
    }
  };

  const handlePrevious = () => {
    if (lightboxImageIndex !== null) {
      setLightboxImageIndex((prevIndex) => (prevIndex! - 1 + allProducts.length) % allProducts.length);
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


  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] md:h-screen w-full flex items-center justify-center text-center text-white"
      >
        <Image
          src={heroImage.imageUrl}
          alt={t('hero.alt')}
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          quality={80}
          priority
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
            <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt={t('hero.logoAlt')} fill sizes="(max-width: 768px) 360px, 640px" priority className="object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]" />
          </div>
          <p className="max-w-2xl font-headline text-xl md:text-2xl italic text-ivory/90 lux-title">
            {t('hero.subtitle')}
          </p>
          <div className="gold-divider" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="sm" variant="outline" className="bg-transparent border-gold/70 text-gold hover:bg-gold/10 hover:text-gold-light hover:border-gold-light active:bg-gold/20 active:text-gold-light visited:text-gold focus-visible:text-gold-light font-semibold text-sm md:text-base py-3 px-8 md:py-4 md:px-8 rounded-full tracking-[0.18em] uppercase">
              <Link href="/#gallery">{t('hero.galleryButton')}</Link>
            </Button>
            <Button asChild size="sm" className="bg-gold hover:bg-gold-light text-[#171106] font-semibold text-sm md:text-base py-3 px-8 md:py-4 md:px-8 rounded-full tracking-[0.18em] uppercase shadow-[0_8px_28px_rgba(201,168,106,0.35)]">
              <Link href="/custom-jewel">{t('hero.createButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="scroll-mt-16">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">{t('gallery.eyebrow')}</p>
            <h2 className="font-headline text-4xl md:text-6xl font-medium text-foreground lux-title">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
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
                      alt={tCol(`${item.key}.name`)}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                  className="bg-gold text-[#171106] hover:bg-gold-light font-semibold rounded-full px-8 tracking-[0.12em] uppercase text-sm shadow-[0_8px_28px_rgba(201,168,106,0.35)]"
                >
                  <Link href="/custom-jewel/order-form">
                    {t('customJewel.buttonOrder')}
                    <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold rounded-full px-8 border-gold/50 text-gold hover:bg-gold/10 hover:text-gold-light hover:border-gold tracking-[0.12em] uppercase text-sm">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
                    {t('customJewel.buttonWhatsapp')}
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
