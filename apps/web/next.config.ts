import "@flamingo/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: "standalone",
  transpilePackages: ["@flamingo/api", "@flamingo/auth", "@flamingo/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  cacheComponents: true,
  serverExternalPackages: ["pg"],
};

export default nextConfig;
