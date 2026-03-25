import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
