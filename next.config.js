/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.gr-assets.com", "s.gr-assets.com"],
  },
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
