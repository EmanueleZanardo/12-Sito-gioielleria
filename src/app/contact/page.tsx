'use client';

import { useRef, useEffect, Suspense } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Instagram, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/hooks/use-translation';
import { sendConfirmationEmail } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';

const contactSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(1, 'Please enter a subject.'),
  message: z.string().min(10, 'Please provide a more detailed message.'),
  photo: z.any().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactFormComponent() {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  
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
          title: "Email di conferma inviata",
          description: "Abbiamo inviato un riepilogo della tua richiesta alla tua casella di posta.",
        });
        reset();
      } else {
        toast({
          title: "Errore",
          description: result.message || "Non è stato possibile inviare l'email di conferma.",
          variant: 'destructive',
        });
      }
    } catch (error) {
       toast({
        title: "Errore",
        description: "Si è verificato un problema imprevisto.",
        variant: 'destructive',
      });
    }
  };
  
  const photoFileList = watch('photo');
  const displayPhoto = photoFileList && photoFileList[0] ? photoFileList[0] : null;


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
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:laboratorio.ticino@gmail.com" className="text-foreground/80 hover:text-primary break-all">
                  laboratorio.ticino@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+393451114337" className="text-foreground/80 hover:text-primary">
                  345 1114337
                </a>
              </div>
              <div className="flex items-center gap-4 pt-4">
                  <Link href="https://www.instagram.com/gdc_jewellery_lab?igsh=MWY1azQ2ejRwODN2Mg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/80 hover:text-primary">
                    <Instagram className="h-6 w-6" />
                    <span>@gdc_jewellery_lab</span>
                  </Link>
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
                  <Label htmlFor="name">{t('form.name.label')}</Label>
                  <Input id="name" placeholder={t('form.name.placeholder')} required autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} />
                  {errors.name && <p id="name-error" role="alert" className="text-sm font-medium text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email.label')}</Label>
                  <Input id="email" type="email" placeholder={t('form.email.placeholder')} required autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
                  {errors.email && <p id="email-error" role="alert" className="text-sm font-medium text-destructive">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t('form.subject.label')}</Label>
                <Input id="subject" placeholder={t('form.subject.placeholder')} required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} {...register('subject')} />
                {errors.subject && <p id="subject-error" role="alert" className="text-sm font-medium text-destructive">{errors.subject.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('form.message.label')}</Label>
                <Textarea id="message" placeholder={t('form.message.placeholder')} rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
                {errors.message && <p id="message-error" role="alert" className="text-sm font-medium text-destructive">{errors.message.message}</p>}
              </div>
              <div className="space-y-2">
                  <Label htmlFor="photo" className="cursor-pointer inline-block w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    {t('form.photo.label')}
                  </Label>
                  <Input
                      id="photo"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      {...photoRegister}
                      ref={(e) => {
                        photoRegisterRef(e);
                        fileInputRef.current = e;
                      }}
                  />
                  {errors.photo && <p className="text-sm font-medium text-destructive">{errors.photo.message as string}</p>}
              </div>

                {displayPhoto && (
                  <div className="space-y-2">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                      <Image src={URL.createObjectURL(displayPhoto)} alt="Anteprima immagine" fill className="object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={removePhoto}
                        aria-label={t('form.photo.remove')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                 <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : t('form.submit')}
                </Button>
              </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation('contact');
  return (
    <Suspense
      fallback={
        <div
          className="container mx-auto px-4 py-12 max-w-2xl"
          aria-busy="true"
        >
          <div className="animate-pulse space-y-6" role="status">
            <span className="sr-only">{t('loading')}</span>
            <div className="h-8 w-2/3 rounded bg-muted" />
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
  )
}
