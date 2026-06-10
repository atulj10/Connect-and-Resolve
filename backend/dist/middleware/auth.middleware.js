import { authService } from "../services/auth.service.js";
export function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Authentication required" });
        return;
    }
    try {
        const token = header.slice(7);
        const payload = authService.verifyToken(token);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
export function requireAdmin(req, res, next) {
    if (req.user?.role !== "ADMIN") {
        res.status(403).json({ error: "Admin access required" });
        return;
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map