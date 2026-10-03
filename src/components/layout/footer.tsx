'use client';

import Link from "next/link";
import { Instagram } from "lucide-react";
import Image from 'next/image';
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const { t } = useTranslation('common');

  const navLinks = [
    { href: "/#gallery", label: t('nav.gallery') },
    // QA 03/10: mancava il link alle collezioni nel footer (raggiungibili
    // solo dalle card in homepage).
    { href: "/collections", label: t('nav.collections') },
    { href: "/custom-jewel", label: t('nav.createJewel') },
    { href: "/services", label: t('nav.services') },
    { href: "/about", label: t('nav.about') },
    { href: "/orders", label: t('nav.orders') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <footer className="bg-[#0a0806] border-t border-gold/20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center space-x-2 mb-5">
            <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt={t('footer.logoAlt')} width={200} height={80} className="object-contain" />
          </Link>
          <div className="gold-divider !my-4" aria-hidden="true" />
          <p className="max-w-md font-headline text-xl italic text-ivory/85 lux-title">
            {t('footer.tagline')}
          </p>
          <div className="flex justify-center space-x-6 my-7">
            {/* QA 03/10 11:36: <a> nativo per URL esterno (era next/link):
                stesso motivo del fix in contact/page.tsx, pattern coerente
                con header.tsx. */}
            <a href="https://www.instagram.com/gdc_jewellery_lab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/60 hover:text-gold transition-colors">
              <Instagram aria-hidden="true" className="h-6 w-6" />
              <span className="tracking-wide">@gdc_jewellery_lab</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center -mx-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="mx-4 my-1 text-[13px] uppercase tracking-[0.14em] text-foreground/70 visited:text-foreground/70 hover:text-gold transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <hr className="my-8 border-gold/15" />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GDC Jewellery Lab. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
