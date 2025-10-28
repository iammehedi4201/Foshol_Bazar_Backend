import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import type { Express } from "express";
import multer from "multer";

// ⚙️ Use environment variables (recommended)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 📁 Configure Multer storage
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

// ☁️ Upload to Cloudinary
const uploadToCloudinary = async (
  file: Express.Multer.File,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      function (error, result) {
        // 🧹 Always remove local file
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result as Record<string, unknown>);
        }
      },
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
