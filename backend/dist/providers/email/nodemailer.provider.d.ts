import type { EmailProvider } from "./email.provider.js";
export declare class NodemailerProvider implements EmailProvider {
    private transporter;
    private initPromise;
    constructor();
    private init;
    send(to: string, subject: string, body: string): Promise<void>;
}
//# sourceMappingURL=nodemailer.provider.d.ts.map