'use client';

import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductImage } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

type AugmentedProductImage = ProductImage & { groupName: string };

type ImageLightboxProps = {
  image: AugmentedProductImage;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function ImageLightbox({ image, onClose, onNext, onPrevious }: ImageLightboxProps) {
  const { t } = useTranslation('contact');

  const subjectText = t('prefill.subject', { jewelryName: image.groupName });
  const messageText = t('prefill.message', { jewelryName: image.groupName });
  
  const handlePreviousClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrevious();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <motion.div
            className="w-full h-full max-w-6xl max-h-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Details */}
            <div className="flex flex-col items-start justify-center h-full text-foreground p-4 order-2 md:order-1">
              <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-wider">{image.groupName}</h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{image.description}</p>
              <p className="mt-4 text-sm text-muted-foreground">ref. {image.id}</p>
              <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                 <Link href={`/contact?subject=${encodeURIComponent(subjectText)}&message=${encodeURIComponent(messageText)}`}>
                  {t('infoButton')}
                </Link>
              </Button>
            </div>

            {/* Right Column: Image */}
            <div className="relative w-full h-full min-h-[50vh] order-1 md:order-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={image.id}
                        className="w-full h-full"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 90vw, 45vw"
                        quality={90}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-[101] text-foreground bg-background/50 rounded-full p-2 hover:bg-card transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <button
          onClick={handlePreviousClick}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] text-foreground bg-background/50 rounded-full p-2 hover:bg-card transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNextClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] text-foreground bg-background/50 rounded-full p-2 hover:bg-card transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
