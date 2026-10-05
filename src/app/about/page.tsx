'use client';

import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';

export default function AboutPage() {
  const { t } = useTranslation('about');
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
          Instagram citato nel sito, i18n attiva. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: t('title'),
          url: `${SITE_URL}/about`,
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
             <Image
                src="https://i.postimg.cc/LXdq3QbJ/su-misura.jpg"
                alt={t('artisanAlt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
          </div>
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
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
