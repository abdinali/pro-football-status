import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Place project-specific Next config here as it grows.
};

export default nextConfig;

// Hook the Cloudflare adapter into `next dev` so server code can read
// Cloudflare bindings (env, R2, etc.) via getCloudflareContext() during local dev.
// See: https://opennext.js.org/cloudflare/get-started
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
