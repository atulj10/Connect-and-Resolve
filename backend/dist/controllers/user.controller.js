import { userService } from "../services/user.service.js";
export const userController = {
    async list(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const result = await userService.list(page, pageSize);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async search(req, res) {
        try {
            const query = req.query.q;
            if (!query) {
                res.status(400).json({ error: "Search query is required" });
                return;
            }
            const users = await userService.search(query);
            res.json(users);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const user = await userService.getById(req.params.id);
            res.json(user);
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
};
//# sourceMappingURL=user.controller.js.map