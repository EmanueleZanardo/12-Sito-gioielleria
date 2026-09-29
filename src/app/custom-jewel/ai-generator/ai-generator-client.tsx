'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { generateJewelryDesignImages } from '@/ai/flows/generate-jewelry-design-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, FileText } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function AIGeneratorClient() {
  const { t } = useTranslation('customJewel');
  const [imageGenPrompt, setImageGenPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!imageGenPrompt) {
      toast({
        title: t('imageGenerator.error.title'),
        description: t('imageGenerator.error.description'),
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const response = await generateJewelryDesignImages({ description: imageGenPrompt });
      setGeneratedImage(response.imageUrl);
    } catch (error) {
      console.error('AI image generation failed:', error);
      toast({
        title: t('imageGenerator.error.apiTitle'),
        description: t('imageGenerator.error.apiDescription'),
        variant: 'destructive',
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Sparkles className="text-primary" />
            {t('imageGenerator.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('imageGenerator.description')}</p>
          <Textarea
            placeholder={t('imageGenerator.placeholder')}
            value={imageGenPrompt}
            onChange={(e) => setImageGenPrompt(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={handleGenerateImage} disabled={isGenerating} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isGenerating ? <Loader2 className="animate-spin" /> : t('imageGenerator.button')}
          </Button>
        </CardContent>
      </Card>

      {isGenerating && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {generatedImage && (
        <Card className="bg-card/50 animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{t('imageGenerator.generatedImageTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image src={generatedImage} alt={t('imageGenerator.generatedImageAlt')} fill className="object-cover" />
            </div>
             <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={`/custom-jewel/order-form?imageUrl=${encodeURIComponent(generatedImage)}&prompt=${encodeURIComponent(imageGenPrompt)}`}>
                <FileText className="mr-2 h-4 w-4" />
                {t('imageGenerator.orderButton')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
