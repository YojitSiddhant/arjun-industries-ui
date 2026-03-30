import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
      {
        pathname: "/gallery/**",
      },
      {
        pathname: "/hero/**",
      },
    ],
  },
};

export default nextConfig;
