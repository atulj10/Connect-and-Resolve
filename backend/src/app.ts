import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api", routes);

  app.use(errorHandler);

  return app;
}
