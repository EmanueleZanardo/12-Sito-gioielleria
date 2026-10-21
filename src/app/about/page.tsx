'use client';

import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';

export default function AboutPage() {
  const { t, language } = useTranslation('about');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="bg-background">
      {/* Briciole schema.org per SEO (non visibili) */}
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: tCommon('nav.about'), url: `${SITE_URL}/about` },
        ])}
      />
      {/* QA 05/10 02:36 (miglioria ciclo): AboutPage schema.org — descrizione
          1:1 col contenuto visibile (title/subtitle), sameAs col profilo
          Instagram citato nel sito, i18n attiva.
          QA 11/10 03:36 (miglioria ciclo): speakable (SpeakableSpecification)
          sul racconto visibile della pagina (id="storia", paragraph1+2) —
          stesso pattern del FAQPage di custom-jewel (00:36); la sezione
          "chi siamo" è il candidato naturale per gli assistenti vocali.
          1:1 col contenuto visibile, zero cambi visivi. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: t('title'),
          url: `${SITE_URL}/about`,
          // QA 12/10/2026 06:36 (miglioria ciclo): inLanguage DINAMICO —
          // i blocchi home (05:36) e il WebSite del root layout (10/10) lo
          // dichiarano statico 'it' perche' il contenuto e' fisso in italiano;
          // qui il copy e' i18n-driven (t()), quindi la lingua dichiarata deve
          // seguire la lingua attiva (default 'it' nel prerender, la stessa
          // che vedono i crawler). inLanguage e' proprieta' valida di
          // CreativeWork (AboutPage/HowTo/ContactPage/FAQPage/WebPage/
          // ItemList). Solo additivo, zero cambi visivi.
          inLanguage: language,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#storia'],
          },
          mainEntity: {
            '@type': 'Organization',
            name: 'GDC Jewellery Lab',
            url: SITE_URL,
            description: `${t('title')} — ${t('subtitle')}`,
            sameAs: ['https://www.instagram.com/gdc_jewellery_lab'],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+39 345 111 4337',
              email: 'laboratorio.ticino@gmail.com',
              contactType: 'customer service',
            },
          },
        }}
      />
      <div className="mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
             {/* QA 17/10 06:36 (miglioria ciclo): priority sull'immagine
                 artigiano — e' sopra la piega (candidato LCP della pagina);
                 senza priority next/image usava loading="lazy" e ritardava
                 l'LCP. Pattern gia' usato per hero home e logo header. */}
             <Image
                src="https://i.postimg.cc/LXdq3QbJ/su-misura.jpg"
                alt={t('artisanAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
          </div>
          {/* QA 11/10 03:36: id="storia" come target del `speakable`
              (SpeakableSpecification) nel JSON-LD AboutPage qui sopra:
              il racconto del laboratorio è il contenuto vocale naturale
              della pagina. Zero cambi visivi; utile anche come ancora. */}
          {/* QA 21/10 23:36 (miglioria ciclo): scroll-mt con
              env(safe-area-inset-top) — stesso pattern di #gallery (10/10
              15:36): l'id e' target di frammento (speakable JSON-LD, deep link
              da assistenti/crawler): senza scroll-mt il salto ad ancora
              nasconderebbe l'inizio sotto l'header sticky (80px + notch).
              scroll-margin non tocca il layout: zero cambi visivi. */}
          <div id="storia" className="space-y-6 text-lg text-foreground/80 leading-relaxed scroll-mt-[calc(6rem+env(safe-area-inset-top))]">
            <p>{t('paragraph1')}</p>
            <p>{t('paragraph2')}</p>
          </div>
        </div>

        <div className="mt-16 md:mt-24 space-y-12 max-w-4xl mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-3xl text-foreground">{t('section1.title')}</h2>
                <p className="text-lg text-muted-foreground mt-4">
                    {t('section1.text')}
                </p>
            </div>
            <div className="text-center">
                <h2 className="font-headline text-3xl text-foreground">{t('section2.title')}</h2>
                <p className="text-lg text-muted-foreground mt-4">
                    {t('section2.text')}
                </p>
            </div>
             <div className="text-center">
                <h2 className="font-headline text-3xl text-foreground">{t('section3.title')}</h2>
                <p className="text-lg text-muted-foreground mt-4 whitespace-pre-line">
                    {t('section3.text')}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}
