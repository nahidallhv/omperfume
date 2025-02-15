import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          }
        ],
      }
    ]
  }
};

export default nextConfig;

module.exports = {
  images: {
    domains: ['localhost', 'lajdomsjwkmvgjprkouk.supabase.co', 'omperfume.az'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
};





