import type { StorageProvider, UploadResult } from "./storage.provider.js";
export declare class CloudinaryProvider implements StorageProvider {
    private ready;
    constructor();
    upload(filePath: string, fileName: string): Promise<UploadResult>;
    delete(publicId: string): Promise<void>;
    private logFallback;
    private mockResult;
}
//# sourceMappingURL=cloudinary.provider.d.ts.map