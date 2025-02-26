/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // if (process.env.NODE_ENV !== 'production') {
    //   return [];
    // };

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
