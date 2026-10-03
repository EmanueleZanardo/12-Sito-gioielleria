'use client';

import Image from 'next/image';
import type { ProductImage } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ZoomIn } from 'lucide-react';

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
      className="relative aspect-[4/5] w-full shadow-lg rounded-xl overflow-hidden group border border-gold/15 hover:border-gold/50 hover:shadow-[0_14px_44px_rgba(201,168,106,0.16)] transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        // La griglia è columns-2 su telefono (<640px, card ~50vw) e columns-3
        // da sm in su (~33vw sotto i 1200px): sizes aggiornato di conseguenza
        // per scaricare immagini della risoluzione giusta.
        sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
        quality={80}
      />
      {/* Anteprima pulita: nessuna scritta sull'immagine (su richiesta Emanuele
          03/10). Nome e descrizione restano in aria-label e nella lightbox.
          Su desktop l'icona lente all'hover segnala che la card si ingrandisce. */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:hidden transition-opacity duration-300">
        <span className="rounded-full bg-black/55 p-3 backdrop-blur-sm">
          <ZoomIn aria-hidden="true" className="h-6 w-6 text-white" />
        </span>
      </div>
    </div>
  );
}
