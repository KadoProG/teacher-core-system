/** @type {import('next').NextConfig} */

import withPWAInit from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const withPWA = withPWAInit({
  dest: 'public',
  runtimeCaching,
  // 現状この設定を追加しないとエラーになってしまうので追加
  // 参考: https://github.com/shadowwalker/next-pwa/issues/288
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  // Next.jsの設定をここに追加する
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/[...nextauth]',
      },
    ];
  },
});

export default nextConfig;
