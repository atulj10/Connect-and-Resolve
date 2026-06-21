import "dotenv/config";
import path from "node:path";

const rawPort = process.env.PORT || "4000";

export const env = {
  // Gracefully handles Hostinger named pipes/sockets, numeric strings, and local fallbacks
  port: isNaN(Number(rawPort)) ? rawPort : parseInt(rawPort, 10),
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_AUTH_TOKEN || "",
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
  },
  admin: {
    name: process.env.ADMIN_NAME || "Rajeev Menon",
    email: process.env.ADMIN_EMAIL || "rajeev.menon@minister.gov.in",
    password: process.env.ADMIN_PASSWORD || "admin@123",
  },
  brevo: {
    apiKey: process.env.BREVO_API_KEY || "",
    from: process.env.EMAIL_FROM || "",
  },
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.EMAIL_FROM || "",
  },
  storage: {
    provider: (process.env.STORAGE_PROVIDER || "cloudinary") as "local" | "cloudinary",
    uploadDir: path.resolve(process.env.UPLOAD_DIR || "./uploads"),
    baseUrl: process.env.UPLOAD_BASE_URL || `http://localhost:${process.env.PORT || "4000"}`,
  },
} as const;
