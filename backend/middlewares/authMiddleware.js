import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";

export function authMiddleware(req, res, next) {
  const entete = req.headers.authorization;
  if (!entete?.startsWith("Bearer ")) {
    throw new AppError("Authentification requise", 401);
  }
  try {
    const payload = jwt.verify(entete.slice(7), env.jwtSecret);
    req.utilisateur = { id: payload.id, role: payload.role };
    next();
  } catch {
    throw new AppError("Token invalide ou expiré", 401);
  }
}