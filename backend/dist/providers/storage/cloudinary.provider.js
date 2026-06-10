import { v2 as cloudinary } from "cloudinary";
import { env } from "../../config/env.js";
export class CloudinaryProvider {
    ready = false;
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
    async upload(filePath, fileName) {
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
    async delete(publicId) {
        if (!this.ready) {
            this.logFallback("delete", publicId);
            return;
        }
        await cloudinary.uploader.destroy(publicId);
    }
    logFallback(action, name) {
        console.log(`[Cloudinary] Mock ${action}: ${name} (set CLOUDINARY_* env vars to use real uploads)`);
    }
    mockResult(fileName) {
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
//# sourceMappingURL=cloudinary.provider.js.map