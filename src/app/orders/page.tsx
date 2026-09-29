'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

const STEP_COUNT = 4;

export default function OrdersPage() {
  const { t } = useTranslation('orders');

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <div key={i} className="border rounded-lg bg-card p-6">
              <h2 className="font-headline text-xl text-foreground mb-2">
                {t(`steps.${i}.title`)}
              </h2>
              <p className="text-muted-foreground">{t(`steps.${i}.text`)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild size="lg">
            <Link href="/custom-jewel">{t('ctaCustom')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">{t('ctaContact')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
