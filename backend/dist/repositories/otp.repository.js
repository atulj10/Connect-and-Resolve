import { prisma } from "../lib/prisma.js";
export const otpRepository = {
    create(data) {
        return prisma.otp.create({ data });
    },
    findValid(identifier, code, purpose) {
        return prisma.otp.findFirst({
            where: {
                identifier,
                code,
                purpose,
                expiresAt: { gte: new Date() },
                verified: false,
            },
            orderBy: { createdAt: "desc" },
        });
    },
    markVerified(id) {
        return prisma.otp.update({ where: { id }, data: { verified: true } });
    },
    invalidateByIdentifier(identifier, purpose) {
        return prisma.otp.updateMany({
            where: { identifier, purpose, verified: false },
            data: { verified: true },
        });
    },
};
//# sourceMappingURL=otp.repository.js.map