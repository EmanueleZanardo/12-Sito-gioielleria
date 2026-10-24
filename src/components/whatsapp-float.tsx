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
    // QA 24/10 14:36 (LANDMARK-CONTENT, WCAG 1.3.1/2.4.1): <aside> invece
    // di <div> — il bottone WhatsApp era fuori da ogni landmark (regola
    // axe-core "region"); aside = landmark complementary, zero cambi
    // visivi (block come div, stesse classi). Gemello in layout.tsx
    // (wrapper ShareDialog).
    // QA 24/10 23:36 (LANDMARK-UNIQUE, axe-core, WCAG 1.3.1/2.4.1):
    // aria-label localizzata (stessa chiave del testo del bottone):
    // senza etichetta questo complementary duplicava quello di
    // ShareDialog in layout.tsx — ora i due landmark sono distinguibili
    // ("Scrivici su WhatsApp" vs "Condividi"), zero cambi visivi.
    <aside aria-label={t('whatsapp.label')} className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-5 z-50">
      {/* QA 21/10 02:36 (miglioria ciclo): anello di focus visibile da tastiera —
          prima l'<a> del bottone WhatsApp non aveva stili focus-visible: la
          navigazione da tastiera mostrava solo l'outline di default del
          browser, incoerente col design system del sito (bottone GALLERIA e
          shadcn Button usano focus-visible:ring-2). Pattern identico al
          GALLERIA (ring-gold sul fondo scuro #171106). Zero cambi visivi a
          riposo/hover; solo feedback di focus da tastiera. */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('whatsapp.label')} ${t('newTab')}`}
        className="group flex items-center gap-2.5 rounded-full border border-gold/40 bg-[#171106]/95 py-2.5 pl-2.5 pr-2.5 text-sm font-semibold text-gold visited:text-gold shadow-[0_8px_28px_rgba(0,0,0,0.55)] backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold-light hover:shadow-[0_8px_32px_rgba(201,168,106,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#171106] sm:pr-5"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[#171106] transition-transform duration-300 group-hover:scale-105">
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">{t('whatsapp.label')}</span>
      </a>
    </aside>
  );
}
