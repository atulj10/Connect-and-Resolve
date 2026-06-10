export interface UploadResult {
    publicId: string;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
}
export interface StorageProvider {
    upload(filePath: string, fileName: string): Promise<UploadResult>;
    delete(publicId: string): Promise<void>;
}
//# sourceMappingURL=storage.provider.d.ts.map