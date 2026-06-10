import { prisma } from "../lib/prisma.js";
export const attachmentRepository = {
    create(data) {
        return prisma.attachment.create({ data });
    },
    findByApplicationId(applicationId) {
        return prisma.attachment.findMany({ where: { applicationId } });
    },
    delete(id) {
        return prisma.attachment.delete({ where: { id } });
    },
};
//# sourceMappingURL=attachment.repository.js.map