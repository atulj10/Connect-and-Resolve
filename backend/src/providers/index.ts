import { CloudinaryProvider } from "./storage/cloudinary.provider.js";
import { LocalStorageProvider } from "./storage/local-storage.provider.js";
import { TwilioProvider } from "./sms/twilio.provider.js";
import { BrevoProvider } from "./email/brevo.provider.js";
import { env } from "../config/env.js";
import type { StorageProvider } from "./storage/storage.provider.js";
import type { SmsProvider } from "./sms/sms.provider.js";
import type { EmailProvider } from "./email/email.provider.js";

function createStorageProvider(): StorageProvider {
  switch (env.storage.provider) {
    case "local":
      return new LocalStorageProvider();
    case "cloudinary":
    default:
      return new CloudinaryProvider();
  }
}

export const storageProvider: StorageProvider = createStorageProvider();
export const smsProvider: SmsProvider = new TwilioProvider();
export const emailProvider: EmailProvider = new BrevoProvider();

export type { StorageProvider, UploadResult } from "./storage/storage.provider.js";
export type { SmsProvider } from "./sms/sms.provider.js";
export type { EmailProvider } from "./email/email.provider.js";
