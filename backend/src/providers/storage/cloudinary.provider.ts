import { v2 as cloudinary } from "cloudinary";
import type { StorageProvider, UploadResult, UploadContext } from "./storage.provider.js";
import { env } from "../../config/env.js";
import fs from "node:fs";

export class CloudinaryProvider implements StorageProvider {
  private ready = false;

  constructor() {
    if (env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret) {
      cloudinary.config({
        cloud_name: env.cloudinary.cloudName,
        api_key: env.cloudinary.apiKey,
        api_secret: env.cloudinary.apiSecret,
      });
      this.ready = true;
    }
  }

  async upload(filePath: string, fileName: string, _context?: UploadContext): Promise<UploadResult> {
    if (!this.ready) {
      this.logFallback("upload", fileName);
      return this.mockResult(fileName);
    }
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      public_id: `connect-resolve/${Date.now()}-${fileName}`,
    });
    return {
      publicId: result.public_id,
      url: result.secure_url,
      fileName,
      mimeType: result.resource_type === "image" ? `image/${result.format}` : "application/pdf",
      size: result.bytes,
    };
  }

  async delete(publicId: string): Promise<void> {
    if (!this.ready) {
      this.logFallback("delete", publicId);
      return;
    }
    await cloudinary.uploader.destroy(publicId);
  }

  private logFallback(action: string, name: string) {
    console.log(`[Cloudinary] Mock ${action}: ${name} (set CLOUDINARY_* env vars to use real uploads)`);
  }

  private mockResult(fileName: string): UploadResult {
    const isPdf = fileName.toLowerCase().endsWith(".pdf");
    return {
      publicId: `mock/${fileName}`,
      url: `https://via.placeholder.com/150?text=${encodeURIComponent(fileName)}`,
      fileName,
      mimeType: isPdf ? "application/pdf" : "image/jpeg",
      size: 1024 * 512,
    };
  }
}
