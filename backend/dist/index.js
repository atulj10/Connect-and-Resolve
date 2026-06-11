import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import "dotenv/config";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
const app = createApp();
try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
}
catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
}
app.listen(env.port, () => {
    console.log(`🚀 Server running at http://localhost:${env.port}`);
    console.log(`📋 Health check: http://localhost:${env.port}/api/health`);
    console.log(`🌍 Environment: ${env.nodeEnv}`);
});
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=index.js.map