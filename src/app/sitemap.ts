import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/gallery',
    '/services',
    '/contact',
    '/orders',
    '/custom-jewel',
    '/custom-jewel/order-form',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
