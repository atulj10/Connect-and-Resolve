export interface UploadResult {
  publicId: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface UploadContext {
  referenceNumber?: string;
  applicationId?: string;
}

export interface StorageProvider {
  upload(filePath: string, fileName: string, context?: UploadContext): Promise<UploadResult>;
  delete(publicId: string): Promise<void>;
}
