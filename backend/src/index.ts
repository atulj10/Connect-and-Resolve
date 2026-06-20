import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import "dotenv/config";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const app = createApp();

async function bootstrap() {
  try {
    // Attempt Supabase connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    // Soft failure: Log the error but DO NOT call process.exit(1)
    // This allows the port to bind so Hostinger doesn't throw a generic 503 error
    console.error("❌ Database connection failed at startup:", error);
  }

  // Bind to Hostinger's dynamic socket or port
  app.listen(env.port, () => {
    console.log(`🚀 Server initialized successfully`);
    console.log(`🌍 Environment: ${env.nodeEnv}`);
  });
}

bootstrap();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
