/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
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
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            // Tutte le immagini del sito arrivano da i.postimg.cc: preconnect riduce la latenza di caricamento.
            value: '<https://i.postimg.cc>; rel=preconnect, <https://i.postimg.cc>; rel=dns-prefetch',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;