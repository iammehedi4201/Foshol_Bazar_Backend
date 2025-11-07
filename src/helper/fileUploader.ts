import fs from "fs";
import path from "path";
import cloudinary from "@/config/cloudinary.config";
import multer, { StorageEngine } from "multer";

// Create uploads directory if missing
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ⚙️ Multer storage setup
const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

// 📦 Multer instance with filters
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Invalid file type. Only JPG, PNG, WEBP are allowed."));
    } else {
      cb(null, true);
    }
  },
});

// ☁️ Upload to Cloudinary
export const uploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "foshol-bazar",
      resource_type: "image",
    });

    // Delete local file after upload
    fs.unlinkSync(file.path);
    return result;
  } catch (error) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    throw error;
  }
};

export const fileUploader = { upload, uploadToCloudinary };
