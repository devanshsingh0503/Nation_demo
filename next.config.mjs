/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/media-cdn/:path*',
        destination: 'https://outredge.b-cdn.net/:path*',
      },
    ]
  },
};

export default nextConfig;
