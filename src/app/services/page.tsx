'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';
import { Check, Settings } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const { t } = useTranslation('services');
  const { t: tCommon } = useTranslation('common');

  const serviceList = [
    'customDesign',
    'sizing',
    'vintageRestore',
    'revitalization',
    'watchBattery',
    'watchRestore',
  ];

  return (
    <div className="bg-background">
      {/* Briciole schema.org per SEO (non visibili) */}
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: tCommon('nav.services'), url: `${SITE_URL}/services` },
        ])}
      />
      {/* QA 05/10 03:36 (miglioria ciclo): ItemList di Service JSON-LD sui
          6 servizi visibili della card. La pagina è l'elenco servizi del
          laboratorio: il markup aiuta Google a indicizzarli come offerte.
          1:1 col contenuto visibile (serviceList, i18n attiva). */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: t('title'),
          description: t('subtitle'),
          numberOfItems: serviceList.length,
          itemListElement: serviceList.map((serviceKey, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: t(`serviceList.${serviceKey}`),
              url: `${SITE_URL}/services`,
              provider: {
                '@type': 'JewelryStore',
                name: 'GDC Jewellery Lab',
                url: SITE_URL,
              },
            },
          })),
        }}
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <Settings aria-hidden="true" className="h-6 w-6 text-primary" />
                {t('listTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {serviceList.map((serviceKey) => (
                  <li key={serviceKey} className="flex items-start">
                    <Check aria-hidden="true" className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-foreground/90">{t(`serviceList.${serviceKey}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('cta.text')}
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">{t('cta.button')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
