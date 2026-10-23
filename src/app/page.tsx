import type { Metadata } from 'next';
import HomeClient from './home-client';

// QA 07/10 02:36: canonical self-referencing della homepage da SSR (il
// client component vive in home-client.tsx). Prima il canonical veniva
// iniettato via useEffect/DOM — funzionava solo dopo l'hydration e poteva
// doppiare il tag nella navigazione client-side. L'App Router aggiorna
// <head> da solo a ogni navigazione, quindi un solo canonical per rotta.
export const metadata: Metadata = {
  // QA 08/10 11:36 (miglioria ciclo): robots index/follow qui nella
  // metadata di rotta invece che nel layout radice — il root layout viene
  // ereditato anche dalla 404, dove Next.js inietta automaticamente
  // <meta name="robots" content="noindex"/>: il risultato era una coppia di
  // meta robots conflittuali (noindex + index,follow) sulla pagina 404 live.
  // Con i robots per-rotta, la 404 emette solo noindex. Zero cambi visivi.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    // QA 23/10 13:36: senza trailing slash — Next normalizza il canonical
    // della root togliendo lo slash finale (live: href senza slash), quindi
    // la dichiarazione ora coincide con il tag servito. Zero cambi visivi.
    canonical: 'https://gdc-jewellery-lab.vercel.app',
  },
};

export default function Home() {
  return <HomeClient />;
}
