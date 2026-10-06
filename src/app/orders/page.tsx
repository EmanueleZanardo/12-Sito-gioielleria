'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';

const STEP_COUNT = 4;

export default function OrdersPage() {
  const { t } = useTranslation('orders');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="bg-background">
      {/* Briciole schema.org per SEO (non visibili) */}
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: tCommon('nav.orders'), url: `${SITE_URL}/orders` },
        ])}
      />
      {/* QA 05/10 00:36 (miglioria ciclo): HowTo JSON-LD sui 4 passi visibili.
          La pagina "Come ordinare" è procedurale: il markup strutturato
          aiuta Google a capirla. 1:1 col contenuto visibile (i18n attiva). */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: t('title'),
          description: t('subtitle'),
          step: Array.from({ length: STEP_COUNT }, (_, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: t(`steps.${i}.title`),
            text: t(`steps.${i}.text`),
          })),
        }}
      />
      <div className="mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Lista ordinata semantica: i passi sono sequenziali, gli screen reader
            annunciano "elenco di 4 elementi" mantenendo l'ordine dei passi.
            QA 06/10 08:36 (miglioria ciclo): role="list" perché list-none fa
            perdere la semantica di elenco a Safari/VoiceOver. */}
        <ol role="list" className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto list-none p-0">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <li key={i} className="border rounded-lg bg-card p-6">
              <h2 className="font-headline text-xl text-foreground mb-2">
                {t(`steps.${i}.title`)}
              </h2>
              <p className="text-muted-foreground">{t(`steps.${i}.text`)}</p>
            </li>
          ))}
        </ol>

        {/* QA 07/10 00:36 (fix+miglioria ciclo): il passo 2 nomina il "modulo
            d'ordine personalizzato" ma la pagina offriva solo Crea Gioiello e
            Contatti — nessun percorso verso il form. Aggiunto CTA diretto a
            /custom-jewel/order-form (il form esiste da /custom-jewel/order-form
            e rende il percorso d'acquisto completo). */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild size="lg">
            <Link href="/custom-jewel">{t('ctaCustom')}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/custom-jewel/order-form">{t('ctaOrder')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">{t('ctaContact')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
