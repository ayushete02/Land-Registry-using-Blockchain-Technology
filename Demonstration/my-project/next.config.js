/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  nextConfig,
  images: {
    "loader": "akamai",
    "path": ""
  },
  trailingSlash: true,
  assetPrefix: isProd ? "https://your-domain.com" : "",
}