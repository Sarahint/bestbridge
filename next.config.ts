import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Hide the Next.js version, gzip responses by default.
  // Cloudflare Workers runtime applies compression at the edge, but enabling
  // here doesn't hurt for any non-Cloudflare deployments (e.g. local `next start`).
  poweredByHeader: false,
  compress: true,

  // `next/image` optimizer requires Node APIs that aren't available on the
  // Workers runtime. Cloudflare provides its own image optimization via the
  // `cf-image` service (paid) or we can rely on the source image directly.
  // For this site (small images, well-sized at source) `unoptimized` is fine.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

// Surface Cloudflare bindings (env vars, KV, R2, etc.) to `process.env`-like
// access during local `next dev`. No-op in production where OpenNext handles it.
// Wrapped in dynamic import so it only loads at dev time, not in the worker bundle.
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}
