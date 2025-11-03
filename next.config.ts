import type { NextConfig } from "next";
// next-pwa has no bundled types; require and cast to any to avoid TS error
// @ts-ignore: no types for next-pwa
const withPWA = require("next-pwa") as (config?: any) => any;

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Remote images from Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eazjdepovuobgwyaytkz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Disable Turbopack to avoid build errors
  turbopack: {},
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
