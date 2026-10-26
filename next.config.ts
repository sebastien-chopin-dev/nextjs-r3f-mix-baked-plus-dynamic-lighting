import type { NextConfig } from "next";

// GitHub Pages serves the site under /<repo>/. The Pages workflow sets PAGES_BASE_PATH;
// locally it is empty, so `npm run dev` stays at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // The image optimizer needs a server; a static export serves files as they are.
  images: { unoptimized: true },
  // No cacheComponents / partialPrefetching: they enable PPR, which a static export rejects.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
