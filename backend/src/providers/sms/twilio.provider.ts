import twilio from "twilio";
import type { SmsProvider } from "./sms.provider.js";
import { env } from "../../config/env.js";

export class TwilioProvider implements SmsProvider {
  private client: twilio.Twilio | null = null;

  constructor() {
    if (env.twilio.accountSid && env.twilio.authToken) {
      this.client = twilio(env.twilio.accountSid, env.twilio.authToken);
    }
  }

  async send(to: string, message: string): Promise<void> {
    if (!this.client || !env.twilio.phoneNumber) {
      if (env.nodeEnv === "production") {
        throw new Error("SMS provider (Twilio) is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER.");
      }
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
