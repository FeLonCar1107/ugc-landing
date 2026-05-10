/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /**
     * In `next dev`, the image optimizer fetches remote URLs server-side. On some
     * Windows setups (corporate proxy, TLS inspection, incomplete Node CA store)
     * that fetch fails with UNABLE_TO_VERIFY_LEAF_SIGNATURE. Serving images
     * unoptimized locally avoids those requests; production builds still optimize.
     * Override: NEXT_IMAGE_FORCE_OPTIMIZE=1 npm run dev
     */
    unoptimized:
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_IMAGE_FORCE_OPTIMIZE !== "1",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
