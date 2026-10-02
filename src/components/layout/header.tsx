"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Instagram, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation('common');
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth' });
    } else if (pathname !== '/') {
        router.push('/#gallery');
    }
  };

  const navLinks = [
    { href: "/", label: t('nav.home'), id: "home" },
    { href: "/#gallery", label: t('nav.gallery'), id: "gallery", onClick: handleGalleryClick },
    { href: "/custom-jewel", label: t('nav.createJewel'), id: "custom-jewel" },
    { href: "/services", label: t('nav.services'), id: "services" },
    { href: "/about", label: t('nav.about'), id: "about" },
    { href: "/contact", label: t('nav.contact'), id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (window.location.hash === '#gallery') {
      const galleryElement = document.getElementById('gallery');
      if (galleryElement) {
        // Use a timeout to ensure the page has rendered
        setTimeout(() => {
          galleryElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (pathname === '/') {
        if (link.href.startsWith('/#')) {
            return false;
        }
        return link.id === 'home';
    }
    if (link.id !== 'home' && link.id !== 'gallery') {
       return pathname.startsWith(link.href);
    }
    return false;
  };
  

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent border-transparent"
    )}>
      <div className="container flex h-20 items-center">
        <div className="flex-1 flex justify-start pl-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt="GDC Jewellery Lab Logo" width={160} height={64} className="object-contain" />
            </Link>
        </div>
        
        <nav className="hidden md:flex items-center justify-center space-x-6 text-sm font-medium font-nav ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                  if (link.onClick) {
                      link.onClick(e);
                  }
              }}
              aria-current={isLinkActive(link) ? "page" : undefined}
              className={cn(
                "transition-colors hover:text-primary",
                isLinkActive(link) ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex-1 flex justify-end items-center gap-2 pr-12">
            <div className="hidden md:flex items-center space-x-4">
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" size="sm" aria-label={t('nav.language')} className="flex items-center gap-1 text-sm bg-transparent border-none">
                    {language.toUpperCase()}
                    <ChevronDown aria-hidden="true" className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setLanguage("it")}>
                    IT
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage("en")}>
                    EN
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage("fr")}>
                    FR
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage("de")}>
                    DE
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href="https://www.instagram.com/gdc_jewellery_lab?igsh=MWY1azQ2ejRwODN2Mg==" aria-label={t('nav.instagram')} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary">
                <Instagram aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>

            <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
                        <Menu aria-hidden="true" className="h-6 w-6" />
                        <span className="sr-only">{t('nav.openMenu')}</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full" id="mobile-menu">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="p-4 border-b">
                          <SheetTitle className="sr-only">{t('nav.mainMenu')}</SheetTitle>
                            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                                 <Image src="https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png" alt="GDC Jewellery Lab Logo" width={160} height={64} className="object-contain" />
                            </Link>
                        </SheetHeader>
                        <nav className="flex-grow mt-6">
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                href={link.href}
                                onClick={(e) => {
                                  if(link.onClick) {
                                      link.onClick(e as any);
                                  }
                                  setIsMobileMenuOpen(false);
                                }}
                                aria-current={isLinkActive(link) ? "page" : undefined}
                                className={cn(
                                    "text-xl font-medium font-nav transition-colors hover:text-primary pl-4",
                                    isLinkActive(link) ? "text-primary" : "text-foreground/80"
                                )}
                                >
                                {link.label}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </nav>
                         <div className="flex items-center justify-center space-x-6 p-6 border-t">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" aria-label={t('nav.language')} className="flex items-center gap-2 text-lg">
                                  {language.toUpperCase()}
                                  <ChevronDown aria-hidden="true" className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => {setLanguage("it"); setIsMobileMenuOpen(false);}}>
                                  IT
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => {setLanguage("en"); setIsMobileMenuOpen(false);}}>
                                  EN
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => {setLanguage("fr"); setIsMobileMenuOpen(false);}}>
                                  FR
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => {setLanguage("de"); setIsMobileMenuOpen(false);}}>
                                  DE
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <a href="https://www.instagram.com/gdc_jewellery_lab?igsh=MWY1azQ2ejRwODN2Mg==" aria-label={t('nav.instagram')} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary">
                                <Instagram aria-hidden="true" className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
