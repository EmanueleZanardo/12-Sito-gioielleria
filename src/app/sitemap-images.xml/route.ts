import { orderedProducts } from '@/lib/data';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

// Sitemap immagini (Google image sitemap extension): elenca le foto dei gioielli
// mostrate nella galleria della homepage, con caption dalle descrizioni prodotto.
// Generata automaticamente da src/lib/data.ts — nessun aggiornamento manuale.
export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<Response> {
  const seen = new Set<string>();
  const imagesXml = orderedProducts
    .filter((p) => {
      if (seen.has(p.imageUrl)) return false;
      seen.add(p.imageUrl);
      return true;
    })
    .map(
      (p) =>
        `    <image:image>\n` +
        `      <image:loc>${escapeXml(p.imageUrl)}</image:loc>\n` +
        `      <image:caption>${escapeXml(p.description)}</image:caption>\n` +
        `    </image:image>`,
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `  <url>\n` +
    `    <loc>${BASE_URL}</loc>\n` +
    `${imagesXml}\n` +
    `  </url>\n` +
    `</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
