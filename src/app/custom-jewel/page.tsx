'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';
import {
  MessagesSquare,
  PencilRuler,
  Hammer,
  PackageCheck,
  Gem,
  Ruler,
  Wallet,
  ArrowRight,
  Phone,
  MessageCircle,
  Check,
} from 'lucide-react';

// Recapiti già presenti nel sito (pagina contatti / metadata layout)
const PHONE_TEL = 'tel:+393451114337';

export default function CustomJewelPage() {
  const { t } = useTranslation('customJewel');
  const { t: tCommon } = useTranslation('common');

  const whatsappUrl = `https://wa.me/393451114337?text=${encodeURIComponent(
    t('v2.hero.whatsappPrefill')
  )}`;

  const steps = [
    { icon: MessagesSquare, n: '1' },
    { icon: PencilRuler, n: '2' },
    { icon: Hammer, n: '3' },
    { icon: PackageCheck, n: '4' },
  ];

  // Banda di conversione con il processo su misura in 3 passi + CTA
  // WhatsApp (riusa il messaggio precompilato della hero).
  const processSteps = ['1', '2', '3'];

  const processWhatsappUrl = `https://wa.me/393451114337?text=${encodeURIComponent(
    t('v2.hero.whatsappPrefill')
  )}`;

  const benefits = [
    { icon: Gem, n: '1' },
    { icon: Ruler, n: '2' },
    { icon: Wallet, n: '3' },
  ];

  const faqCount = 5;

  return (
    <div className="bg-background">
      {/* Briciole schema.org per SEO (non visibili) */}
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: tCommon('nav.createJewel'), url: `${SITE_URL}/custom-jewel` },
        ])}
      />
      {/* HERO */}
      <section className="container mx-auto px-4 pt-16 md:pt-24 pb-12 text-center">
        <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
          {t('v2.hero.badge')}
        </Badge>
        <h1 className="font-headline text-4xl md:text-6xl text-foreground max-w-4xl mx-auto">
          {t('v2.hero.title')}
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          {t('v2.hero.subtitle')}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            <Link href="/custom-jewel/order-form">
              {t('v2.hero.ctaOrder')}
              <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
              {t('v2.hero.ctaWhatsapp')}
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">{t('v2.hero.note')}</p>
      </section>

      {/* COME FUNZIONA — 4 STEP */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('v2.steps.label')}
          </p>
          <h2 className="font-headline text-3xl md:text-4xl text-foreground mt-2">
            {t('v2.steps.title')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map(({ icon: Icon, n }) => (
            <Card key={n} className="bg-card relative overflow-hidden">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </span>
                  <span className="font-headline text-5xl text-primary/15 select-none">
                    {n}
                  </span>
                </div>
                <CardTitle className="font-headline text-xl">
                  {t(`v2.steps.${n}.title`)}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {t(`v2.steps.${n}.text`)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* PERCHÉ SU MISURA */}
      <section className="bg-muted/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {t('v2.why.label')}
            </p>
            <h2 className="font-headline text-3xl md:text-4xl text-foreground mt-2">
              {t('v2.why.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map(({ icon: Icon, n }) => (
              <Card key={n} className="bg-card text-center">
                <CardHeader className="items-center p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </span>
                  <CardTitle className="font-headline text-2xl">
                    {t(`v2.why.${n}.title`)}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {t(`v2.why.${n}.text`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO SU MISURA — 3 PASSI + CTA WHATSAPP */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto rounded-2xl border border-gold/25 bg-card px-6 py-10 md:py-12 shadow-[0_18px_60px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4 text-xs px-5 py-1.5 uppercase tracking-[0.22em] border-gold/40 text-gold bg-gold/10">
              {t('v2.process.label')}
            </Badge>
            <h2 className="font-headline text-3xl md:text-4xl text-foreground lux-title">
              {t('v2.process.title')}
            </h2>
            <div className="gold-divider" aria-hidden="true" />
          </div>
          <ol className="grid md:grid-cols-3 gap-8 md:gap-6">
            {processSteps.map((n, i) => (
              <li key={n} className="relative flex flex-col items-center text-center">
                {/* Linea di connessione tra i passi (solo desktop) */}
                {i < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-px bg-gold/30"
                  />
                )}
                {/* Badge numerico: decorativo, gli screen reader leggono gia' la numerazione dall'ol */}
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-headline text-2xl font-semibold text-gold mb-4"
                >
                  {n}
                </span>
                <h3 className="font-headline text-xl text-foreground">
                  {t(`v2.process.${n}.title`)}
                </h3>
                <p className="text-base text-muted-foreground mt-2 max-w-xs">
                  {t(`v2.process.${n}.text`)}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gold text-[#171106] hover:bg-gold-light font-semibold rounded-full px-8 tracking-[0.12em] uppercase text-sm shadow-[0_8px_28px_rgba(201,168,106,0.35)]"
            >
              <a href={processWhatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" className="mr-2 h-5 w-5" />
                {t('v2.process.ctaWhatsapp')}
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">{t('v2.process.note')}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t('v2.faq.label')}
          </p>
          <h2 className="font-headline text-3xl md:text-4xl text-foreground mt-2">
            {t('v2.faq.title')}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: faqCount }, (_, i) => i + 1).map((n) => (
              <AccordionItem key={n} value={`q${n}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {t(`v2.faq.q${n}`)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {t(`v2.faq.a${n}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <Card className="bg-card max-w-4xl mx-auto border-primary/30">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="font-headline text-3xl md:text-4xl text-foreground">
              {t('v2.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              {t('v2.cta.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <Link href="/custom-jewel/order-form">
                  {t('v2.cta.buttonOrder')}
                  <ArrowRight aria-hidden="true" className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <a href={PHONE_TEL}>
                  <Phone aria-hidden="true" className="mr-2 h-5 w-5" />
                  {t('v2.cta.buttonPhone')}
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Check aria-hidden="true" className="h-4 w-4 text-primary" />
              {t('v2.cta.note')}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
