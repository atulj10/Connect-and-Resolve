import { CloudinaryProvider } from "./storage/cloudinary.provider.js";
import { TwilioProvider } from "./sms/twilio.provider.js";
import { BrevoProvider } from "./email/brevo.provider.js";
export const storageProvider = new CloudinaryProvider();
export const smsProvider = new TwilioProvider();
export const emailProvider = new BrevoProvider();
//# sourceMappingURL=index.js.map