
import * as documentModel from "../models/documentModel.js";
import { AppError } from "../utils/appError.js";
import { extraireTextePDF } from "../services/pdfService.js";

export async function ajouterDocument(req, res) {
    if (!req.file) {
        throw new AppError("Veuillez sélectionner un fichier PDF", 400);
    }

    const titre = req.body.titre?.trim();

    if (!titre || titre.length < 2) {
        throw new AppError("Le titre doit contenir au moins 2 caractères", 400);
    }

    try {
        // 1. Extraire le texte et le nombre de pages
        const resultatPDF = await extraireTextePDF(req.file.filename);

        // 2. Enregistrer les informations du document
        const document = await documentModel.creerDocument({
            titre,
            nomFichier: req.file.originalname,
            cheminFichier: req.file.filename,
            tailleOctets: req.file.size,
            proprietaireId: req.utilisateur.id
        });

        // 3. Mettre à jour le nombre de pages
        const documentMisAJour =
            await documentModel.modifierNombrePages(
                document.id,
                resultatPDF.nombrePages
            );

        res.status(201).json({
            message: "PDF ajouté et analysé avec succès",
            document: documentMisAJour,
            texteExtrait: resultatPDF.texte
        });

    } catch (error) {
        const fs = await import("node:fs/promises");
        const path = await import("node:path");
        const { fileURLToPath } = await import("node:url");

        const dossierUploads = fileURLToPath(
            new URL("../uploads/", import.meta.url)
        );

        await fs.unlink(path.join(dossierUploads, req.file.filename))
            .catch(() => {});

        throw error;
    }
}

export async function afficherMesDocuments(req, res) {
    const documents =
        await documentModel.trouverDocumentsParUtilisateur(req.utilisateur.id);

    res.json({
        nombre: documents.length,
        documents
    });
}
