import { orderedProducts } from '@/lib/data';
import heroImage from '@/lib/hero-image.json';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

// Sitemap immagini (Google image sitemap extension): elenca le foto dei gioielli
// mostrate nella galleria della homepage, con caption dalle descrizioni prodotto.
// Generata automaticamente da src/lib/data.ts — nessun aggiornamento manuale.
//
// QA 04/10 01:36: prima elencava SOLO le foto prodotto della galleria. Aggiunte
// anche l'immagine hero della homepage (la foto più prominente del sito, prima
// assente) sotto la <url> '/' e la foto "artigiano" di /about sotto la <url>
// '/about' — ogni immagine sotto la pagina in cui appare, come da linee guida
// Google. Logo e icone del form ordine esclusi: non sono contenuti indicizzabili.
export const dynamic = 'force-static';

// Caption = testi alt in italiano (lingua di default del sito): hero.alt e
// about.artisanAlt da src/locales/it.json.
const HERO_IMAGE = {
  loc: heroImage.imageUrl,
  caption: 'Sfondo laboratorio orafo — GDC Jewellery Lab',
};

const ABOUT_IMAGE = {
  loc: 'https://i.postimg.cc/LXdq3QbJ/su-misura.jpg',
  caption: 'Artigiano al lavoro — laboratorio GDC Jewellery Lab',
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function imageXml(loc: string, caption: string): string {
  return (
    `    <image:image>\n` +
    `      <image:loc>${escapeXml(loc)}</image:loc>\n` +
    `      <image:caption>${escapeXml(caption)}</image:caption>\n` +
    `    </image:image>`
  );
}

export async function GET(): Promise<Response> {
  const seen = new Set<string>();
  const productImagesXml = orderedProducts
    .filter((p) => {
      if (seen.has(p.imageUrl)) return false;
      seen.add(p.imageUrl);
      return true;
    })
    .map((p) => imageXml(p.imageUrl, p.description))
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `  <url>\n` +
    `    <loc>${BASE_URL}</loc>\n` +
    `${imageXml(HERO_IMAGE.loc, HERO_IMAGE.caption)}\n` +
    `${productImagesXml}\n` +
    `  </url>\n` +
    `  <url>\n` +
    `    <loc>${BASE_URL}/about</loc>\n` +
    `${imageXml(ABOUT_IMAGE.loc, ABOUT_IMAGE.caption)}\n` +
    `  </url>\n` +
    `</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
