'use client';

import Image from 'next/image';
import type { ProductImage } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: ProductImage;
  groupName: string;
  onImageClick: () => void;
}

export function ProductCard({ product, groupName, onImageClick }: ProductCardProps) {
  const isProd007 = product.id === 'prod_007';

  // Accessibilità tastiera: la card è cliccabile (apre la lightbox),
  // quindi deve essere raggiungibile e attivabile anche da tastiera.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${groupName} — ${product.description}`}
      onKeyDown={handleKeyDown}
      className="relative aspect-[4/5] w-full shadow-lg rounded-lg overflow-hidden group border-2 border-white/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      onClick={onImageClick}
    >
      <Image
        src={product.imageUrl}
        alt={product.description}
        fill
        className={cn(
            "object-cover transition-transform duration-300 scale-110 group-hover:scale-125",
            isProd007 ? "object-bottom" : "object-center"
        )}
        // La griglia è columns-3 su tutti i breakpoint: ogni card occupa ~33vw
        // sotto i 1200px. Il vecchio "(max-width: 768px) 50vw" sovrastimava e
        // faceva scaricare immagini più grandi del necessario su mobile.
        sizes="(max-width: 1200px) 33vw, 25vw"
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="font-headline text-lg md:text-xl font-bold">{groupName}</h3>
        <p className="text-sm text-stone-200 mt-1">{product.description}</p>
      </div>
    </div>
  );
}
