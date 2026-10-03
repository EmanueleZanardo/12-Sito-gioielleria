'use client';

import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { CheckCircle2, X, Loader2 } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { sendConfirmationEmail } from '@/lib/actions';
import { jewelryTypeIds, jewelryTypeImages, materialData, stoneData } from '@/lib/order-form-data';
import { Label } from '@/components/ui/label';

function OrderFormClient() {
  const { t } = useTranslation('customJewel');
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Messaggi di validazione localizzati (zod accetta messaggi dinamici).
  const customOrderSchema = z.object({
    jewelryType: z.string({ required_error: t('form.validation.jewelryType') }),
    materials: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: t('form.validation.materials'),
    }),
    stones: z.array(z.string()).optional(),
    description: z.string().min(10, t('form.validation.description')),
    photo: z.any().optional(),
    aiPrompt: z.string().optional(),
    aiImageUrl: z.string().optional(),
    name: z.string().min(2, t('form.validation.name')),
    email: z.string().email(t('form.validation.email')),
  });

  type CustomOrderFormValues = z.infer<typeof customOrderSchema>;


function SelectionCarousel<T extends {id: string, imageUrl?: string, color?: string }>({
  field,
  items,
  isMultiple,
  t
}: {
  field: any;
  items: T[];
  isMultiple: boolean;
  t: (key: string) => string;
}) {
  const [api, setApi] = React.useState<UseEmblaCarouselType[1]>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const onSelect = React.useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
  }, [api, onSelect]);

  const handleSelect = (itemId: string) => {
    if (isMultiple) {
      const currentValue = field.value || [];
      const isSelected = currentValue.includes(itemId);
      
      let newValue = isSelected
        ? currentValue.filter((v: string) => v !== itemId)
        : [...currentValue, itemId];
      
      field.onChange(newValue);
    } else {
      field.onChange(itemId);
    }
  };

  const getItemLabel = (item: T) => {
    if (item.imageUrl) {
        return t(`form.types.${item.id}`);
    } else if (item.id in jewelryTypeImages) { // This is a bit of a hack, but it works
        return t(`form.types.${item.id}`);
    } else if (materialData.some(m => m.id === item.id)) {
        return t(`form.materialsList.${item.id}`);
    } else if (stoneData.some(s => s.id === item.id)) {
        return t(`form.stonesList.${item.id}`);
    }
    return item.id;
  };

  return (
    <div className="relative overflow-hidden">
      <Carousel setApi={setApi} className="w-full" opts={{ dragFree: true }}>
        <CarouselContent className="-ml-2 px-8">
          {items.map((item) => {
            const isSelected = isMultiple ? field.value?.includes(item.id) : field.value === item.id;
            return (
              <CarouselItem key={item.id} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-2">
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-pressed={isSelected}
                  className="p-1 block w-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span
                    className={cn(
                      "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 aspect-square hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors relative",
                      isSelected && "border-primary"
                    )}
                  >
                     {item.imageUrl ? (
                        <div className="relative w-10 h-10 mb-2">
                            <Image src={item.imageUrl} alt={getItemLabel(item)} fill sizes="40px" className="object-contain" />
                        </div>
                    ) : item.color ? (
                        <div className="w-10 h-10 mb-2 flex items-center justify-center">
                            <div
                                style={{ backgroundColor: item.color }}
                                className="w-8 h-8 transform rotate-45 border-2 border-slate-400"
                            />
                        </div>
                    ) : null}
                    <span className="text-center text-xs font-medium">{getItemLabel(item)}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-primary absolute top-1 right-1" />}
                  </span>
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className={cn("absolute -left-0 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80", !canScrollPrev && "hidden")} />
        <CarouselNext className={cn("absolute -right-0 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80", !canScrollNext && "hidden")} />
      </Carousel>
    </div>
  );
}

  const { register, handleSubmit, watch, setValue, control, formState: { errors, isSubmitting }, reset } = useForm<CustomOrderFormValues>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      jewelryType: 'ring',
      materials: ['yellow_gold'],
      stones: [],
      description: '',
      name: '',
      email: '',
      photo: null,
      aiPrompt: '',
      aiImageUrl: '',
    },
  });

  // Merge react-hook-form ref with our own so the "remove photo" button
  // can actually reset the native file input (otherwise re-selecting the
  // same file fires no change event and the preview never comes back).
  const { ref: photoRegisterRef, ...photoRegister } = register('photo');
  
  const aiImageUrl = watch('aiImageUrl');

  useEffect(() => {
    const imageUrl = searchParams.get('imageUrl');
    const prompt = searchParams.get('prompt');
    if (imageUrl) {
      setValue('aiImageUrl', imageUrl);
      if (prompt) {
        setValue('description', prompt);
        setValue('aiPrompt', prompt);
      }
    }
  }, [searchParams, setValue]);
  
  const removePhoto = () => {
    setValue('photo', null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };
  
  const clearAiImage = () => {
    setValue('aiImageUrl', '');
    setValue('aiPrompt', '');
  };

  const createFullMessage = (data: CustomOrderFormValues) => {
    let messageBody = `${t('form.jewelryType.label')}: ${t(`form.types.${data.jewelryType}`)}\n`;
    messageBody += `${t('form.materials.label')}: ${data.materials.map(m => t(`form.materialsList.${m}`)).join(', ')}\n`;
    if (data.stones && data.stones.length > 0) {
      messageBody += `${t('form.stones.label')}: ${data.stones.map(s => t(`form.stonesList.${s}`)).join(', ')}\n`;
    }
    messageBody += `\n${t('form.description.label')}:\n${data.description}\n`;
    if (data.aiPrompt) {
        messageBody += `\n${t('form.aiPromptLabel')}: ${data.aiPrompt}\n`;
    }
    if (data.aiImageUrl) {
        messageBody += `${t('form.aiImageLabel')}: ${data.aiImageUrl}\n`;
    }
    return messageBody;
  }
  
  const handleFormSubmit: SubmitHandler<CustomOrderFormValues> = async (data) => {
      const formData = new FormData();
      
      // Handle file input correctly
      if (data.photo && data.photo.length > 0) {
        formData.append('photo', data.photo[0]);
      }

      // Append other data
      Object.entries(data).forEach(([key, value]) => {
          if (key !== 'photo' && value) {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value as string);
            }
          }
      });
      formData.set('message', createFullMessage(data));
      formData.set('subject', t('form.emailSubject'));

      try {
        const result = await sendConfirmationEmail(undefined, formData);
        
        if ((result.message ?? '').includes('success')) {
            toast({
                title: t('form.toast.title'),
                description: t('form.toast.description'),
            });
            toast({
                title: t('form.confirmation.title'),
                description: t('form.confirmation.description'),
            });
            reset();
        } else {
            toast({
                title: t('form.errorTitle'),
                description: result.message || t('form.errorSend'),
                variant: 'destructive',
            });
        }
      } catch (error) {
         toast({
            title: t('form.errorTitle'),
            description: t('form.errorUnexpected'),
            variant: 'destructive',
        });
      }
  };

  const photoFileList = watch('photo');
  const displayPhoto = photoFileList && photoFileList[0] ? photoFileList[0] : null;

  return (
    <Card className="bg-card w-full max-w-4xl mx-auto rounded-none border-x-0 md:rounded-lg md:border-x">
      <CardHeader className="px-4 md:px-6">
        <CardTitle className="font-headline text-2xl text-center">{t('form.title')}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 md:px-0">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-12">
            
            {/* QA 03/10: fieldset/legend per associare programmaticamente
                l'etichetta di gruppo al carosello di selezione (a11y). */}
            <fieldset className="space-y-3">
              <legend className="text-lg font-semibold px-4 md:px-6 float-left">{t('form.jewelryType.label')}</legend>
              <p className="text-sm text-muted-foreground px-4 md:px-6 clear-both">{t('form.jewelryType.description')}</p>
              <Controller
                  control={control}
                  name="jewelryType"
                  render={({ field }) => <SelectionCarousel field={field} items={jewelryTypeIds.map(id => ({ id, imageUrl: jewelryTypeImages[id] }))} isMultiple={false} t={t} />}
              />
              {errors.jewelryType && <p className="text-sm font-medium text-destructive px-4 md:px-6">{errors.jewelryType.message}</p>}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-lg font-semibold px-4 md:px-6 float-left">{t('form.materials.label')}</legend>
              <p className="text-sm text-muted-foreground px-4 md:px-6 clear-both">{t('form.materials.description')}</p>
              <Controller
                  control={control}
                  name="materials"
                  render={({ field }) => <SelectionCarousel field={field} items={materialData.map(material => ({ id: material.id, color: material.color }))} isMultiple={true} t={t} />}
              />
              {errors.materials && <p className="text-sm font-medium text-destructive px-4 md:px-6">{errors.materials.message}</p>}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-lg font-semibold px-4 md:px-6 float-left">{t('form.stones.label')}</legend>
              <p className="text-sm text-muted-foreground px-4 md:px-6 clear-both">{t('form.stones.description')}</p>
              <Controller
                  control={control}
                  name="stones"
                  render={({ field }) => <SelectionCarousel field={field} items={stoneData.map(stone => ({ id: stone.id, color: stone.color }))} isMultiple={true} t={t} />}
              />
              {errors.stones && <p className="text-sm font-medium text-destructive px-4 md:px-6">{errors.stones.message}</p>}
            </fieldset>
            
            <div className="px-4 md:px-6 space-y-8">
              {aiImageUrl && (
                  <div className="space-y-2">
                      <Label>{t('form.aiImage.label')}</Label>
                      <div className="relative w-40 h-40 rounded-md overflow-hidden border">
                      <Image src={aiImageUrl} alt={t('form.aiImage.alt')} fill sizes="160px" className="object-cover" />
                      <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={clearAiImage}
                          aria-label={t('form.photo.remove')}
                      >
                          <X aria-hidden="true" className="h-4 w-4" />
                      </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('form.aiImage.description')}</p>
                  </div>
              )}

              <div className="space-y-2">
              <Label htmlFor='description' className="text-lg font-semibold">{t('form.description.label')}</Label>
              <Textarea id='description' {...register("description")} rows={5} placeholder={t('form.description.placeholder')} aria-invalid={!!errors.description} aria-describedby={errors.description ? 'description-help order-description-error' : 'description-help'} />
              <p id="description-help" className="text-sm text-muted-foreground">{t('form.description.description')}</p>
              {errors.description && <p id="order-description-error" role="alert" className="text-sm font-medium text-destructive">{errors.description.message}</p>}
              </div>
              
              <div className="space-y-2">
              <Label htmlFor="photo" className="cursor-pointer inline-block w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  {t('form.photo.label')}
              </Label>
              <Input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="sr-only peer"
                  aria-invalid={!!errors.photo}
                  aria-describedby={errors.photo ? 'photo-error' : undefined}
                  {...photoRegister}
                  ref={(e) => {
                    photoRegisterRef(e);
                    fileInputRef.current = e;
                  }}
              />
              <p className="text-sm text-muted-foreground">{t('form.photo.description')}</p>
              {displayPhoto && (
                  <div className="mt-4 space-y-2">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                      <Image src={URL.createObjectURL(displayPhoto)} alt={t('form.photo.previewAlt')} fill sizes="96px" className="object-cover" />
                      <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={removePhoto}
                      aria-label={t('form.photo.remove')}
                      >
                      <X aria-hidden="true" className="h-4 w-4" />
                      </Button>
                  </div>
                  </div>
              )}
              {errors.photo && <p id="photo-error" role="alert" className="text-sm font-medium text-destructive">{errors.photo.message as string}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t">
              <div className="space-y-2">
                  <Label htmlFor="name">{t('form.name.label')}</Label>
                  <Input id="name" required autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'order-name-error' : undefined} placeholder={t('form.name.placeholder')} {...register("name")} />
                  {errors.name && <p id="order-name-error" role="alert" className="text-sm font-medium text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email.label')}</Label>
                  <Input id="email" type="email" required autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'order-email-error' : undefined} placeholder={t('form.email.placeholder')} {...register("email")} />
                  {errors.email && <p id="order-email-error" role="alert" className="text-sm font-medium text-destructive">{errors.email.message}</p>}
              </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg py-6" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : t('form.submit')}
              </Button>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}


export function OrderForm() {
  const { t } = useTranslation('customJewel');
  return (
    // Fallback accessibile: skeleton animate-pulse + testo tradotto per
    // screen reader, stesso pattern della pagina /contact (coerenza UX/a11y).
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
      <OrderFormClient />
    </Suspense>
  )
}
