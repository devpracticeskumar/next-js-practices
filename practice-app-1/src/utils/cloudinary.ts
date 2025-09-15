import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadImage(fileBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'menu_items' },
      (error, result) => {
        if (error || !result) {
          console.error('Cloudinary upload error:', error);
          return reject(new Error('Cloudinary upload failed'));
        }
        resolve(result.secure_url);
      },
    );

    uploadStream.write(fileBuffer);
    uploadStream.end();
  });
}
