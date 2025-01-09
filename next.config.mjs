/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://news-api.mainulhasan05.xyz",
    // API_URL: "http://localhost:5000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
