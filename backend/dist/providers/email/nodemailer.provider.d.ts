import type { EmailProvider } from "./email.provider.js";
export declare class NodemailerProvider implements EmailProvider {
    private transporter;
    constructor();
    send(to: string, subject: string, body: string): Promise<void>;
}
//# sourceMappingURL=nodemailer.provider.d.ts.map