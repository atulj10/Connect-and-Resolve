import type { EmailProvider } from "./email.provider.js";
export declare class ResendProvider implements EmailProvider {
    private client;
    constructor();
    send(to: string, subject: string, body: string): Promise<void>;
}
//# sourceMappingURL=resend.provider.d.ts.map