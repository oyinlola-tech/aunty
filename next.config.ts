import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Only local, project-owned assets are used (e.g. the photo-coming-soon
    // placeholder). Required so next/image can serve static SVGs.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
