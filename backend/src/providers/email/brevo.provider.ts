import { env } from "../../config/env.js";
import type { EmailProvider } from "./email.provider.js";

export class BrevoProvider implements EmailProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = env.brevo.apiKey;
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    if (!this.apiKey) {
      if (env.nodeEnv === "production") {
        throw new Error("Email provider (Brevo) is not configured. Set BREVO_API_KEY.");
      }
      console.log(`[Email Mock] To: ${to}, Subject: ${subject}, Body: ${body}`);
      return;
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        sender: { name: env.admin.name, email: env.brevo.from },
        to: [{ email: to }],
        subject,
        htmlContent: body,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Brevo API error (${response.status}): ${errorBody}`);
    }

    console.log(`[Email Sent] To: ${to}, Subject: ${subject}`);
  }
}
