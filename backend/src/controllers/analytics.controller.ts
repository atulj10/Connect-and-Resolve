import type { Request, Response } from "express";
import { analyticsService } from "../services/analytics.service.js";

export const analyticsController = {
  async citizenAnalytics(req: Request, res: Response) {
    try {
      const range = ((req.query.range as string) || "year");
      const stats = await analyticsService.citizenAnalytics(req.user!.id, range);
      res.json(stats);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async adminAnalytics(req: Request, res: Response) {
    try {
      const range = ((req.query.range as string) || "year");
      const stats = await analyticsService.adminAnalytics(range);
      res.json(stats);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },
};
