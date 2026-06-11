import nodemailer from "nodemailer";
import type { EmailProvider } from "./email.provider.js";
import { env } from "../../config/env.js";

export class NodemailerProvider implements EmailProvider {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (env.smtp.user && env.smtp.pass) {
      this.transporter = nodemailer.createTransport({
        host: env.smtp.host,
        port: env.smtp.port,
        secure: env.smtp.port === 465,
        auth: { user: env.smtp.user, pass: env.smtp.pass },
      });
    }
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    if (!this.transporter) {
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
