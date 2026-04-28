/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabasePattern = [];

if (supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl);
    supabasePattern = [
      {
        protocol: "https",
        hostname,
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch (_) {
    // Ignore invalid NEXT_PUBLIC_SUPABASE_URL and keep existing image hosts.
  }
}

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
      ...supabasePattern,
    ],
  },
};

module.exports = nextConfig;
