'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


export default function CustomJewelSelectionPage() {
  const { t } = useTranslation('customJewel');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/custom-jewel/order-form">
             <Card className="bg-card h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer group">
              <CardHeader className="items-center text-center p-8">
                 <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">{t('selection.orderForm.title')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {t('selection.orderForm.description')}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <div className={cn(
              "relative",
              "opacity-50 cursor-not-allowed"
            )}>
            <Card className="bg-card h-full group">
              <CardHeader className="items-center text-center p-8">
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">{t('selection.aiGenerator.title')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {t('selection.aiGenerator.description')}
                </CardDescription>
              </CardHeader>
            </Card>
            <Badge variant="default" className="absolute -top-3 -right-3">
              {t('selection.comingSoon')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
