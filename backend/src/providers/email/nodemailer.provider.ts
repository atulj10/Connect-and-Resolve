import nodemailer from "nodemailer";
import dns from "node:dns";
import type { EmailProvider } from "./email.provider.js";
import { env } from "../../config/env.js";

export class NodemailerProvider implements EmailProvider {
  private transporter: nodemailer.Transporter | null = null;
  private initPromise: Promise<void> | null = null;

  constructor() {
    if (env.smtp.user && env.smtp.pass) {
      this.initPromise = this.init();
    }
  }

  private async init() {
    try {
      const addresses = await dns.promises.resolve4(env.smtp.host);
      const host = addresses[0];
      this.transporter = nodemailer.createTransport({
        host,
        port: env.smtp.port,
        secure: env.smtp.port === 465,
        auth: { user: env.smtp.user, pass: env.smtp.pass },
        connectionTimeout: 10000,
      });
    } catch (err) {
      console.error("[Nodemailer] DNS resolution failed:", err);
      this.transporter = nodemailer.createTransport({
        host: env.smtp.host,
        port: env.smtp.port,
        secure: env.smtp.port === 465,
        auth: { user: env.smtp.user, pass: env.smtp.pass },
        connectionTimeout: 10000,
      });
    }
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    if (this.initPromise) await this.initPromise;
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
