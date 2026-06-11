import nodemailer from "nodemailer";
import dns from "node:dns";
import { env } from "../../config/env.js";
dns.setDefaultResultOrder("ipv4first");
export class NodemailerProvider {
    transporter = null;
    constructor() {
        if (env.smtp.user && env.smtp.pass) {
            this.transporter = nodemailer.createTransport({
                host: env.smtp.host,
                port: env.smtp.port,
                secure: env.smtp.port === 465,
                auth: { user: env.smtp.user, pass: env.smtp.pass },
                connectionTimeout: 10000,
            });
        }
    }
    async send(to, subject, body) {
        if (!this.transporter) {
            if (env.nodeEnv === "production") {
                throw new Error("Email provider (SMTP) is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
            }
            console.log(`[Email Mock] To: ${to}, Subject: ${subject}, Body: ${body}`);
            return;
        }
        await this.transporter.sendMail({
            from: env.smtp.from || env.smtp.user,
            to,
            subject,
            html: body,
        });
        console.log(`[Email Sent] To: ${to}, Subject: ${subject}`);
    }
}
//# sourceMappingURL=nodemailer.provider.js.map