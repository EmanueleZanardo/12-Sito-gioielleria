'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export default function NotFound() {
  const { t } = useTranslation('notFound');
  const { t: tCommon } = useTranslation('common');
  const pageTitle = t('title');

  // La 404 eredita il <title> generico del layout: la tab del browser mostra
  // invece un titolo specifico e localizzato ("Pagina non trovata | GDC
  // Jewellery Lab", con il separatore a pipe come nel template di tutte le
  // altre pagine). Ripristinato all'uscita dalla pagina.
  useEffect(() => {
    const previous = document.title;
    document.title = `${pageTitle} | GDC Jewellery Lab`;
    return () => {
      document.title = previous;
    };
  }, [pageTitle]);

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 py-24 md:py-32 text-center max-w-2xl">
        {/* QA 04/10 10:36: il numerale "404" è puramente decorativo — il
            significato è già nell'h1 qui sotto ("Pagina non trovata").
            aria-hidden evita la doppia lettura agli screen reader. */}
        <p className="font-headline text-7xl md:text-8xl text-primary" aria-hidden="true">404</p>
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
        {/* QA 05/10 13:36 (W10): scorciatoie testuali verso le pagine più
            richieste. Riusa le voci di navigazione esistenti (già tradotte
            nelle 4 lingue) — nessuna nuova chiave, nessun tocco ai file di
            traduzione. QA 06/10 11:36: py-2 => tap target >= 24px su mobile
            (WCAG 2.2 AA 2.5.8); visited: gemello per colore stabile
            post-click, come da pattern del sito. */}
        <div className="mt-12 flex items-center justify-center gap-5 text-xs uppercase tracking-[0.25em]">
          <Link href="/custom-jewel" className="py-2 text-muted-foreground visited:text-muted-foreground hover:text-primary transition-colors">
            {tCommon('nav.createJewel')}
          </Link>
          <span aria-hidden="true" className="text-gold/50">·</span>
          <Link href="/orders" className="py-2 text-muted-foreground visited:text-muted-foreground hover:text-primary transition-colors">
            {tCommon('nav.orders')}
          </Link>
          <span aria-hidden="true" className="text-gold/50">·</span>
          <Link href="/contact" className="py-2 text-muted-foreground visited:text-muted-foreground hover:text-primary transition-colors">
            {tCommon('nav.contact')}
          </Link>
        </div>
      </div>
    </div>
  );
}
