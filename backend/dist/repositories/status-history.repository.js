import { prisma } from "../lib/prisma.js";
export const statusHistoryRepository = {
    create(data) {
        return prisma.applicationStatusHistory.create({ data });
    },
    findByApplicationId(applicationId) {
        return prisma.applicationStatusHistory.findMany({
            where: { applicationId },
            orderBy: { createdAt: "desc" },
            include: { changedBy: { select: { fullName: true } } },
        });
    },
};
//# sourceMappingURL=status-history.repository.js.map