import { CloudinaryProvider } from "./storage/cloudinary.provider.js";
import { TwilioProvider } from "./sms/twilio.provider.js";
import { NodemailerProvider } from "./email/nodemailer.provider.js";
export const storageProvider = new CloudinaryProvider();
export const smsProvider = new TwilioProvider();
export const emailProvider = new NodemailerProvider();
//# sourceMappingURL=index.js.map