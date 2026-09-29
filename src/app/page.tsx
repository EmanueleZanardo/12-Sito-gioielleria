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

export default function Home() {
  const { t } = useTranslation('home');
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);

  const allProducts = orderedProducts.map(product => ({
    ...product,
    groupName: t(`collections.${product.groupInfo.id}.name`)
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
          quality={80}
          priority
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
          <div className="relative h-64 w-[360px] md:h-80 md:w-[640px]">
            <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt="GDC Jewellery Lab Logo" fill className="object-contain" />
          </div>
          <p className="max-w-2xl text-base md:text-xl text-stone-200">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white hover:border-white active:bg-white/20 active:text-white visited:text-white focus-visible:text-white font-bold text-sm md:text-lg py-3 px-6 md:py-4 md:px-6 rounded-sm">
              <Link href="/#gallery">{t('hero.galleryButton')}</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm md:text-lg py-3 px-6 md:py-4 md:px-6 rounded-sm">
              <Link href="/custom-jewel">{t('hero.createButton')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="scroll-mt-16">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="font-headline text-3xl md:text-5xl text-foreground drop-shadow-md">
              {t('gallery.title')}
            </h1>
            <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto drop-shadow-sm">
              {t('gallery.subtitle')}
            </p>
          </div>

          <div className="columns-3 gap-4 md:gap-8">
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

          <div className="text-center my-16 md:my-24 px-4 relative z-10">
            <h2 className="font-headline text-2xl md:text-4xl text-foreground">{t('cta.title')}</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/custom-jewel">{t('cta.button')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {currentProduct && (
        <ImageLightbox
          image={currentProduct}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
