import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

      const pathParts = req.path.split("/");
      const isAvatar = pathParts.includes('avatar'); // Assuming the URL is /users/:id/avatar
      const pathPrefix = isAvatar ? "avatars" : "documents";

    cb(null, `uploads/${pathPrefix}`);
  },
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(10).toString("hex");
    const ext = path.extname(file.originalname);
    cb(null, `${hash}${ext}`);
  },
});

export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});