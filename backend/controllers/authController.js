import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";
import { validerInscription } from "../utils/validators.js";
import * as userModel from "../models/userModel.js";

function genererToken(utilisateur) {
  return jwt.sign(
    { id: utilisateur.id, role: utilisateur.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export async function inscription(req, res) {
  const erreurs = validerInscription(req.body);
  if (erreurs.length > 0) throw new AppError(erreurs.join(" ; "), 400);

  const { nom, email, motDePasse } = req.body;

  const existant = await userModel.trouverParEmail(email.toLowerCase());
  if (existant) throw new AppError("Cet email est déjà utilisé", 409);

  const motDePasseHash = await bcrypt.hash(motDePasse, 10);
  const utilisateur = await userModel.creerUtilisateur({ nom, email, motDePasseHash });

  res.status(201).json({ utilisateur, token: genererToken(utilisateur) });
}

export async function connexion(req, res) {
  const { email, motDePasse } = req.body;
  if (!email || !motDePasse) throw new AppError("Email et mot de passe requis", 400);

  const utilisateur = await userModel.trouverParEmail(email.toLowerCase());
  const valide = utilisateur && (await bcrypt.compare(motDePasse, utilisateur.mot_de_passe));
  if (!valide) throw new AppError("Email ou mot de passe incorrect", 401);

  res.json({
    utilisateur: { id: utilisateur.id, nom: utilisateur.nom, email: utilisateur.email, role: utilisateur.role },
    token: genererToken(utilisateur),
  });
}

export async function moi(req, res) {
  const utilisateur = await userModel.trouverParId(req.utilisateur.id);
  if (!utilisateur) throw new AppError("Utilisateur introuvable", 404);
  res.json({ utilisateur });
}