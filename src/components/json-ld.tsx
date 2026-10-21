// Helper per i dati strutturati JSON-LD (SEO).
// Renderizza uno <script type="application/ld+json"> — i crawler lo
// leggono anche quando è nel body (componenti client).
// Uso: <JsonLd data={{ '@context': 'https://schema.org', ... }} />
// QA 09/10/2026 23:36 (miglioria ciclo): escape di `<` come \u003c nel JSON
// serializzato — se un copy futuro contenesse "</script>" (o tag HTML nei
// nomi/descrizioni dei prodotti), il blocco JSON-LD non si romperebbe e non
// si aprirebbe a iniezioni. Pratica standard per i dati strutturati inline.
// QA 10/10/2026 06:36: esportato come serializzatore condiviso — tutti i
// blocchi JSON-LD inline del sito (anche quelli fuori da questo helper)
// devono passare di qui.
export function serializeJsonLd(
  data: Record<string, unknown> | Array<Record<string, unknown>>
): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}) {
  const safeJson = serializeJsonLd(data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
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
