import { AppError } from "../utils/appError.js";

export function roleMiddleware(...rolesAutorises) {
  return (req, res, next) => {
    if (!rolesAutorises.includes(req.utilisateur?.role)) {
      throw new AppError("Accès refusé", 403);
    }
    next();
  };
}