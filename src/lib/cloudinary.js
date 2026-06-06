// src\lib\cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image buffer to Cloudinary.
 * All Foodies images go into the "foodies" folder to stay isolated
 * from other projects on the same Cloudinary account.
 *
 * Returns the secure URL of the uploaded image.
 */

async function uploadToCloudinary(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "foodies",
    public_id: publicId,
    overwrite: false,
  });
  return result.secure_url;
}


export async function uploadImage(buffer, fileName) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "foodies",
        public_id: fileName,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
    // Write the buffer to the upload stream
    // This is necessary because Cloudinary's Node.js SDK doesn't support direct buffer uploads,
    // but it can read from a stream.
    uploadStream.end(buffer);
  });
}
