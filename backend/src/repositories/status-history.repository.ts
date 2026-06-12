import { prisma } from "../lib/prisma.js";

export const statusHistoryRepository = {
  createTimelineEntry(data: {
    applicationId: string;
    oldStatus: string | null;
    status: string;
    oldDepartment: string | null;
    department: string | null;
    adminRemarks: string | null;
    internalNotes: string | null;
    changedById: string | null;
  }) {
    return prisma.applicationStatusHistory.create({ data });
  },

  getApplicationTimeline(applicationId: string) {
    return prisma.applicationStatusHistory.findMany({
      where: { applicationId },
      orderBy: { createdAt: "desc" },
      include: {
        changedBy: { select: { id: true, fullName: true, role: true } },
        attachments: true,
      },
    });
  },

  attachFilesToTimelineEntry(timelineEntryId: string, attachmentIds: string[]) {
    return prisma.attachment.updateMany({
      where: { id: { in: attachmentIds } },
      data: { applicationStatusHistoryId: timelineEntryId },
    });
  },
};
