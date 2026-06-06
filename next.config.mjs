/** @type {import('next').NextConfig} */
/*
 * This script seeds the MongoDB database with dummy meal records.
 * Each meal has a title, summary, instructions, and an image.
 * The images are uploaded to Cloudinary, and the meal records
 * store the Cloudinary URL.
 *
 * Note: This script is meant to be run locally (e.g., `node -r dotenv/config initdb.js`)
 * and should never be run on Vercel or in production.
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Allow next/image to load images from Cloudinary.
        // All meal images (seed + user-uploaded) are stored there
        // under the "foodies" folder.
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
