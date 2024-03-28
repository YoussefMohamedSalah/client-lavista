/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.ap-south-1.amazonaws.com",
      "api.cp-portal.com/lav/api/uploads"
    ]
  }
};

module.exports = nextConfig;
