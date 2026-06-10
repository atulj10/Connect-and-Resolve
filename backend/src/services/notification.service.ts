import { smsProvider, emailProvider } from "../providers/index.js";

export const notificationService = {
  async sendNotification(mobile?: string | null, email?: string | null, subject = "", message = ""): Promise<void> {
    const body = `Connect&Resolve: ${message}`;
    if (mobile) {
      try {
        await smsProvider.send(mobile, body);
        return;
      } catch {
        // Fall through to email
      }
    }
    if (email) {
      try {
        await emailProvider.send(email, subject, `<p>${message}</p>`);
      } catch {
        console.error(`Failed to send notification to ${email}`);
      }
    }
  },
};
