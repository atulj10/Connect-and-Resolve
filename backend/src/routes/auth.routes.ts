import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  registerSchema,
  sendOtpSchema,
  verifyOtpSchema,
  loginSchema,
  adminLoginSchema,
} from "../types/index.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/send-otp", validate(sendOtpSchema), authController.sendOtp);
router.post("/verify-otp-register", validate(verifyOtpSchema), authController.verifyOtpAndRegister);
router.post("/login", validate(loginSchema), authController.login);
router.post("/admin/login", validate(adminLoginSchema), authController.adminLogin);
router.get("/profile", authenticate, authController.profile);

export default router;
