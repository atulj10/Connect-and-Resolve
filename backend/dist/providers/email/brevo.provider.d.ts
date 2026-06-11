import type { EmailProvider } from "./email.provider.js";
export declare class BrevoProvider implements EmailProvider {
    private apiKey;
    constructor();
    send(to: string, subject: string, body: string): Promise<void>;
}
//# sourceMappingURL=brevo.provider.d.ts.map