// Helper per i dati strutturati JSON-LD (SEO).
// Renderizza uno <script type="application/ld+json"> — i crawler lo
// leggono anche quando è nel body (componenti client).
// Uso: <JsonLd data={{ '@context': 'https://schema.org', ... }} />
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Costruisce un BreadcrumbList schema.org da una lista di [nome, url]. */
export function breadcrumbList(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const SITE_URL = 'https://gdc-jewellery-lab.vercel.app';
