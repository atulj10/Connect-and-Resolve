import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/user.repository.js";
import { otpService } from "./otp.service.js";

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const authService = {
  async register(data: { fullName: string; mobileNumber: string; email?: string; address?: string }) {
    const existing = await userRepository.findByMobile(data.mobileNumber);
    if (existing) {
      throw new Error("Mobile number already registered");
    }
    const user = await userRepository.create({
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      email: data.email || undefined,
      address: data.address || undefined,
      role: "CITIZEN",
    });
    return { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber };
  },

  async sendOtp(identifier: string, purpose: "REGISTER" | "LOGIN") {
    if (purpose === "LOGIN") {
      if (isEmail(identifier)) {
        const user = await userRepository.findByEmail(identifier);
        if (!user) throw new Error("No account found with this email");
      } else {
        const user = await userRepository.findByMobile(identifier);
        if (!user) throw new Error("No account found with this mobile number");
      }
    }
    if (purpose === "REGISTER") {
      if (!isEmail(identifier)) {
        const user = await userRepository.findByMobile(identifier);
        if (user) throw new Error("Mobile number already registered");
      }
    }
    return otpService.sendOtp(identifier, purpose);
  },

  async verifyOtpAndLogin(identifier: string, code: string) {
    await otpService.verifyOtp(identifier, code, "LOGIN");
    const user = isEmail(identifier)
      ? await userRepository.findByEmail(identifier)
      : await userRepository.findByMobile(identifier);
    if (!user) throw new Error("User not found");

    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
    return { token, user: { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email, role: user.role } };
  },

  async verifyOtpAndRegister(identifier: string, code: string, registrationData: { fullName: string; mobileNumber: string; email?: string; address?: string }) {
    await otpService.verifyOtp(identifier, code, "REGISTER");
    const existing = await userRepository.findByMobile(registrationData.mobileNumber);
    if (existing) throw new Error("Mobile number already registered");

    const user = await userRepository.create({
      fullName: registrationData.fullName,
      mobileNumber: registrationData.mobileNumber,
      email: registrationData.email || undefined,
      address: registrationData.address || undefined,
      role: "CITIZEN",
      mobileVerified: !isEmail(identifier),
      emailVerified: isEmail(identifier),
    });

    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
    return { token, user: { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email, role: user.role } };
  },

  async adminLogin(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || user.role !== "ADMIN") throw new Error("Invalid credentials");
    if (!user.password) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
    return { token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } };
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email, address: user.address, role: user.role };
  },

  verifyToken(token: string) {
    return jwt.verify(token, env.jwtSecret) as { id: string; role: string };
  },
};
