import type { Request, Response } from "express";
export declare const authController: {
    register(req: Request, res: Response): Promise<void>;
    sendOtp(req: Request, res: Response): Promise<void>;
    verifyOtpAndRegister(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    adminLogin(req: Request, res: Response): Promise<void>;
    profile(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map