/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  poweredByHeader: false, // non esporre X-Powered-By: Next.js (igiene di sicurezza)
  images: {
    // AVIF/WebP negoziati via Accept header: meno peso sulle gallery, zero
    // cambio di design (il browser sceglie il formato migliore supportato).
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/#gallery',
        permanent: true,
      },
      // QA 03/10: /collections/anelli, /collections/collane-e-pendenti e
      // /collections/fedi rispondevano 404 — reindirizza alle ancore di
      // categoria nella pagina /collections (le ancore esistono negli article).
      {
        source: '/collections/anelli',
        destination: '/collections#anelli',
        permanent: true,
      },
      {
        source: '/collections/collane-e-pendenti',
        destination: '/collections#collane-e-pendenti',
        permanent: true,
      },
      {
        source: '/collections/fedi',
        destination: '/collections#fedi',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // QA 13/10 02:36 (miglioria ciclo): rimosso l'header HTTP
          // `Link: <https://i.postimg.cc>; rel=preconnect, ...; rel=dns-prefetch`.
          // Il browser NON si connette mai direttamente a i.postimg.cc: TUTTE
          // le <img> passano per il proxy same-origin /_next/image (verificato
          // nel prerenderizzato: 329 ref /_next/image, zero <img src> diretti,
          // zero url() nel CSS, zero fetch() nei chunk client). I riferimenti
          // diretti a i.postimg.cc esistono solo nei blocchi JSON-LD ImageObject
          // (dati per i crawler, il browser non li scarica) e nei meta og:image
          // (scaricati dai crawler social, non dal browser). Il preconnect HTTP
          // faceva quindi aprire al browser connessioni DNS+TCP+TLS inutili a
          // ogni pagina. Completa la pulizia dei cicli 00:36/01:36 (rimossi i
          // tag <link> HTML dns-prefetch e preconnect, ormai morti). Zero cambi
          // funzionali/visivi; header rimossi verificati via curl post-deploy.
          // Baseline sicurezza OWASP: zero rischio di rottura, niente CSP (troppo
          // invasiva senza test visivo completo: Next inline scripts/styles, font, postimg).
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // SAMEORIGIN (non DENY): blocca il clickjacking esterno ma lascia aperta
          // la porta a eventuali embed same-origin futuri (es. anteprime interne).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Permissions-Policy: il sito non usa mai camera/microfono/geolocalizzazione
          // (l'upload foto del form contatti è un <input type="file">, non getUserMedia:
          // il file picker nativo non è governato da questo header e continua a funzionare).
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;