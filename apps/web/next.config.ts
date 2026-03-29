import "@flamingo/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: "standalone",
  transpilePackages: ["@flamingo/api", "@flamingo/db", "@flamingo/auth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  cacheComponents: true,
  experimental: {},
};

export default nextConfig;
