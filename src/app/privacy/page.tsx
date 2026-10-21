'use client';

import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';

// QA 22/10 01:36 (miglioria ciclo): pagina /privacy — il sito raccoglie dati
// personali tramite i moduli Contatti e Gioiello su misura (nome, email,
// messaggio, foto facoltativa inviati via email al laboratorio) ma non aveva
// alcuna informativa. Testo in italiano (lingua del laboratorio e default del
// sito), solo fatti verificabili dal codice: niente analytics/tracking,
// solo localStorage per la preferenza di lingua. Da far revisionare a
// Emanuele: è una bozza informativa, non una consulenza legale.
const SECTIONS: { h2: string; body: string[] }[] = [
  {
    h2: 'Chi tratta i tuoi dati',
    body: [
      'GDC Jewellery Lab, laboratorio orafo in Ticino. Per qualsiasi domanda sui tuoi dati personali puoi scriverci dalla pagina Contatti (telefono e WhatsApp +39 345 111 4337).',
    ],
  },
  {
    h2: 'Quali dati raccogliamo',
    body: [
      'Solo i dati che ci invii volontariamente tramite i moduli del sito (Contatti e Gioiello su misura): nome, indirizzo email, oggetto, messaggio e — se scegli di allegarla — una foto del gioiello.',
    ],
  },
  {
    h2: 'Perché li usiamo',
    body: [
      'Per rispondere alla tua richiesta e preparare il preventivo. La base del trattamento è il tuo consenso, espresso con l\u2019invio del modulo.',
    ],
  },
  {
    h2: 'Dove vanno i dati',
    body: [
      'I dati del modulo vengono inviati via email al laboratorio. Non vengono ceduti né venduti a terzi.',
    ],
  },
  {
    h2: 'Per quanto li conserviamo',
    body: [
      'Solo per il tempo necessario a gestire la tua richiesta e le comunicazioni che ne seguono.',
    ],
  },
  {
    h2: 'Cookie e tracciamento',
    body: [
      'Questo sito non usa cookie di profilazione né strumenti di analytics. Il browser ricorda solo la tua preferenza di lingua, salvata nella memoria locale del tuo dispositivo.',
    ],
  },
  {
    h2: 'I tuoi diritti',
    body: [
      'Puoi chiedere in qualsiasi momento l\u2019accesso, la rettifica o la cancellazione dei tuoi dati, scrivendoci ai recapiti della pagina Contatti.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Privacy Policy', url: `${SITE_URL}/privacy` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy | GDC Jewellery Lab',
          url: `${SITE_URL}/privacy`,
          inLanguage: 'it',
          description:
            'Informativa sul trattamento dei dati personali di GDC Jewellery Lab.',
        }}
      />
      <div className="mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Informativa sul trattamento dei dati personali — ultimo aggiornamento:
            ottobre 2026.
          </p>
        </div>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.h2}>
              <h2 className="font-headline text-2xl text-foreground mb-3">
                {s.h2}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
