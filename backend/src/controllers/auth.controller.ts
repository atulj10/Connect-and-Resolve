import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { authService } from "../services/auth.service.js";

function sanitizeError(err: unknown): string {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return "Internal server error";
  }
  return err instanceof Error ? err.message : "Internal server error";
}

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (err: unknown) {
      res.status(400).json({ error: sanitizeError(err) });
    }
  },

  async sendOtp(req: Request, res: Response) {
    try {
      const { identifier, purpose } = req.body;
      const result = await authService.sendOtp(identifier, purpose);
      res.json(result);
    } catch (err: unknown) {
      res.status(400).json({ error: sanitizeError(err) });
    }
  },

  async verifyOtpAndRegister(req: Request, res: Response) {
    try {
      const { identifier, code, ...registrationData } = req.body;
      const result = await authService.verifyOtpAndRegister(identifier, code, registrationData);
      res.status(201).json(result);
    } catch (err: unknown) {
      res.status(400).json({ error: sanitizeError(err) });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { identifier, code } = req.body;
      const result = await authService.verifyOtpAndLogin(identifier, code);
      res.json(result);
    } catch (err: unknown) {
      res.status(400).json({ error: sanitizeError(err) });
    }
  },

  async adminLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.adminLogin(email, password);
      res.json(result);
    } catch (err: unknown) {
      res.status(401).json({ error: sanitizeError(err) });
    }
  },

  async profile(req: Request, res: Response) {
    try {
      const user = await authService.getProfile(req.user!.id);
      res.json(user);
    } catch (err: unknown) {
      res.status(404).json({ error: sanitizeError(err) });
    }
  },
};
