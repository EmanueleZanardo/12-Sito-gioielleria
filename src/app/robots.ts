import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gdc-jewellery-lab.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap-images.xml`],
  };
}
