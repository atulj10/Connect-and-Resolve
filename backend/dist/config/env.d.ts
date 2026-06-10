import "dotenv/config";
export declare const env: {
    readonly port: number;
    readonly nodeEnv: string;
    readonly jwtSecret: string;
    readonly jwtExpiresIn: string;
    readonly cloudinary: {
        readonly cloudName: string;
        readonly apiKey: string;
        readonly apiSecret: string;
    };
    readonly twilio: {
        readonly accountSid: string;
        readonly authToken: string;
        readonly phoneNumber: string;
    };
    readonly resend: {
        readonly apiKey: string;
    };
};
//# sourceMappingURL=env.d.ts.map