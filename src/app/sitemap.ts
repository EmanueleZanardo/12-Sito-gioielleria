import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

// QA 03/10 (miglioria ciclo): lastmod dinamico per route, calcolato in fase di
// build dall'mtime dei file che determinano il contenuto visibile della pagina
// (page.tsx/layout.tsx della route + copy condiviso). Niente più date statiche
// da aggiornare a mano — se cambia il copy, la sitemap lo riflette da sola.
// Nota: dopo un clone fresco tutti i file hanno l'mtime del clone; resta un
// valore onesto (data dell'ultimo deploy del contenuto).

// Copy condiviso: se cambiano, potenzialmente cambiano tutte le pagine.
const SHARED_COPY_FILES = [
  'src/locales/it.json',
  'src/locales/en.json',
  'src/locales/fr.json',
  'src/locales/de.json',
  'src/lib/data.ts',
];

function mtimeOrNull(p: string): number | null {
  try {
    return fs.statSync(p).mtimeMs;
  } catch {
    return null;
  }
}

function lastModifiedFor(routePath: string): Date {
  const seg = routePath.replace(/^\//, '');
  const appDir = path.join(process.cwd(), 'src', 'app');
  const candidates = [
    path.join(appDir, seg, 'page.tsx'),
    path.join(appDir, seg, 'layout.tsx'),
    ...SHARED_COPY_FILES.map((f) => path.join(process.cwd(), f)),
  ];
  let latest: number | null = null;
  for (const c of candidates) {
    const m = mtimeOrNull(c);
    if (m !== null && (latest === null || m > latest)) latest = m;
  }
  return new Date(latest ?? Date.now());
}

type RouteEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const ROUTES: RouteEntry[] = [
  { path: '', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/custom-jewel', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/orders', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/collections', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
  // /custom-jewel/order-form NON in sitemap: ha robots index:false (noindex)
  // — Google indicizza solo le pagine vetrina (miglioria SEO ciclo 03/10 09:36).
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: lastModifiedFor(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
