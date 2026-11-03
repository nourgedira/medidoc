import * as userModel from "../models/userModel.js";
import { AppError } from "../utils/appError.js";

// Afficher tous les utilisateurs
export async function afficherUtilisateurs(req, res) {
    const utilisateurs = await userModel.trouverTous();

    res.json({
        nombre: utilisateurs.length,
        utilisateurs
    });
}

// Afficher un utilisateur par ID
export async function afficherUtilisateur(req, res) {
    const utilisateur = await userModel.trouverParId(req.params.id);

    if (!utilisateur) {
        throw new AppError("Utilisateur introuvable", 404);
    }

    res.json({ utilisateur });
}

// Modifier un utilisateur
export async function modifierUtilisateur(req, res) {
    const { nom, email, role } = req.body;

    if (!nom || nom.trim().length < 2) {
        throw new AppError("Nom invalide", 400);
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new AppError("Email invalide", 400);
    }

    if (!["ADMIN", "USER"].includes(role)) {
        throw new AppError("Rôle invalide", 400);
    }

    const existant = await userModel.trouverParEmail(email);

    if (existant && String(existant.id) !== req.params.id) {
        throw new AppError("Cet email est déjà utilisé", 409);
    }

    const utilisateur = await userModel.modifierUtilisateur(
        req.params.id,
        { nom, email, role }
    );

    if (!utilisateur) {
        throw new AppError("Utilisateur introuvable", 404);
    }

    res.json({
        message: "Utilisateur modifié avec succès",
        utilisateur
    });
}

// Supprimer un utilisateur
export async function supprimerUtilisateur(req, res) {
    if (String(req.utilisateur.id) === req.params.id) {
        throw new AppError("Vous ne pouvez pas supprimer votre propre compte", 400);
    }

    const supprime = await userModel.supprimerUtilisateur(req.params.id);

    if (!supprime) {
        throw new AppError("Utilisateur introuvable", 404);
    }

    res.json({
        message: "Utilisateur supprimé avec succès"
    });
}