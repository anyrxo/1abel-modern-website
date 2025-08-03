/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Headers disabled due to output: 'export' - not compatible with static generation
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff'
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY'
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block'
  //         }
  //       ],
  //     }
  //   ]
  // }
};

module.exports = nextConfig