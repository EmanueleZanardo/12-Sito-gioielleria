import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

// Statico e aggiornato manualmente ogni volta che il copy delle pagine cambia:
// ultimo aggiornamento copy galleria (descrizioni + nome gruppo) il 2026-10-01.
const LAST_MODIFIED = '2026-10-01';

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
