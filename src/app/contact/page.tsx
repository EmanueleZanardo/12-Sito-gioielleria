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


  return (
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
          <Card className="bg-card w-full">
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
                <a href="tel:+393451114337" className="text-foreground/80 visited:text-foreground/80 hover:text-primary">
                  345 111 4337
                </a>
              </div>
              <div className="flex items-center gap-4 pt-4">
                  {/* QA 03/10 11:36: <a> nativo per URL esterno (era next/link):
                      Link è pensato per la navigazione interna con prefetch e
                      non aggiunge nulla agli URL esterni; <a> è il pattern già
                      usato per lo stesso link in header.tsx. */}
                  <a href="https://www.instagram.com/gdc_jewellery_lab" target="_blank" rel="noopener noreferrer me" className="flex items-center gap-3 text-foreground/80 visited:text-foreground/80 hover:text-primary">
                    <Instagram aria-hidden="true" className="h-6 w-6" />
                    <span>@gdc_jewellery_lab</span>
                  </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card w-full md:max-w-md">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name.label')}<RequiredMark /></Label>
                  <Input id="name" placeholder={t('form.name.placeholder')} required autoComplete="name" enterKeyHint="next" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} />
                  {errors.name && <p id="name-error" role="alert" className="text-sm font-medium text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email.label')}<RequiredMark /></Label>
                  <Input id="email" type="email" placeholder={t('form.email.placeholder')} required autoComplete="email" enterKeyHint="next" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
                  {errors.email && <p id="email-error" role="alert" className="text-sm font-medium text-destructive">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t('form.subject.label')}<RequiredMark /></Label>
                <Input id="subject" placeholder={t('form.subject.placeholder')} required enterKeyHint="next" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} {...register('subject')} />
                {errors.subject && <p id="subject-error" role="alert" className="text-sm font-medium text-destructive">{errors.subject.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('form.message.label')}<RequiredMark /></Label>
                <Textarea id="message" placeholder={t('form.message.placeholder')} rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
                {errors.message && <p id="message-error" role="alert" className="text-sm font-medium text-destructive">{errors.message.message}</p>}
              </div>
              <div className="space-y-2">
                  <Label htmlFor="photo" className="cursor-pointer inline-block w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    {t('form.photo.label')}
                  </Label>
                  <Input
                      id="photo"
                      type="file"
                      className="sr-only peer"
                      accept="image/*"
                      aria-invalid={!!errors.photo}
                      aria-describedby={errors.photo ? 'photo-error' : undefined}
                      {...photoRegister}
                      ref={(e) => {
                        photoRegisterRef(e);
                        fileInputRef.current = e;
                      }}
                  />
                  {errors.photo && <p id="photo-error" role="alert" className="text-sm font-medium text-destructive">{errors.photo.message as string}</p>}
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
                 <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : t('form.submit')}
                </Button>
                {/* QA 04/10: alternativa visibile mentre il server di posta
                    non è attivo — il visitatore ha sempre un canale che
                    funziona, senza cambiare il design. */}
                <p className="text-center text-sm text-muted-foreground">
                  {tCommon('whatsapp.formFallback')}{' '}
                  <a
                    href="https://wa.me/393451114337"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 visited:text-gold hover:text-primary"
                  >
                    +39 345 111 4337
                  </a>
                </p>
              </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation('contact');
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
    <Suspense
      fallback={
        <div
          className="container mx-auto px-4 py-12 max-w-2xl"
          aria-busy="true"
        >
          {/* h1 reale anche nello skeleton: la pagina usa useSearchParams
              (client-only), quindi senza heading nel fallback l'SSR servirebbe
              ai crawler solo "Caricamento…". Testo identico a quello del form
              reale: nessun flash, nessun mismatch di hydration. */}
          <p className="font-headline text-4xl md:text-5xl text-foreground text-center mb-8" aria-hidden="true">
            {t('title')}
          </p>
          <div className="animate-pulse space-y-6" role="status">
            <span className="sr-only">{t('loading')}</span>
            <div className="space-y-4">
              <div className="h-10 rounded bg-muted" />
              <div className="h-10 rounded bg-muted" />
              <div className="h-10 rounded bg-muted" />
              <div className="h-28 rounded bg-muted" />
            </div>
          </div>
        </div>
      }
    >
      <ContactFormComponent />
    </Suspense>
    </>
  )
}
