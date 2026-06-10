import { analyticsService } from "../services/analytics.service.js";
export const analyticsController = {
    async citizenAnalytics(req, res) {
        try {
            const range = (req.query.range || "year");
            const stats = await analyticsService.citizenAnalytics(req.user.id, range);
            res.json(stats);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async adminAnalytics(req, res) {
        try {
            const range = (req.query.range || "year");
            const stats = await analyticsService.adminAnalytics(range);
            res.json(stats);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
//# sourceMappingURL=analytics.controller.js.map