import { Router } from "express";
import { inscription, connexion, moi } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", inscription);
router.post("/login", connexion);
router.get("/me", authMiddleware, moi);

export default router;