/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
    ]
  }
};

export default nextConfig;
