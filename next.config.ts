import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Next guess the wrong root.
  turbopack: { root: __dirname },

  images: {
    // Catalogue photography is still served from the legacy Raasch host.
    remotePatterns: [
      { protocol: "https", hostname: "www.raasch.com.br", pathname: "/admin/**" },
      { protocol: "https", hostname: "raasch.com.br", pathname: "/admin/**" },
    ],
    // Next 16 ships [75] by default; the extra step keeps hero art crisp.
    qualities: [70, 75, 90],
    // Next 16 defaults to 4h. The catalogue art gets swapped by hand, and a
    // stale card for half a day is worse here than the extra revalidation.
    minimumCacheTTL: 300,
  },
};

export default nextConfig;
