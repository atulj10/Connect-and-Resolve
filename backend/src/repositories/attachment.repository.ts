import { prisma } from "../lib/prisma.js";

export const attachmentRepository = {
  create(data: { publicId: string; url: string; fileName: string; mimeType: string; size: number; applicationId: string }) {
    return prisma.attachment.create({ data });
  },

  findByApplicationId(applicationId: string) {
    return prisma.attachment.findMany({ where: { applicationId } });
  },

  delete(id: string) {
    return prisma.attachment.delete({ where: { id } });
  },
};
