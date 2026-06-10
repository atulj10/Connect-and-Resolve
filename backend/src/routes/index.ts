import { Router } from "express";
import authRoutes from "./auth.routes.js";
import applicationRoutes from "./application.routes.js";
import userRoutes from "./user.routes.js";
import analyticsRoutes from "./analytics.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/applications", applicationRoutes);
router.use("/users", userRoutes);
router.use("/analytics", analyticsRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;
