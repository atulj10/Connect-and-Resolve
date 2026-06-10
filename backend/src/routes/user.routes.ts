import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);
router.use(requireAdmin);
router.get("/", userController.list);
router.get("/search", userController.search);
router.get("/:id", userController.getById);

export default router;
