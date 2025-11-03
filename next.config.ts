import type { NextConfig } from "next";
// @ts-ignore: no declaration file for 'next-pwa'
import withPWA from "next-pwa";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eazjdepovuobgwyaytkz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

// Wrap with PWA
export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
