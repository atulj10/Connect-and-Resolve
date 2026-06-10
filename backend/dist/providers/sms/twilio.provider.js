import twilio from "twilio";
import { env } from "../../config/env.js";
export class TwilioProvider {
    client = null;
    constructor() {
        if (env.twilio.accountSid && env.twilio.authToken) {
            this.client = twilio(env.twilio.accountSid, env.twilio.authToken);
        }
    }
    async send(to, message) {
        if (!this.client || !env.twilio.phoneNumber) {
            console.log(`[SMS Mock] To: ${to}, Message: ${message}`);
            return;
        }
        await this.client.messages.create({
            from: env.twilio.phoneNumber,
            to: `+91${to}`,
            body: message,
        });
    }
}
//# sourceMappingURL=twilio.provider.js.map