import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import { routeIntrouvable, gestionErreurs } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ statut: "ok" });
});

app.use("/api/auth", authRoutes);

app.use(routeIntrouvable);
app.use(gestionErreurs);

export default app;