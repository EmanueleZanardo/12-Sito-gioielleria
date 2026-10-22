"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * QA 22/10 10:36 (miglioria ciclo, a11y WCAG 2.4.3 / 4.1.3): annunciatore di
 * cambio pagina per screen reader.
 *
 * La navigazione client-side di Next.js (<Link>) non sposta il focus e non
 * notifica il cambio pagina: l'utente con screen reader restava sulla pagina
 * "vecchia" senza accorgersi del contenuto nuovo. Questo componente osserva
 * usePathname() e, a ogni cambio rotta, scrive il nuovo document.title in una
 * regione role="status" (aria-live polite implicito): lo screen reader annuncia
 * il titolo della pagina appena caricata (ogni sezione ha il suo title nei
 * metadata del layout — verificato: 8 titoli distinti).
 *
 * - Primo mount saltato: al caricamento iniziale non c'è nessun cambio da
 *   annunciare (il titolo è già letto dal browser).
 * - setTimeout 150ms: Next aggiorna document.title dai metadata della nuova
 *   rotta in modo asincrono; senza attesa si annuncerebbe il titolo vecchio.
 * - Solo pathname: i cambi di solo hash (#gallery) non generano annunci
 *   ridondanti (lo scroll resta gestito dallo scroll-mt dei target).
 * - La regione esiste nel DOM dal primo render: textContent impostato via
 *   ref/DOM diretto, mai smontata — le live region create al volo non sono
 *   annunciate in modo affidabile.
 * Zero cambi visivi (sr-only), nessun testo tradotto necessario: annuncia il
 * title reale del documento, identico in tutte le lingue come l'HTML emesso.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const regionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = document.title;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <div ref={regionRef} role="status" className="sr-only" />;
}
