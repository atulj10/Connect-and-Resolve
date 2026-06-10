import { prisma } from "../lib/prisma.js";
export const auditLogRepository = {
    create(data) {
        return prisma.auditLog.create({ data });
    },
    findByApplicationId(applicationId) {
        return prisma.auditLog.findMany({
            where: { applicationId },
            orderBy: { createdAt: "desc" },
            include: { user: { select: { fullName: true } } },
        });
    },
};
//# sourceMappingURL=audit-log.repository.js.map