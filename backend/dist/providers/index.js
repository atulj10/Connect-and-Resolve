import { CloudinaryProvider } from "./storage/cloudinary.provider.js";
import { TwilioProvider } from "./sms/twilio.provider.js";
import { ResendProvider } from "./email/resend.provider.js";
export const storageProvider = new CloudinaryProvider();
export const smsProvider = new TwilioProvider();
export const emailProvider = new ResendProvider();
//# sourceMappingURL=index.js.map