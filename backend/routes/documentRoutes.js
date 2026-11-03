import { Router } from "express";

import {
    ajouterDocument,
    afficherMesDocuments
} from "../controllers/documentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

// Toutes les routes nécessitent une connexion
router.use(authMiddleware);

// Ajouter un PDF
router.post("/", upload.single("fichier"), ajouterDocument);

// Afficher mes documents
router.get("/", afficherMesDocuments);

export default router;