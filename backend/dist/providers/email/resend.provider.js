import { Resend } from "resend";
import { env } from "../../config/env.js";
export class ResendProvider {
    client = null;
    constructor() {
        if (env.resend.apiKey) {
            this.client = new Resend(env.resend.apiKey);
        }
    }
    async send(to, subject, body) {
        if (!this.client) {
            console.log(`[Email Mock] To: ${to}, Subject: ${subject}, Body: ${body}`);
            return;
        }
        await this.client.emails.send({
            from: "Connect&Resolve <notifications@connect-resolve.gov.in>",
            to,
            subject,
            html: body,
        });
    }
}
//# sourceMappingURL=resend.provider.js.map