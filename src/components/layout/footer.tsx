'use client';

import Link from "next/link";
import { Instagram } from "lucide-react";
import Image from 'next/image';
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const { t } = useTranslation('common');

  const navLinks = [
    { href: "/#gallery", label: t('nav.gallery') },
    { href: "/custom-jewel", label: t('nav.createJewel') },
    { href: "/services", label: t('nav.services') },
    { href: "/about", label: t('nav.about') },
    { href: "/orders", label: t('nav.orders') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt={t('footer.logoAlt')} width={186} height={75} className="object-contain" />
          </Link>
          <p className="max-w-md text-muted-foreground">
            {t('footer.tagline')}
          </p>
          <div className="flex justify-center space-x-6 my-6">
            <Link href="https://www.instagram.com/gdc_jewellery_lab?igsh=MWY1azQ2ejRwODN2Mg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/60 hover:text-primary">
              <Instagram aria-hidden="true" className="h-6 w-6" />
              <span>@gdc_jewellery_lab</span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center -mx-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="mx-4 text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <hr className="my-6 border-border" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GDC Jewellery Lab. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
