import { prisma } from "../lib/prisma.js";

export const auditLogRepository = {
  create(data: { applicationId: string; userId: string; action: string; details?: string }) {
    return prisma.auditLog.create({ data });
  },

  findByApplicationId(applicationId: string) {
    return prisma.auditLog.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { fullName: true } } },
    });
  },
};
