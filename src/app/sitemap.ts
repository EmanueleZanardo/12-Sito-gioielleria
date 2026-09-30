import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

// Statico e aggiornato a ogni release SEO: non usare new Date() in build,
// altrimenti ogni deploy produce una sitemap "nuova" senza cambiamenti reali.
const LAST_MODIFIED = '2026-09-30';

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
  { path: '/custom-jewel/order-form', changeFrequency: 'yearly', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
