'use client';

import { OrderForm } from './order-form-client';
import { useTranslation } from '@/hooks/use-translation';

export default function OrderFormPage() {
  const { t } = useTranslation('customJewel');

  return (
    // overflow-x-clip: il carosello embla dei selettori può generare qualche px
    // di overflow orizzontale a livello documento (rilevato nel check UX live);
    // clip lo contiene senza creare uno scroll container annidato.
    <div className="bg-background py-8 md:py-12 overflow-x-clip">
        <div className="text-center mb-8 px-4">
            <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('form.title')}
            </h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('form.pageSubtitle')}
            </p>
        </div>
        <OrderForm />
    </div>
  );
}
