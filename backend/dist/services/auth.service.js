import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/user.repository.js";
import { otpService } from "./otp.service.js";
function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export const authService = {
    async register(data) {
        const existing = await userRepository.findByMobile(data.mobileNumber);
        if (existing) {
            throw new Error("Mobile number already registered");
        }
        const user = await userRepository.create({
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            email: data.email || undefined,
            role: "CITIZEN",
        });
        return { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber };
    },
    async sendOtp(identifier, purpose) {
        if (purpose === "LOGIN") {
            if (isEmail(identifier)) {
                const user = await userRepository.findByEmail(identifier);
                if (!user)
                    throw new Error("No account found with this email");
            }
            else {
                const user = await userRepository.findByMobile(identifier);
                if (!user)
                    throw new Error("No account found with this mobile number");
            }
        }
        if (purpose === "REGISTER") {
            if (isEmail(identifier)) {
                const user = await userRepository.findByEmail(identifier);
                if (user)
                    throw new Error("Email already registered");
            }
            else {
                const user = await userRepository.findByMobile(identifier);
                if (user)
                    throw new Error("Mobile number already registered");
            }
        }
        return otpService.sendOtp(identifier, purpose);
    },
    async verifyOtpAndLogin(identifier, code) {
        await otpService.verifyOtp(identifier, code, "LOGIN");
        const user = isEmail(identifier)
            ? await userRepository.findByEmail(identifier)
            : await userRepository.findByMobile(identifier);
        if (!user)
            throw new Error("User not found");
        const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
            expiresIn: env.jwtExpiresIn,
        });
        return { token, user: { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email, role: user.role } };
    },
    async verifyOtpAndRegister(identifier, code, registrationData) {
        await otpService.verifyOtp(identifier, code, "REGISTER");
        const isEmailIdentifier = isEmail(identifier);
        if (registrationData.mobileNumber) {
            const existing = await userRepository.findByMobile(registrationData.mobileNumber);
            if (existing)
                throw new Error("Mobile number already registered");
        }
        const user = await userRepository.create({
            fullName: registrationData.fullName,
            mobileNumber: registrationData.mobileNumber || undefined,
            email: registrationData.email || undefined,
            role: "CITIZEN",
            mobileVerified: !isEmailIdentifier,
            emailVerified: isEmailIdentifier,
        });
        const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
            expiresIn: env.jwtExpiresIn,
        });
        return { token, user: { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email, role: user.role } };
    },
    async adminLogin(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user || user.role !== "ADMIN")
            throw new Error("Invalid credentials");
        if (!user.password)
            throw new Error("Invalid credentials");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error("Invalid credentials");
        const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
            expiresIn: env.jwtExpiresIn,
        });
        return { token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } };
    },
    async getProfile(userId) {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new Error("User not found");
        return { id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, email: user.email, role: user.role };
    },
    verifyToken(token) {
        return jwt.verify(token, env.jwtSecret);
    },
};
//# sourceMappingURL=auth.service.js.map