import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  static async uploadImage(filePath: string) {
    return cloudinary.uploader.upload(filePath, {
      folder: "cars_platform",
    });
  }

  static async deleteImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}