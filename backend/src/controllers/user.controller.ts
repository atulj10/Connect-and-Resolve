import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
  async list(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await userService.list(page, pageSize);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async search(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ error: "Search query is required" });
        return;
      }
      const users = await userService.search(query);
      res.json(users);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.getById(req.params.id as string);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  },
};
