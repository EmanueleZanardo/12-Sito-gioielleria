'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Share2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

type ShareDialogProps = ButtonProps & {
  className?: string;
};

export function ShareDialog({ className, size = 'icon', ...props }: ShareDialogProps) {
  const { t } = useTranslation('common');
  const { toast } = useToast();
  const [storeUrl, setStoreUrl] = useState('');

  useEffect(() => {
    setStoreUrl(window.location.origin);
  }, []);

  const shareText = t('share.text', { url: storeUrl });

  const shareOptions = [
    {
      name: 'WhatsApp',
      Icon: WhatsAppIcon,
      url: `https://wa.me/393451114337?text=${encodeURIComponent(shareText)}`,
      color: 'text-foreground',
    },
    {
      name: 'Instagram',
      Icon: InstagramIcon,
      url: 'https://www.instagram.com/gdc_jewellery_lab',
      color: 'text-foreground',
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(storeUrl).then(() => {
      toast({
        title: t('share.toast.copied'),
        description: t('share.toast.linkCopied'),
      });
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
            title: t('share.toast.error'),
            description: t('share.toast.copyFailed'),
            variant: 'destructive',
          });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={size} className={cn("backdrop-blur-sm", className)} {...props}>
          <Share2 aria-hidden="true" />
          <span className="sr-only">{t('share.button')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('share.title')}</DialogTitle>
          <DialogDescription>
            {t('share.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <Input id="link" defaultValue={storeUrl} readOnly onFocus={(e) => e.target.select()} />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">{t('share.copy')}</span>
            <Copy aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {shareOptions.map((option) => (
            <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center space-y-2 p-3 rounded-lg transition-colors hover:bg-secondary ${option.color}`}
            >
                <option.Icon aria-hidden="true" className="h-8 w-8" />
                <span className="text-xs font-medium text-foreground">{option.name}</span>
            </a>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
