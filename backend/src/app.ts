import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  const allowedOrigins = [
    "http://localhost:8080",
    "https://uddarms.cloud",
  ];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/uploads", express.static(env.storage.uploadDir));
  app.use("/api", routes);

  app.use(errorHandler);

  return app;
}
