import { CloudinaryProvider } from "./storage/cloudinary.provider.js";
import { TwilioProvider } from "./sms/twilio.provider.js";
import { ResendProvider } from "./email/resend.provider.js";
import type { StorageProvider } from "./storage/storage.provider.js";
import type { SmsProvider } from "./sms/sms.provider.js";
import type { EmailProvider } from "./email/email.provider.js";

export const storageProvider: StorageProvider = new CloudinaryProvider();
export const smsProvider: SmsProvider = new TwilioProvider();
export const emailProvider: EmailProvider = new ResendProvider();

export type { StorageProvider, UploadResult } from "./storage/storage.provider.js";
export type { SmsProvider } from "./sms/sms.provider.js";
export type { EmailProvider } from "./email/email.provider.js";
