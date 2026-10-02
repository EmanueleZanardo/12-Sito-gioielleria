import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crea il Tuo Gioiello Personalizzato',
  description:
    "Dai vita alla tua visione: raccontaci la tua idea e realizziamo insieme un gioiello unico fatto a mano in oro 18kt, diamanti e pietre preziose.",
  keywords: [
    'gioielli su misura',
    'anelli fidanzamento oro 18kt',
    'gioielli personalizzati',
    'crea gioiello',
    'gioiello personalizzato',
  ],
  alternates: {
    canonical: 'https://gdc-jewellery-lab.vercel.app/custom-jewel',
  },
  openGraph: {
    title: 'Crea il Tuo Gioiello Personalizzato | GDC Jewellery Lab',
    description:
      'Raccontaci la tua idea: realizziamo insieme un gioiello unico fatto a mano in oro 18kt, diamanti e pietre preziose.',
    url: 'https://gdc-jewellery-lab.vercel.app/custom-jewel',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'GDC Jewellery Lab — Crea il tuo gioiello su misura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crea il Tuo Gioiello Personalizzato | GDC Jewellery Lab',
    images: ['/og-cover.jpg'],
  },
};

export default function CustomJewelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // FAQPage JSON-LD allineato 1:1 alla sezione FAQ visibile nella pagina
  // (accordion v2.faq, 5 domande). Google richiede che il markup FAQPage
  // corrisponda a contenuti visibili nella pagina: per questo vive qui e
  // NON più nel JSON-LD globale di layout.tsx.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quanto tempo serve per realizzare un gioiello su misura?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dipende dalla complessità del progetto: in genere, dal disegno approvato alla consegna passano alcune settimane. Per occasioni speciali (matrimoni, anniversari, nascite) ti consigliamo di contattarci con anticipo, così pianifichiamo insieme le tempistiche senza fretta.',
        },
      },
      {
        '@type': 'Question',
        name: 'Che materiali usate? L’oro è garantito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Lavoriamo principalmente oro 18kt (giallo, bianco e rosa), argento 925 e platino, con pietre naturali selezionate. Il titolo dell’oro è garantito e punzonato secondo le normative vigenti.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso modificare il disegno prima della realizzazione?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, assolutamente. Il progetto viene definito insieme a te e nulla viene realizzato senza la tua approvazione del disegno e del preventivo. Anche durante la lavorazione, quando possibile, accogliamo le modifiche che ci chiedi.',
        },
      },
      {
        '@type': 'Question',
        name: 'La consulenza e il preventivo sono gratuiti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì: la consulenza iniziale e il preventivo sono sempre gratuiti e senza impegno.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso far trasformare un gioiello che ho già?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì: restauriamo e trasformiamo gioielli esistenti o di famiglia, dando nuova vita a pezzi a cui tieni. Raccontaci cosa hai in mente e valuteremo insieme la soluzione migliore.',
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
