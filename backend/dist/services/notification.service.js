import { smsProvider, emailProvider } from "../providers/index.js";
export const notificationService = {
    async sendNotification(mobile, email, subject = "", message = "") {
        const body = `Connect&Resolve: ${message}`;
        if (mobile) {
            try {
                await smsProvider.send(mobile, body);
                return;
            }
            catch {
                // Fall through to email
            }
        }
        if (email) {
            try {
                await emailProvider.send(email, subject, `<p>${message}</p>`);
            }
            catch {
                console.error(`Failed to send notification to ${email}`);
            }
        }
    },
};
//# sourceMappingURL=notification.service.js.map