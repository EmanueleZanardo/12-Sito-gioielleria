import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';
import { ShareDialog } from '@/components/share/share-dialog';

export const metadata: Metadata = {
  metadataBase: new URL('https://gdc-jewellery-lab.vercel.app'),
  title: {
    default: 'GDC | Jewellery Lab',
    template: '%s | GDC Jewellery Lab',
  },
  description: 'Handcrafted jewelry with a touch of elegance. Custom jewel design, gallery and atelier services by GDC Jewellery Lab.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GDC | Jewellery Lab',
    description: 'Handcrafted jewelry with a touch of elegance.',
    url: 'https://gdc-jewellery-lab.vercel.app',
    siteName: 'GDC Jewellery Lab',
    type: 'website',
    locale: 'it_IT',
    images: [
      {
        url: 'https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png',
        width: 606,
        height: 412,
        alt: 'GDC Jewellery Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDC | Jewellery Lab',
    description: 'Handcrafted jewelry with a touch of elegance.',
    images: ['https://i.postimg.cc/Zqh2P1Cw/Gemini-Generated-Image-9gxeth9gjhvihvixeth9gxe-removebg-preview-(1).png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <div className="fixed bottom-6 right-6 z-50">
                <ShareDialog size="lg" className="rounded-full h-14 w-14 shadow-lg" />
            </div>
            <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
