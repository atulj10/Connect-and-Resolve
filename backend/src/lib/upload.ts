import multer from "multer";
import os from "node:os";

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIMES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const upload = multer({
  dest: os.tmpdir(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (_req, file, cb) => {
    const normalized = file.mimetype.toLowerCase();
    if (normalized === "image/jpg") {
      file.mimetype = "image/jpeg";
    }
    if (ALLOWED_MIMES.includes(normalized)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Allowed types: pdf, png, jpg, jpeg, doc, docx`));
    }
  },
});

export { upload, MAX_SIZE, ALLOWED_MIMES };
