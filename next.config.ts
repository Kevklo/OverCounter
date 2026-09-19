import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d15f34w2p8l1cc.cloudfront.net" },
    ],
    minimumCacheTTL: 31536000,
    maximumDiskCacheSize: 500_000_000, 
    formats: ["image/webp"],
  },
};

export default nextConfig;
