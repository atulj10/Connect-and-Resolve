import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { StorageProvider, UploadResult, UploadContext } from "./storage.provider.js";
import { env } from "../../config/env.js";

export class LocalStorageProvider implements StorageProvider {
  async upload(
    filePath: string,
    fileName: string,
    context?: UploadContext,
  ): Promise<UploadResult> {
    const ref = context?.referenceNumber || "unknown";
    const now = new Date();
    const year = now.getFullYear().toString();

    const relativeDir = path.join("applications", year, ref);
    const targetDir = path.join(env.storage.uploadDir, relativeDir);
    await fs.mkdir(targetDir, { recursive: true });

    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .slice(0, 60);
    const uniqueName = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${baseName}${ext}`;
    const destPath = path.join(targetDir, uniqueName);

    const stat = await fs.stat(filePath);
    await fs.copyFile(filePath, destPath);
    await fs.unlink(filePath);

    const relativePath = path.join(relativeDir, uniqueName).replace(/\\/g, "/");
    const publicId = `local/${relativePath}`;
    const url = `${env.storage.baseUrl}/uploads/${relativePath}`;

    return {
      publicId,
      url,
      fileName,
      mimeType: this.getMimeType(ext),
      size: stat.size,
    };
  }

  async delete(publicId: string): Promise<void> {
    if (!publicId.startsWith("local/")) return;
    const relativePath = publicId.slice("local/".length);
    const absolutePath = path.join(env.storage.uploadDir, relativePath);
    await fs.unlink(absolutePath);
  }

  private getMimeType(ext: string): string {
    const map: Record<string, string> = {
      ".pdf": "application/pdf",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return map[ext.toLowerCase()] || "application/octet-stream";
  }
}
