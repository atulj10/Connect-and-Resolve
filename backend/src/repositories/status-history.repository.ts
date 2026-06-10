import { prisma } from "../lib/prisma.js";

export const statusHistoryRepository = {
  create(data: { applicationId: string; oldStatus: string | null; newStatus: string; changedById: string }) {
    return prisma.applicationStatusHistory.create({ data });
  },

  findByApplicationId(applicationId: string) {
    return prisma.applicationStatusHistory.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
      include: { changedBy: { select: { fullName: true } } },
    });
  },
};
