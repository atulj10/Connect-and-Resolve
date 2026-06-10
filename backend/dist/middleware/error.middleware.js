export function errorHandler(err, _req, res, _next) {
    console.error("[Error]", err.message);
    const status = err.message.includes("not found") ? 404
        : err.message.includes("already") ? 409
            : err.message.includes("Invalid") || err.message.includes("required") || err.message.includes("valid") ? 400
                : 500;
    res.status(status).json({ error: err.message || "Internal server error" });
}
//# sourceMappingURL=error.middleware.js.map