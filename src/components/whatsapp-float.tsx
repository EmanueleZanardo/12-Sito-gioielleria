'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

// Recapito già presente nel sito (pagina contatti / metadata layout)
const WHATSAPP_URL_BASE = 'https://wa.me/393451114337';

// Bottone WhatsApp sempre visibile (bottom-left: il bottom-right è già
// occupato dal pulsante di condivisione). Discreto: pill oro compatta con
// etichetta solo da sm in su; su mobile resta un'icona rotonda che non
// copre i contenuti. Si apre in nuova scheda con messaggio precompilato
// nella lingua attiva.
export function WhatsAppFloat() {
  const { t } = useTranslation('common');

  const url = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(
    t('whatsapp.prefill')
  )}`;

  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-5 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp.ariaLabel')}
        className="group flex items-center gap-2.5 rounded-full border border-gold/40 bg-[#171106]/95 py-2.5 pl-2.5 pr-2.5 text-sm font-semibold text-gold visited:text-gold shadow-[0_8px_28px_rgba(0,0,0,0.55)] backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold-light hover:shadow-[0_8px_32px_rgba(201,168,106,0.25)] sm:pr-5"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[#171106] transition-transform duration-300 group-hover:scale-105">
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">{t('whatsapp.label')}</span>
      </a>
    </div>
  );
}
