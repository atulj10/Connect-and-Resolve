import { Router } from "express";
import { applicationController } from "../controllers/application.controller.js";
import { authenticate, requireAdmin } from "../middleware/auth.middleware.js";
import { validate, validateQuery } from "../middleware/validate.middleware.js";
import {
  createApplicationSchema,
  updateStatusSchema,
  updateDepartmentSchema,
  addRemarksSchema,
  applicationQuerySchema,
} from "../types/index.js";

const router = Router();

router.use(authenticate);

router.get("/", validateQuery(applicationQuerySchema), applicationController.list);
router.get("/:id", applicationController.getById);
router.post("/", validate(createApplicationSchema), applicationController.create);
router.post("/admin", requireAdmin, validate(createApplicationSchema), applicationController.createByAdmin);
router.patch("/:id/status", requireAdmin, validate(updateStatusSchema), applicationController.updateStatus);
router.patch("/:id/department", requireAdmin, validate(updateDepartmentSchema), applicationController.updateDepartment);
router.patch("/:id/remarks", requireAdmin, validate(addRemarksSchema), applicationController.addRemarks);
router.post("/:id/attachments", applicationController.uploadAttachment);

export default router;
