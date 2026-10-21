import type { Metadata } from 'next';
import NotFoundContent from './not-found-content';

// QA 11/10 20:36 (miglioria ciclo): not-found era 'use client', quindi in SSR
// ereditava il <title> generico del layout (la homepage) — crawler e visitatori
// senza JS vedevano il titolo sbagliato sulla 404. Ora è un server component
// con metadata statico: il template del root layout produce
// "Pagina non trovata | GDC Jewellery Lab" già nell'HTML prerenderizzato.
// robots: NON impostare qui il meta robots esplicito — Next.js inietta già da
// solo <meta name="robots" content="noindex"/> sulle pagine 404 in build.
// QA 12/10 13:36 (fix ciclo): l'esplicito `robots: { index: false, follow: false }`
// produceva un secondo tag "noindex, nofollow" accanto a quello automatico
// (verificato nel build prerenderizzato: due meta robots sulla 404). Rimosso
// per lasciare un solo noindex automatico; lo status 404 resta comunque la
// direttiva principale per Google.
export const metadata: Metadata = {
  title: 'Pagina non trovata',
};

export default function NotFound() {
  return <NotFoundContent />;
}
