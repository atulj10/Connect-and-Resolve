import { Resend } from "resend";
import type { EmailProvider } from "./email.provider.js";
import { env } from "../../config/env.js";

export class ResendProvider implements EmailProvider {
  private client: Resend | null = null;

  constructor() {
    if (env.resend.apiKey) {
      this.client = new Resend(env.resend.apiKey);
    }
  }

  async send(to: string, subject: string, body: string): Promise<void> {
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
