/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.jsの設定をここに追加する
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/[...nextauth]',
      },
    ];
  },
};

export default nextConfig;
