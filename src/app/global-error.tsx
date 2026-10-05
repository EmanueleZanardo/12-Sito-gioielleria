'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageProvider } from '@/context/language-context';
import { useTranslation } from '@/hooks/use-translation';

function ErrorContent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation('error');

  // L'errore viene loggato in console per la diagnostica; il visitatore
  // vede solo la pagina brandizzata (nessun dettaglio tecnico esposto).
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 py-24 md:py-32 text-center max-w-2xl">
        {/* Simbolo decorativo: il significato è nell'h1 qui sotto. */}
        <p className="font-headline text-7xl md:text-8xl text-primary" aria-hidden="true">
          !
        </p>
        <h1 className="font-headline text-3xl md:text-4xl text-foreground mt-4">
          {t('title')}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">{t('description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button size="lg" onClick={() => reset()}>
            {t('tryAgain')}
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">{t('backHome')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // global-error sostituisce l'intero root layout: serve il proprio
  // <html>/<body>. Il LanguageProvider locale riabilita le traduzioni
  // (rilegge la lingua salvata dal visitatore) senza dipendere dal layout.
  return (
    <html lang="it" className="dark">
      <body className="font-body antialiased">
        <LanguageProvider>
          <ErrorContent error={error} reset={reset} />
        </LanguageProvider>
      </body>
    </html>
  );
}
