'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductImage } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

type AugmentedProductImage = ProductImage & { groupName: string };

type ImageLightboxProps = {
  image: AugmentedProductImage;
  /** Posizione corrente (0-based) nella sequenza di immagini */
  index: number;
  /** Numero totale di immagini nella sequenza */
  total: number;
  /** URL delle immagini adiacenti da precaricare */
  preloadSrcs?: string[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function ImageLightbox({
  image,
  index,
  total,
  preloadSrcs = [],
  onClose,
  onNext,
  onPrevious,
}: ImageLightboxProps) {
  const { t } = useTranslation('contact');
  const { t: tLb } = useTranslation('lightbox');
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

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

  // Navigazione da tastiera: Esc chiude, frecce scorrono le immagini.
  // Invariata rispetto al ciclo precedente + focus trap base sul Tab.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        onNext();
        return;
      }
      if (e.key === 'ArrowLeft') {
        onPrevious();
        return;
      }
      // Focus trap base: il Tab resta dentro la lightbox
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Blocco scroll del body + gestione focus (apertura/chiusura)
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      try {
        previouslyFocusedRef.current?.focus();
      } catch {
        // l'elemento precedente potrebbe non esistere più: nessun problema
      }
    };
  }, []);

  // Preload delle immagini adiacenti per una navigazione istantanea
  useEffect(() => {
    preloadSrcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [preloadSrcs]);

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={image.groupName}
        tabIndex={-1}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm outline-none"
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
              <p className="text-xs font-nav uppercase tracking-[0.3em] text-primary">
                GDC Jewellery Lab
              </p>
              <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-wider mt-2">
                {image.groupName}
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {image.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">ref. {image.id}</p>
              <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link
                  href={`/contact?subject=${encodeURIComponent(subjectText)}&message=${encodeURIComponent(messageText)}`}
                >
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
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {/* Contatore posizione */}
              <div
                className="absolute top-2 left-2 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-nav tracking-widest text-foreground tabular-nums"
                aria-live="polite"
              >
                {index + 1} / {total}
              </div>
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
          aria-label={tLb('close')}
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
        {total > 1 && (
          <button
            onClick={handlePreviousClick}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] text-foreground bg-background/50 rounded-full p-2 hover:bg-card transition-colors"
            aria-label={tLb('previous')}
          >
            <ChevronLeft aria-hidden="true" className="h-6 w-6" />
          </button>
        )}
        {total > 1 && (
          <button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] text-foreground bg-background/50 rounded-full p-2 hover:bg-card transition-colors"
            aria-label={tLb('next')}
          >
            <ChevronRight aria-hidden="true" className="h-6 w-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
