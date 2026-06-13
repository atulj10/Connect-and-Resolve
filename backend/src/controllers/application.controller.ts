import type { Request, Response } from "express";
import { applicationService } from "../services/application.service.js";
import type { AppStatus, Department } from "../types/index.js";
import multer from "multer";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";

const upload = multer({ dest: os.tmpdir() });

export const applicationController = {
  async create(req: Request, res: Response) {
    try {
      const app = await applicationService.create({
        ...req.body,
        userId: req.user!.id,
        applicationSource: "CITIZEN",
      });
      res.status(201).json(app);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async createByAdmin(req: Request, res: Response) {
    try {
      const app = await applicationService.createByAdmin({
        ...req.body,
        adminUserId: req.user!.id,
      });
      res.status(201).json(app);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const q = (req as any).validatedQuery;
      const params: any = { page: q.page, pageSize: q.pageSize };
      if (q.search) params.search = q.search;
      if (q.category && q.category !== "all") params.category = q.category;
      if (q.status && q.status !== "all") params.status = q.status;
      if (q.department && q.department !== "all") params.department = q.department;
      if (q.district && q.district !== "all") params.district = q.district;
      if (q.block && q.block !== "all") params.block = q.block;
      if (req.user!.role === "CITIZEN") params.userId = req.user!.id;
      const result = await applicationService.list(params);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { application, timeline } = await applicationService.getById(req.params.id as string);
      if (req.user!.role === "CITIZEN" && application.userId !== req.user!.id) {
        res.status(403).json({ error: "Access denied" });
        return;
      }
      res.json({ application, timeline });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  },

  async updateApplication(req: Request, res: Response) {
    try {
      const { application, timelineEntry } = await applicationService.updateApplication(req.params.id as string, req.body, req.user!.id);
      res.json({ application, timelineEntry });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const app = await applicationService.updateStatus(req.params.id as string, req.body.status as AppStatus, req.user!.id);
      res.json(app);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async updateDepartment(req: Request, res: Response) {
    try {
      const app = await applicationService.updateDepartment(req.params.id as string, req.body.department as Department, req.user!.id);
      res.json(app);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async addRemarks(req: Request, res: Response) {
    try {
      const app = await applicationService.addRemarks(req.params.id as string, req.body, req.user!.id);
      res.json(app);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async uploadAttachment(req: Request, res: Response) {
    const uploadMiddleware = upload.single("file");
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        res.status(400).json({ error: "File upload failed" });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: "No file provided" });
        return;
      }
      try {
        const timelineEntryId = req.body.timelineEntryId as string | undefined;
        const attachment = await applicationService.uploadAttachment(
          req.params.id as string,
          req.file.path,
          req.file.originalname,
          req.user!.id,
          timelineEntryId,
        );
        fs.unlink(req.file.path, () => {});
        res.status(201).json(attachment);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
    });
  },
};
