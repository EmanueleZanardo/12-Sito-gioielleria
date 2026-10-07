import type { Metadata } from 'next';
import HomeClient from './home-client';

// QA 07/10 02:36: canonical self-referencing della homepage da SSR (il
// client component vive in home-client.tsx). Prima il canonical veniva
// iniettato via useEffect/DOM — funzionava solo dopo l'hydration e poteva
// doppiare il tag nella navigazione client-side. L'App Router aggiorna
// <head> da solo a ogni navigazione, quindi un solo canonical per rotta.
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/',
  },
};

export default function Home() {
  return <HomeClient />;
}
