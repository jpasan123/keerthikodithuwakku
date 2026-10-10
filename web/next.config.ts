import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: AVIF encoding is slow and memory-hungry on the shared server (and once left an empty cache
    // file that crashed the optimizer on every restart). WebP is ~15% larger but encodes several times faster.
    formats: ["image/webp"],
    // Include 2048/2560 so full-bleed mobile heroes stay sharp on retina phones
    // (cover crop needs a wider source than the CSS viewport width alone).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
