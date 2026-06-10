import type { SmsProvider } from "./sms.provider.js";
export declare class TwilioProvider implements SmsProvider {
    private client;
    constructor();
    send(to: string, message: string): Promise<void>;
}
//# sourceMappingURL=twilio.provider.d.ts.map