/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    };
    
    return [
      {
        source: '/blog',
        destination: 'https://blog.sorakang.io',
        permanent: true,
      },
    ];
  },
};



export default nextConfig;
