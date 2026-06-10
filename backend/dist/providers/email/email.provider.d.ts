export interface EmailProvider {
    send(to: string, subject: string, body: string): Promise<void>;
}
//# sourceMappingURL=email.provider.d.ts.map