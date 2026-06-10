import type { Request, Response } from "express";
export declare const applicationController: {
    create(req: Request, res: Response): Promise<void>;
    createByAdmin(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    updateStatus(req: Request, res: Response): Promise<void>;
    updateDepartment(req: Request, res: Response): Promise<void>;
    addRemarks(req: Request, res: Response): Promise<void>;
    uploadAttachment(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=application.controller.d.ts.map