import { applicationRepository } from "../repositories/application.repository.js";
import { attachmentRepository } from "../repositories/attachment.repository.js";
import { statusHistoryRepository } from "../repositories/status-history.repository.js";
import { auditLogRepository } from "../repositories/audit-log.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { referenceService } from "./reference.service.js";
import { notificationService } from "./notification.service.js";
import { storageProvider } from "../providers/index.js";
import type { AppStatus, Department } from "../types/index.js";

export const applicationService = {
  async create(data: {
    applicantName: string;
    fatherName: string;
    category: string;
    subject: string;
    description?: string;
    villageMohalla: string;
    panchayat?: string;
    policeStation?: string;
    assemblyConstituency?: string;
    block: string;
    district: string;
    pincode?: string;
    userId: string;
    applicationSource: string;
    department?: string;
  }) {
    const referenceNumber = await referenceService.generate();
    const department = data.department || "Public Works";
    const app = await applicationRepository.create({
      ...data,
      referenceNumber,
      department,
    });

    const initialEntry = await statusHistoryRepository.createTimelineEntry({
      applicationId: app.id,
      oldStatus: null,
      status: "Submitted",
      oldDepartment: null,
      department,
      adminRemarks: null,
      internalNotes: null,
      changedById: data.userId,
    });

    await auditLogRepository.create({
      applicationId: app.id,
      userId: data.userId,
      action: "Application Created",
      details: `Application ${referenceNumber} created`,
    });

    const user = await userRepository.findById(data.userId);
    if (user) {
      await notificationService.sendNotification(
        user.mobileNumber,
        user.email,
        "Application Submitted",
        `Your application ${referenceNumber} has been submitted successfully.`,
      );
    }

    return { ...app, initialTimelineEntry: initialEntry };
  },

  async list(params: {
    page: number;
    pageSize: number;
    search?: string;
    category?: string;
    status?: string;
    department?: string;
    district?: string;
    userId?: string;
  }) {
    const skip = (params.page - 1) * params.pageSize;
    const [applications, total] = await Promise.all([
      applicationRepository.findMany({ ...params, skip, take: params.pageSize }),
      applicationRepository.count(params),
    ]);
    return { applications, total, page: params.page, pageSize: params.pageSize, totalPages: Math.ceil(total / params.pageSize) };
  },

  async getById(id: string) {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error("Application not found");
    const timeline = await statusHistoryRepository.getApplicationTimeline(id);
    return { application: app, timeline };
  },

  async updateApplication(id: string, data: {
    status?: AppStatus;
    department?: Department;
    adminRemarks?: string;
    internalNotes?: string;
  }, userId: string) {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error("Application not found");

    const updates: Record<string, string> = {};
    let oldStatus: string | null = null;
    let newStatus = app.status;
    let oldDepartment: string | null = null;
    let newDepartment = app.department;
    let newAdminRemarks: string | null = null;
    let newInternalNotes: string | null = null;
    let hasChanges = false;

    if (data.status && data.status !== app.status) {
      updates.status = data.status;
      oldStatus = app.status;
      newStatus = data.status;
      hasChanges = true;
    }

    if (data.department && data.department !== app.department) {
      updates.department = data.department;
      oldDepartment = app.department;
      newDepartment = data.department;
      hasChanges = true;
    }

    if (data.adminRemarks !== undefined && data.adminRemarks !== (app.adminRemarks ?? "")) {
      updates.adminRemarks = data.adminRemarks;
      newAdminRemarks = data.adminRemarks || null;
      hasChanges = true;
    }

    if (data.internalNotes !== undefined && data.internalNotes !== (app.internalNotes ?? "")) {
      updates.internalNotes = data.internalNotes;
      newInternalNotes = data.internalNotes || null;
      hasChanges = true;
    }

    if (!hasChanges) return { application: app, timelineEntry: null };

    const updated = await applicationRepository.update(id, updates);

    const timelineEntry = await statusHistoryRepository.createTimelineEntry({
      applicationId: id,
      oldStatus,
      status: newStatus,
      oldDepartment,
      department: newDepartment,
      adminRemarks: newAdminRemarks,
      internalNotes: newInternalNotes,
      changedById: userId,
    });

    const changeList = Object.keys(updates).join(", ");
    await auditLogRepository.create({
      applicationId: id,
      userId,
      action: "Application Updated",
      details: `Updated: ${changeList}`,
    });

    if (data.status) {
      const user = await userRepository.findById(app.userId);
      if (user) {
        await notificationService.sendNotification(
          user.mobileNumber,
          user.email,
          "Application Status Updated",
          `Your application ${app.referenceNumber} status changed from ${oldStatus} to ${newStatus}.`,
        );
      }
    }

    return { application: updated, timelineEntry };
  },

  async updateStatus(id: string, status: AppStatus, userId: string) {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error("Application not found");
    if (app.status === status) return app;
    const oldStatus = app.status;
    const updated = await applicationRepository.update(id, { status });

    await statusHistoryRepository.createTimelineEntry({
      applicationId: id,
      oldStatus,
      status,
      oldDepartment: null,
      department: app.department,
      adminRemarks: app.adminRemarks || null,
      internalNotes: app.internalNotes || null,
      changedById: userId,
    });

    await auditLogRepository.create({
      applicationId: id,
      userId,
      action: "Status Changed",
      details: `${oldStatus} → ${status}`,
    });

    const user = await userRepository.findById(app.userId);
    if (user) {
      await notificationService.sendNotification(
        user.mobileNumber,
        user.email,
        "Application Status Updated",
        `Your application ${app.referenceNumber} status changed from ${oldStatus} to ${status}.`,
      );
    }
    return updated;
  },

  async updateDepartment(id: string, department: Department, userId: string) {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error("Application not found");
    if (app.department === department) return app;
    const oldDepartment = app.department;
    const updated = await applicationRepository.update(id, { department });

    await statusHistoryRepository.createTimelineEntry({
      applicationId: id,
      oldStatus: null,
      status: app.status,
      oldDepartment,
      department,
      adminRemarks: app.adminRemarks || null,
      internalNotes: app.internalNotes || null,
      changedById: userId,
    });

    await auditLogRepository.create({
      applicationId: id,
      userId,
      action: "Department Changed",
      details: `${oldDepartment} → ${department}`,
    });
    return updated;
  },

  async addRemarks(id: string, data: { adminRemarks?: string; internalNotes?: string }, userId: string) {
    const app = await applicationRepository.findById(id);
    if (!app) throw new Error("Application not found");
    const updated = await applicationRepository.update(id, data);

    await statusHistoryRepository.createTimelineEntry({
      applicationId: id,
      oldStatus: null,
      status: app.status,
      oldDepartment: null,
      department: app.department,
      adminRemarks: data.adminRemarks ?? app.adminRemarks ?? null,
      internalNotes: data.internalNotes ?? app.internalNotes ?? null,
      changedById: userId,
    });

    await auditLogRepository.create({
      applicationId: id,
      userId,
      action: "Remark Added",
      details: "Admin remark or internal note added",
    });
    return updated;
  },

  async uploadAttachment(applicationId: string, filePath: string, fileName: string, userId: string, timelineEntryId?: string) {
    const app = await applicationRepository.findById(applicationId);
    if (!app) throw new Error("Application not found");
    const existing = await attachmentRepository.findByApplicationId(applicationId);
    if (existing.length >= 5) throw new Error("Maximum 5 attachments allowed");
    const result = await storageProvider.upload(filePath, fileName);
    const attachment = await attachmentRepository.create({ ...result, applicationId });

    if (timelineEntryId) {
      await statusHistoryRepository.attachFilesToTimelineEntry(timelineEntryId, [attachment.id]);
    } else {
      const entry = await statusHistoryRepository.createTimelineEntry({
        applicationId,
        oldStatus: null,
        status: app.status,
        oldDepartment: null,
        department: app.department,
        adminRemarks: app.adminRemarks || null,
        internalNotes: app.internalNotes || null,
        changedById: userId,
      });

      await statusHistoryRepository.attachFilesToTimelineEntry(entry.id, [attachment.id]);
    }

    return attachment;
  },

  async createByAdmin(data: {
    applicantName: string;
    fatherName: string;
    category: string;
    subject: string;
    description?: string;
    villageMohalla: string;
    panchayat?: string;
    policeStation?: string;
    assemblyConstituency?: string;
    block: string;
    district: string;
    pincode?: string;
    department?: string;
    mobileNumber?: string;
    adminUserId: string;
  }) {
    let userId: string;
    if (data.mobileNumber) {
      let user = await userRepository.findByMobile(data.mobileNumber);
      if (user) {
        userId = user.id;
      } else {
        const newUser = await userRepository.create({
          fullName: data.applicantName,
          mobileNumber: data.mobileNumber,
          role: "CITIZEN",
        });
        userId = newUser.id;
      }
    } else {
      throw new Error("Mobile number is required to create application on behalf of citizen");
    }

    const { mobileNumber, adminUserId, ...appData } = data;
    return this.create({
      ...appData,
      userId,
      applicationSource: "ADMIN",
    });
  },
};
