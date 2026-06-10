import { authService } from "../services/auth.service.js";
export const authController = {
    async register(req, res) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async sendOtp(req, res) {
        try {
            const { identifier, purpose } = req.body;
            const result = await authService.sendOtp(identifier, purpose);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async verifyOtpAndRegister(req, res) {
        try {
            const { identifier, code, ...registrationData } = req.body;
            const result = await authService.verifyOtpAndRegister(identifier, code, registrationData);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async login(req, res) {
        try {
            const { identifier, code } = req.body;
            const result = await authService.verifyOtpAndLogin(identifier, code);
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async adminLogin(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.adminLogin(email, password);
            res.json(result);
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    },
    async profile(req, res) {
        try {
            const user = await authService.getProfile(req.user.id);
            res.json(user);
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
};
//# sourceMappingURL=auth.controller.js.map