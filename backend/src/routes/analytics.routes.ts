import { Router } from "express";
import { analyticsController } from "../controllers/analytics.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);
router.get("/citizen", analyticsController.citizenAnalytics);
router.get("/admin", requireAdmin, analyticsController.adminAnalytics);

export default router;
