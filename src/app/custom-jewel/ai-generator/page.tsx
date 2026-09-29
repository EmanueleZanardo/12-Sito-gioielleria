'use client';

import { AIGeneratorClient } from './ai-generator-client';
import { useTranslation } from '@/hooks/use-translation';

export default function AIGeneratorPage() {
  const { t } = useTranslation('customJewel');

  return (
    <div className="bg-background">
      <div className="py-16 md:py-24">
        <div className="text-center mb-12 w-full max-w-3xl mx-auto px-4 md:px-0">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('imageGenerator.title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {t('imageGenerator.pageSubtitle')}
          </p>
        </div>
        <AIGeneratorClient />
      </div>
    </div>
  );
}
