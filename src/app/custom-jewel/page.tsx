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

  const whatsappUrl = `https://wa.me/393451114337?text=${encodeURIComponent(
    t('v2.hero.whatsappPrefill')
  )}`;

  const steps = [
    { icon: MessagesSquare, n: '1' },
    { icon: PencilRuler, n: '2' },
    { icon: Hammer, n: '3' },
    { icon: PackageCheck, n: '4' },
  ];

  const benefits = [
    { icon: Gem, n: '1' },
    { icon: Ruler, n: '2' },
    { icon: Wallet, n: '3' },
  ];

  const faqCount = 5;

  return (
    <div className="bg-background">
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
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
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
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <a href={PHONE_TEL}>
                  <Phone className="mr-2 h-5 w-5" />
                  {t('v2.cta.buttonPhone')}
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              {t('v2.cta.note')}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
