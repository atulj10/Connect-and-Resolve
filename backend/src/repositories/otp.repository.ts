import { prisma } from "../lib/prisma.js";

export const otpRepository = {
  create(data: { identifier: string; code: string; purpose: string; expiresAt: Date }) {
    return prisma.otp.create({ data });
  },

  findValid(identifier: string, code: string, purpose: string) {
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

  markVerified(id: string) {
    return prisma.otp.update({ where: { id }, data: { verified: true } });
  },

  invalidateByIdentifier(identifier: string, purpose: string) {
    return prisma.otp.updateMany({
      where: { identifier, purpose, verified: false },
      data: { verified: true },
    });
  },
};
