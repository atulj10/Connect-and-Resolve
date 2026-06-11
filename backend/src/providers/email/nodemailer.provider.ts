import nodemailer from "nodemailer";
import type { EmailProvider } from "./email.provider.js";
import { env } from "../../config/env.js";

export class NodemailerProvider implements EmailProvider {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (env.smtp.user && env.smtp.pass) {
      // Initialize immediately without complex asynchronous DNS wrappers
      this.transporter = nodemailer.createTransport({
        host: env.smtp.host, // Pass '://gmail.com' directly here
        port: env.smtp.port, // Ensure env.config parses this as a number (587)
        secure: env.smtp.port === 465, // false for 587
        auth: { 
          user: env.smtp.user, 
          pass: env.smtp.pass 
        },
        connectionTimeout: 15000, // Slightly increased for cold-start spikes on Render
        // Crucial cloud adjustments for Port 587:
        requireTLS: env.smtp.port === 587, 
        tls: {
          rejectUnauthorized: false, // Prevents Render's container from blocking the handshake
        },
        family: 4,
      });
    }
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    if (!this.transporter) {
      if (env.nodeEnv === "production") {
        throw new Error("Email provider (SMTP) is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
      }
      console.log(`[Email Mock] To: ${to}, Subject: ${subject}, Body: ${body}`);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: env.smtp.from || env.smtp.user,
        to,
        subject,
        html: body,
      });
      console.log(`[Email Sent] To: ${to}, Subject: ${subject}`);
    } catch (error) {
      console.error("[Nodemailer] Render execution failed to send email:", error);
      throw error;
    }
  }
}
