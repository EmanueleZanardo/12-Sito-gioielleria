'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export default function NotFound() {
  const { t } = useTranslation('notFound');

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 py-24 md:py-32 text-center max-w-2xl">
        <p className="font-headline text-7xl md:text-8xl text-primary">404</p>
        <h1 className="font-headline text-3xl md:text-4xl text-foreground mt-4">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">{t('description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button asChild size="lg">
            <Link href="/">{t('backHome')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/collections">{t('browseCollections')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
