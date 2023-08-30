/** @type {import('next').NextConfig} */
const nextConfig = {
  // rewrites: async () => [
  //   {
  //     source: "/:path*",
  //     destination: "http://workstation.zav:3001/:path*",
  //   },
  // ],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
