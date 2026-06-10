import { applicationRepository } from "../repositories/application.repository.js";
import { attachmentRepository } from "../repositories/attachment.repository.js";
import { statusHistoryRepository } from "../repositories/status-history.repository.js";
import { auditLogRepository } from "../repositories/audit-log.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { referenceService } from "./reference.service.js";
import { notificationService } from "./notification.service.js";
import { storageProvider } from "../providers/index.js";
export const applicationService = {
    async create(data) {
        const referenceNumber = await referenceService.generate();
        const app = await applicationRepository.create({
            ...data,
            referenceNumber,
            department: data.department || "Public Works",
        });
        await auditLogRepository.create({
            applicationId: app.id,
            userId: data.userId,
            action: "Application Created",
            details: `Application ${referenceNumber} created`,
        });
        const user = await userRepository.findById(data.userId);
        if (user) {
            await notificationService.sendNotification(user.mobileNumber, user.email, "Application Submitted", `Your application ${referenceNumber} has been submitted successfully.`);
        }
        return app;
    },
    async list(params) {
        const skip = (params.page - 1) * params.pageSize;
        const [applications, total] = await Promise.all([
            applicationRepository.findMany({ ...params, skip, take: params.pageSize }),
            applicationRepository.count(params),
        ]);
        return { applications, total, page: params.page, pageSize: params.pageSize, totalPages: Math.ceil(total / params.pageSize) };
    },
    async getById(id) {
        const app = await applicationRepository.findById(id);
        if (!app)
            throw new Error("Application not found");
        const statusHistory = await statusHistoryRepository.findByApplicationId(id);
        const auditLogs = await auditLogRepository.findByApplicationId(id);
        return { ...app, statusHistory, auditLogs };
    },
    async updateStatus(id, status, userId) {
        const app = await applicationRepository.findById(id);
        if (!app)
            throw new Error("Application not found");
        const oldStatus = app.status;
        const updated = await applicationRepository.update(id, { status });
        await statusHistoryRepository.create({ applicationId: id, oldStatus, newStatus: status, changedById: userId });
        await auditLogRepository.create({ applicationId: id, userId, action: "Status Changed", details: `${oldStatus} → ${status}` });
        const user = await userRepository.findById(app.userId);
        if (user) {
            await notificationService.sendNotification(user.mobileNumber, user.email, "Application Status Updated", `Your application ${app.referenceNumber} status changed from ${oldStatus} to ${status}.`);
        }
        return updated;
    },
    async updateDepartment(id, department, userId) {
        const app = await applicationRepository.findById(id);
        if (!app)
            throw new Error("Application not found");
        const updated = await applicationRepository.update(id, { department });
        await auditLogRepository.create({ applicationId: id, userId, action: "Department Changed", details: `Department → ${department}` });
        return updated;
    },
    async addRemarks(id, data, userId) {
        const app = await applicationRepository.findById(id);
        if (!app)
            throw new Error("Application not found");
        const updated = await applicationRepository.update(id, data);
        await auditLogRepository.create({ applicationId: id, userId, action: "Remark Added", details: "Admin remark or internal note added" });
        return updated;
    },
    async uploadAttachment(applicationId, filePath, fileName) {
        const app = await applicationRepository.findById(applicationId);
        if (!app)
            throw new Error("Application not found");
        const existing = await attachmentRepository.findByApplicationId(applicationId);
        if (existing.length >= 5)
            throw new Error("Maximum 5 attachments allowed");
        const result = await storageProvider.upload(filePath, fileName);
        return attachmentRepository.create({ ...result, applicationId });
    },
    async createByAdmin(data) {
        let userId;
        if (data.mobileNumber) {
            let user = await userRepository.findByMobile(data.mobileNumber);
            if (user) {
                userId = user.id;
            }
            else {
                const newUser = await userRepository.create({
                    fullName: data.applicantName,
                    mobileNumber: data.mobileNumber,
                    role: "CITIZEN",
                });
                userId = newUser.id;
            }
        }
        else {
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
//# sourceMappingURL=application.service.js.map