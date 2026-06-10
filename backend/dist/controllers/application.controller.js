import { applicationService } from "../services/application.service.js";
import multer from "multer";
import os from "node:os";
import fs from "node:fs";
const upload = multer({ dest: os.tmpdir() });
export const applicationController = {
    async create(req, res) {
        try {
            const app = await applicationService.create({
                ...req.body,
                userId: req.user.id,
                applicationSource: "CITIZEN",
            });
            res.status(201).json(app);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async createByAdmin(req, res) {
        try {
            const app = await applicationService.createByAdmin({
                ...req.body,
                adminUserId: req.user.id,
            });
            res.status(201).json(app);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async list(req, res) {
        try {
            const q = req.validatedQuery;
            const params = { page: q.page, pageSize: q.pageSize };
            if (q.search)
                params.search = q.search;
            if (q.category && q.category !== "all")
                params.category = q.category;
            if (q.status && q.status !== "all")
                params.status = q.status;
            if (q.department && q.department !== "all")
                params.department = q.department;
            if (q.district && q.district !== "all")
                params.district = q.district;
            if (req.user.role === "CITIZEN")
                params.userId = req.user.id;
            const result = await applicationService.list(params);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const app = await applicationService.getById(req.params.id);
            if (req.user.role === "CITIZEN" && app.userId !== req.user.id) {
                res.status(403).json({ error: "Access denied" });
                return;
            }
            res.json(app);
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
    async updateStatus(req, res) {
        try {
            const app = await applicationService.updateStatus(req.params.id, req.body.status, req.user.id);
            res.json(app);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async updateDepartment(req, res) {
        try {
            const app = await applicationService.updateDepartment(req.params.id, req.body.department, req.user.id);
            res.json(app);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async addRemarks(req, res) {
        try {
            const app = await applicationService.addRemarks(req.params.id, req.body, req.user.id);
            res.json(app);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async uploadAttachment(req, res) {
        const uploadMiddleware = upload.single("file");
        uploadMiddleware(req, res, async (err) => {
            if (err) {
                res.status(400).json({ error: "File upload failed" });
                return;
            }
            if (!req.file) {
                res.status(400).json({ error: "No file provided" });
                return;
            }
            try {
                const attachment = await applicationService.uploadAttachment(req.params.id, req.file.path, req.file.originalname);
                fs.unlink(req.file.path, () => { });
                res.status(201).json(attachment);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    },
};
//# sourceMappingURL=application.controller.js.map