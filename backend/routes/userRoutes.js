import { Router } from "express";

import {
    afficherUtilisateurs,
    afficherUtilisateur,
    modifierUtilisateur,
    supprimerUtilisateur
} from "../controllers/userController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = Router();

// Toutes les routes nécessitent une authentification ADMIN
router.use(authMiddleware, roleMiddleware("ADMIN"));

router.get("/", afficherUtilisateurs);
router.get("/:id", afficherUtilisateur);
router.put("/:id", modifierUtilisateur);
router.delete("/:id", supprimerUtilisateur);

export default router;