'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Instagram, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { JsonLd, breadcrumbList, SITE_URL } from '@/components/json-ld';
import { sendConfirmationEmail } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { RequiredMark } from '@/components/required-mark';
import { useSearchParams } from 'next/navigation';

function ContactFormComponent() {
  const { t } = useTranslation('contact');
  const { t: tCommon } = useTranslation('common');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  // QA 12/10 19:36 (miglioria ciclo): ref per il campo honeypot anti-spam —
  // input NON registrato in react-hook-form, letto solo al submit.
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  // Messaggi di validazione localizzati (zod accetta messaggi dinamici).
  const contactSchema = z.object({
    name: z.string().min(1, t('validation.name')),
    email: z.string().email(t('validation.email')),
    subject: z.string().min(1, t('validation.subject')),
    message: z.string().min(10, t('validation.message')),
    photo: z.any().optional(),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      photo: null,
    },
  });

  // Merge react-hook-form ref with our own so the "remove photo" button
  // can actually reset the native file input (otherwise re-selecting the
  // same file fires no change event and the preview never comes back).
  const { ref: photoRegisterRef, ...photoRegister } = register('photo');
  
  useEffect(() => {
    const subject = searchParams.get('subject');
    const message = searchParams.get('message');
    if (subject) {
      setValue('subject', subject);
    }
    if (message) {
      setValue('message', message);
    }
  }, [searchParams, setValue]);

  const photo = watch('photo');

  const removePhoto = () => {
    setValue('photo', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleFormSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // QA 12/10 19:36 (miglioria ciclo): honeypot anti-spam — se il campo
    // trappola è compilato (bot), finge successo e scarta la richiesta
    // senza inviare alcuna email.
    if (honeypotRef.current?.value) {
      toast({
        title: t('toast.successTitle'),
        description: t('toast.successDesc'),
      });
      return;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === 'photo' && value instanceof FileList && value.length > 0) {
            formData.append(key, value[0]);
        } else if (typeof value === 'string') {
            formData.append(key, value);
        }
      }
    });

    try {
      const result = await sendConfirmationEmail(undefined, formData);

      if ((result.message ?? '').includes('success')) {
        toast({
          title: t('toast.successTitle'),
          description: t('toast.successDesc'),
        });
        reset();
      } else {
        toast({
          title: t('toast.errorTitle'),
          // QA 04/10: se l'invio fallisce (es. server di posta non attivo),
          // indica subito il canale funzionante invece di lasciare il
          // visitatore senza via d'uscita.
          description: `${result.message || t('toast.errorSend')} — ${tCommon('whatsapp.formFallback')} +39 345 111 4337`,
          variant: 'destructive',
        });
      }
    } catch (error) {
       toast({
        title: t('toast.errorTitle'),
        description: t('toast.errorUnexpected'),
        variant: 'destructive',
      });
    }
  };
  
  const photoFileList = watch('photo');
  const displayPhoto = photoFileList && photoFileList[0] ? photoFileList[0] : null;

  // QA 03/10 (fix memory leak): URL.createObjectURL() chiamato dentro il render
  // creava un object URL nuovo a ogni render (anche per una battuta di
  // tastiera) senza mai revocarlo. Ora l'URL è creato una sola volta per file
  // e revocato quando il file cambia o il componente si smonta.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!displayPhoto) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(displayPhoto);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [displayPhoto]);


  // QA 11/10 18:36 (miglioria ciclo): il componente rende SOLO la card
  // del form. Header e card recapiti sono in ContactPage, fuori dal
  // Suspense: non usano useSearchParams e restano nell'HTML
  // prerenderizzato (prima il bailout BAILOUT_TO_CLIENT_SIDE_RENDERING li
  // nascondeva ai crawler senza JS e lasciava il selettore speakable
  // #recapiti senza target nello statico). Zero cambi visivi: stesso
  // DOM, stesso ordine.
  return (
    <Card className="bg-card w-full md:max-w-md">
      <CardHeader>
        {/* QA 22/10 16:36 (miglioria ciclo, a11y): id per l'aria-labelledby
            del <form> qui sotto — lo screen reader annuncia il form col suo
            titolo invece di un generico "modulo". Stesso pattern dell'order-form
            (aria-labelledby, 10/10). Zero cambi visivi. */}
        <CardTitle id="contact-form-title" className="font-headline text-2xl">{t('form.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} aria-labelledby="contact-form-title" className="space-y-6">
          {/* QA 12/10 19:36 (miglioria ciclo): honeypot anti-spam — campo
              "website" invisibile agli umani (fuori schermo + hidden, aria-hidden,
              escluso dalla tabulazione, senza label) e NON registrato in
              react-hook-form. I bot che lo compilano vengono scartati in
              silenzio in handleFormSubmit. hidden = display:none, escluso dal
              selettore :not([hidden]) di space-y-6: nessuna spaziatura
              aggiunta. Zero cambi visivi. */}
          <input
            ref={honeypotRef}
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            hidden
            className="absolute -left-[9999px] top-0 h-px w-px opacity-0 pointer-events-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('form.name.label')}<RequiredMark /></Label>
              <Input id="name" placeholder={t('form.name.placeholder')} required autoComplete="name" enterKeyHint="next" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} />
              {errors.name && <p id="name-error" role="alert" className="text-sm font-medium text-red-400">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.email.label')}<RequiredMark /></Label>
              {/* QA 10/10 13:36 (miglioria ciclo): inputMode="email" sul
                  campo email — sui telefoni mostra la tastiera email (@ e
                  dominio). Zero cambi visivi. */}
              <Input id="email" type="email" placeholder={t('form.email.placeholder')} required autoComplete="email" inputMode="email" enterKeyHint="next" autoCapitalize="none" autoCorrect="off" spellCheck={false} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
              {errors.email && <p id="email-error" role="alert" className="text-sm font-medium text-red-400">{errors.email.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">{t('form.subject.label')}<RequiredMark /></Label>
            <Input id="subject" placeholder={t('form.subject.placeholder')} required enterKeyHint="next" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} {...register('subject')} />
            {errors.subject && <p id="subject-error" role="alert" className="text-sm font-medium text-red-400">{errors.subject.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t('form.message.label')}<RequiredMark /></Label>
            {/* QA 07/10 20:36: enterKeyHint="done" sul campo messaggio (ultimo del
form) — su mobile la tastiera mostra "Fine" invece di "Invio": name/email/
subject avevano già "next", al messaggio mancava. Zero cambi visivi. */}
            <Textarea id="message" placeholder={t('form.message.placeholder')} rows={5} required enterKeyHint="done" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
            {errors.message && <p id="message-error" role="alert" className="text-sm font-medium text-red-400">{errors.message.message}</p>}
          </div>
          <div className="space-y-2">
              {/* QA 07/10 07:36: l'input sr-only viene PRIMA della label nel
                  DOM — le varianti `peer-focus-visible:` della label
                  funzionano solo se il peer la precede; prima l'anello di
                  focus da tastiera non appariva mai. Nessun cambio visivo
                  (l'input resta sr-only). */}
              <Input
                  id="photo"
                  type="file"
                  className="sr-only peer"
                  accept="image/*"
                  aria-invalid={!!errors.photo}
                  // QA 07/10 09:36: il testo di aiuto persistente (stesso
                  // di order-form, chiave form.photo.description nelle 4
                  // lingue) ora è annunciato dagli screen reader insieme
                  // all'input — prima aria-describedby puntava solo
                  // all'errore (quando presente) e il form contatti non
                  // aveva proprio il testo di aiuto. Stesso pattern del
                  // fix 08:36 su order-form.
                  aria-describedby={['photo-description', errors.photo ? 'photo-error' : null].filter(Boolean).join(' ') || undefined}
                  {...photoRegister}
                  ref={(e) => {
                    photoRegisterRef(e);
                    fileInputRef.current = e;
                  }}
              />
              <Label htmlFor="photo" className="cursor-pointer inline-block w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                {t('form.photo.label')}
              </Label>
              <p id="photo-description" className="text-sm text-muted-foreground">{t('form.photo.description')}</p>
              {errors.photo && <p id="photo-error" role="alert" className="text-sm font-medium text-red-400">{errors.photo.message as string}</p>}
          </div>

            {displayPhoto && previewUrl && (
              <div className="space-y-2" aria-live="polite">
                <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                  <Image src={previewUrl} alt={t('form.photo.previewAlt')} fill sizes="96px" className="object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-8 w-8"
                    onClick={removePhoto}
                    aria-label={t('form.photo.remove')}
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{t('form.requiredHint')}</p>
             {/* QA 07/10 (worker A, micro-a11y): durante l'invio l'etichetta
                 resta visibile e lo spinner si affianca — prima il testo
                 veniva sostituito dallo spinner aria-hidden e il bottone
                 perdeva il nome accessibile (stesso fix già applicato
                 all'order form il 05/10). */}
             <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting && <Loader2 aria-hidden="true" className="mr-2 h-5 w-5 animate-spin" />}
              {t('form.submit')}
            </Button>
            {/* QA 22/10 01:36 (miglioria ciclo): rimando all'informativa
                privacy sotto il bottone di invio — il modulo raccoglie dati
                personali (nome, email, messaggio, foto). Testo i18n x4 lingue,
                link interno /privacy. */}
            <p className="text-center text-xs text-muted-foreground">
              {t('form.privacyPrefix')}{' '}
              <Link href="/privacy" className="underline underline-offset-2 visited:text-gold hover:text-primary">
                {t('form.privacyLink')}
              </Link>
              {t('form.privacySuffix')}
            </p>
            {/* QA 04/10: alternativa visibile mentre il server di posta
                non è attivo — il visitatore ha sempre un canale che
                funziona, senza cambiare il design. */}
            <p className="text-center text-sm text-muted-foreground">
              {tCommon('whatsapp.formFallback')}{' '}
              <a
                href="https://wa.me/393451114337"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 visited:text-gold hover:text-primary whitespace-nowrap"
              >
                +39 345 111 4337
                {/* QA 20/10 08:36: annuncio nuova scheda (a11y) */}
                <span className="sr-only">{tCommon('newTab')}</span>
              </a>
            </p>
          </form>
      </CardContent>
    </Card>
  );
}

export default function ContactPage() {
  const { t, language } = useTranslation('contact');
  const { t: tCommon } = useTranslation('common');
  return (
    <>
      {/* Briciole schema.org per SEO (non visibili) — fuori dal Suspense così
          finiscono nell'HTML prerenderizzato anche per i crawler senza JS */}
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', url: `${SITE_URL}/` },
          { name: tCommon('nav.contact'), url: `${SITE_URL}/contact` },
        ])}
      />
      {/* QA 05/10 01:36 (miglioria ciclo): ContactPage schema.org — recapiti
          1:1 col contenuto visibile (WhatsApp + email in pagina), i18n attiva.
          QA 11/10 06:36 (miglioria ciclo): speakable (SpeakableSpecification)
          sulla card recapiti visibile (id="recapiti") — stesso pattern di
          #storia su /about (03:36) e #steps su /orders (05:36); i canali di
          contatto sono il candidato naturale per gli assistenti vocali.
          Zero cambi visivi. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: t('title'),
          url: `${SITE_URL}/contact`,
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
            cssSelector: ['#recapiti'],
          },
          about: {
            '@type': 'Organization',
            name: 'GDC Jewellery Lab',
            url: SITE_URL,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+39 345 111 4337',
              email: 'laboratorio.ticino@gmail.com',
              contactType: 'customer service',
              // QA 10/10 19:36 (miglioria ciclo): availableLanguage — il sito
              // serve i contenuti in 4 lingue (it/en/fr/de, switch client-side)
              // e il form contatti è tradotto in tutte; dichiararlo aiuta i
              // motori a instradare correttamente le richieste. Zero cambi visivi.
              availableLanguage: ['Italian', 'English', 'French', 'German'],
            },
          },
        }}
      />
      {/* QA 11/10 18:36 (miglioria ciclo): header + card recapiti fuori dal
          Suspense — non usano useSearchParams, quindi niente bailout
          BAILOUT_TO_CLIENT_SIDE_RENDERING: restano nell'HTML prerenderizzato
          (crawler senza JS, visitatori no-JS) e il selettore speakable
          #recapiti del JSON-LD ContactPage qui sopra ha un target anche nello
          statico. Solo la card del form resta nel Suspense (usa
          useSearchParams per il prefill da ?subject= / ?message=). Zero cambi
          visivi: stesso DOM, stesso ordine. */}
      <div className="bg-background pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="text-center mb-12 px-4">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-y-12 md:gap-x-12 max-w-5xl mx-auto px-4">
          <div className="w-full md:max-w-md space-y-8">
            {/* QA 11/10 06:36 (miglioria ciclo): id="recapiti" come target del
                `speakable` (SpeakableSpecification) nel JSON-LD ContactPage qui
                sotto: la card dei canali di contatto è il candidato naturale
                per gli assistenti vocali — stesso pattern di #storia su /about
                (03:36) e #steps su /orders (05:36). 1:1 col contenuto visibile,
                i18n attiva, zero cambi visivi. */}
            {/* QA 21/10 23:36 (miglioria ciclo): scroll-mt con
                env(safe-area-inset-top) — stesso pattern di #gallery (10/10
                15:36): l'id e' target di frammento (speakable JSON-LD, deep
                link): senza scroll-mt il salto ad ancora nasconderebbe la
                card sotto l'header sticky (80px + notch). Zero cambi visivi. */}
            <Card id="recapiti" className="bg-card w-full scroll-mt-[calc(6rem+env(safe-area-inset-top))]">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{t('contactInfo.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <div className="flex items-center gap-4">
                  <Mail aria-hidden="true" className="h-6 w-6 text-primary" />
                  <a href="mailto:laboratorio.ticino@gmail.com" className="text-foreground/80 visited:text-foreground/80 hover:text-primary break-all">
                    laboratorio.ticino@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone aria-hidden="true" className="h-6 w-6 text-primary" />
                  <a href="tel:+393451114337" className="text-foreground/80 visited:text-foreground/80 hover:text-primary whitespace-nowrap">
                    +39 345 111 4337
                  </a>
                </div>
                <div className="flex items-center gap-4 pt-4">
                    {/* QA 03/10 11:36: <a> nativo per URL esterno (era next/link):
                        Link è pensato per la navigazione interna con prefetch e
                        non aggiunge nulla agli URL esterni; <a> è il pattern già
                        usato per lo stesso link in header.tsx. */}
                    {/* QA 20/10 08:36: annuncio nuova scheda (a11y) via sr-only. */}
                    <a href="https://www.instagram.com/gdc_jewellery_lab" target="_blank" rel="noopener noreferrer me" className="flex items-center gap-3 text-foreground/80 visited:text-foreground/80 hover:text-primary">
                      <Instagram aria-hidden="true" className="h-6 w-6" />
                      <span>@gdc_jewellery_lab</span>
                      <span className="sr-only">{tCommon('newTab')}</span>
                    </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Suspense
            fallback={
              <Card className="bg-card w-full md:max-w-md" aria-busy="true">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{t('form.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="animate-pulse space-y-6" role="status">
                    <span className="sr-only">{t('loading')}</span>
                    <div className="space-y-4">
                      <div className="h-10 rounded bg-muted" />
                      <div className="h-10 rounded bg-muted" />
                      <div className="h-10 rounded bg-muted" />
                      <div className="h-28 rounded bg-muted" />
                    </div>
                  </div>
                  {/* QA 04/10 18:36: con JavaScript disabilitato il form non si
                      monta mai e resterebbe solo lo skeleton: il noscript dà ai
                      visitatori un'alternativa diretta (WhatsApp/email), resa
                      nell'HTML statico. */}
                  <noscript>
                    <div className="mt-8 rounded-xl border border-gold/30 bg-card p-6 text-center">
                      <p className="text-foreground/90">{t('noscript')}</p>
                      <p className="mt-3 space-x-4">
                        <a
                          href="https://wa.me/393451114337"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 text-foreground visited:text-foreground hover:text-primary whitespace-nowrap"
                        >
                          WhatsApp: +39 345 111 4337
                          {/* QA 20/10 08:36: annuncio nuova scheda (a11y) */}
                          <span className="sr-only">{tCommon('newTab')}</span>
                        </a>
                        <a
                          href="mailto:laboratorio.ticino@gmail.com"
                          className="underline underline-offset-2 text-foreground visited:text-foreground hover:text-primary break-all"
                        >
                          laboratorio.ticino@gmail.com
                        </a>
                      </p>
                    </div>
                  </noscript>
                </CardContent>
              </Card>
            }
          >
            <ContactFormComponent />
          </Suspense>
        </div>
      </div>
    </>
  )
}