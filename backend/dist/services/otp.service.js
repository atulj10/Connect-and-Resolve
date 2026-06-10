import { otpRepository } from "../repositories/otp.repository.js";
import { smsProvider } from "../providers/index.js";
import { emailProvider } from "../providers/index.js";
const OTP_EXPIRY_MINUTES = 10;
function generateCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
}
function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export const otpService = {
    async sendOtp(identifier, purpose) {
        await otpRepository.invalidateByIdentifier(identifier, purpose);
        const code = generateCode();
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
        await otpRepository.create({ identifier, code, purpose, expiresAt });
        const message = `Your Connect&Resolve OTP is ${code}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`;
        if (isEmail(identifier)) {
            await emailProvider.send(identifier, `OTP for ${purpose.toLowerCase()}`, `<p>${message}</p>`);
        }
        else {
            await smsProvider.send(identifier, message);
        }
        return { message: "OTP sent successfully" };
    },
    async verifyOtp(identifier, code, purpose) {
        const otp = await otpRepository.findValid(identifier, code, purpose);
        if (!otp) {
            throw new Error("Invalid or expired OTP");
        }
        await otpRepository.markVerified(otp.id);
        return true;
    },
};
//# sourceMappingURL=otp.service.js.map