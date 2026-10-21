'use client';

import { OrderForm } from './order-form-client';
import { useTranslation } from '@/hooks/use-translation';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';

export default function OrderFormPage() {
  const { t, language } = useTranslation('customJewel');
  const { t: tCommon } = useTranslation('common');

  return (
    // overflow-x-clip: il carosello embla dei selettori può generare qualche px
    // di overflow orizzontale a livello documento (rilevato nel check UX live);
    // clip lo contiene senza creare uno scroll container annidato.
    <div className="bg-background py-8 md:py-12 overflow-x-clip">
        {/* QA 11/10 01:36 (miglioria ciclo): BreadcrumbList JSON-LD — era
            l'unica pagina senza briciole schema.org (Home → Crea gioiello →
            Modulo ordine). Terzo item 1:1 col titolo visibile (form.title),
            i18n attiva. Zero cambi visivi. */}
        <JsonLd
          data={breadcrumbList([
            { name: 'Home', url: `${SITE_URL}/` },
            { name: tCommon('nav.createJewel'), url: `${SITE_URL}/custom-jewel` },
            { name: t('form.title'), url: `${SITE_URL}/custom-jewel/order-form` },
          ])}
        />
        {/* QA 11/10 13:36 (miglioria ciclo): WebPage JSON-LD con speakable
            (SpeakableSpecification, cssSelector #order-form-intro) sull'intro
            visibile (titolo + sottotitolo del modulo) — era l'unica pagina
            senza speakable; completamento della serie: WebSite #hero-subtitle
            (layout 12:36), ItemList Rombo d'Argento #moto /collections (11:36),
            ItemList #gallery home (10:36), ItemList #collezioni /collections
            (09:36), ItemList #servizi /services (08:36), JewelryStore
            #perche-gdc home (07:36), ContactPage #recapiti /contact (06:36),
            HowTo #steps /orders (05:36), AboutPage #storia /about (03:36),
            FAQPage /custom-jewel (00:36). L'intro descrive cosa chiede il
            modulo: candidato naturale per gli assistenti vocali. 1:1 col
            contenuto visibile, i18n attiva, zero cambi visivi. */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t('form.title'),
            url: `${SITE_URL}/custom-jewel/order-form`,
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
              cssSelector: ['#order-form-intro'],
            },
          }}
        />
        {/* QA 11/10 13:36: id="order-form-intro" come target del `speakable`
            (SpeakableSpecification) nel JSON-LD WebPage qui sopra — stesso
            pattern di #recapiti su /contact (06:36) e #storia su /about
            (03:36). Zero cambi visivi. */}
        <div id="order-form-intro" className="text-center mb-8 px-4">
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
