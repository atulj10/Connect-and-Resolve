export declare const otpService: {
    sendOtp(identifier: string, purpose: "REGISTER" | "LOGIN"): Promise<{
        message: string;
    }>;
    verifyOtp(identifier: string, code: string, purpose: "REGISTER" | "LOGIN"): Promise<boolean>;
};
//# sourceMappingURL=otp.service.d.ts.map