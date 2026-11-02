import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ statut: "ok" });
});

export default app;