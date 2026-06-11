export declare const authService: {
    register(data: {
        fullName: string;
        mobileNumber: string;
        email?: string;
    }): Promise<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
    }>;
    sendOtp(identifier: string, purpose: "REGISTER" | "LOGIN"): Promise<{
        message: string;
    }>;
    verifyOtpAndLogin(identifier: string, code: string): Promise<{
        token: string;
        user: {
            id: string;
            fullName: string;
            mobileNumber: string | null;
            email: string | null;
            role: string;
        };
    }>;
    verifyOtpAndRegister(identifier: string, code: string, registrationData: {
        fullName: string;
        mobileNumber: string;
        email?: string;
    }): Promise<{
        token: string;
        user: {
            id: string;
            fullName: string;
            mobileNumber: string | null;
            email: string | null;
            role: string;
        };
    }>;
    adminLogin(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            fullName: string;
            email: string | null;
            role: string;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        fullName: string;
        mobileNumber: string | null;
        email: string | null;
        role: string;
    }>;
    verifyToken(token: string): {
        id: string;
        role: string;
    };
};
//# sourceMappingURL=auth.service.d.ts.map