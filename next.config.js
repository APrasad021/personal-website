/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/books",
        destination: "/books/currently-reading",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
