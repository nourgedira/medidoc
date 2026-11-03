import { pool } from "../config/db.js";

// Trouver un utilisateur par email
export async function trouverParEmail(email) {
  const { rows } = await pool.query(
      "SELECT * FROM utilisateurs WHERE email = $1",
      [email]
  );
  return rows[0] ?? null;
}

// Trouver un utilisateur par ID
export async function trouverParId(id) {
  const { rows } = await pool.query(
      `SELECT id, nom, email, role, cree_le
     FROM utilisateurs WHERE id = $1`,
      [id]
  );
  return rows[0] ?? null;
}

// Créer un utilisateur
export async function creerUtilisateur({ nom, email, motDePasseHash }) {
  const { rows } = await pool.query(
      `INSERT INTO utilisateurs (nom, email, mot_de_passe)
       VALUES ($1, $2, $3)
         RETURNING id, nom, email, role, cree_le`,
      [nom.trim(), email.toLowerCase(), motDePasseHash]
  );
  return rows[0];
}

// Récupérer tous les utilisateurs
export async function trouverTous() {
  const { rows } = await pool.query(
      `SELECT id, nom, email, role, cree_le
     FROM utilisateurs
     ORDER BY id DESC`
  );
  return rows;
}

// Modifier un utilisateur
export async function modifierUtilisateur(id, { nom, email, role }) {
  const { rows } = await pool.query(
      `UPDATE utilisateurs
     SET nom = $1, email = $2, role = $3
     WHERE id = $4
     RETURNING id, nom, email, role, cree_le`,
      [nom.trim(), email.toLowerCase(), role, id]
  );
  return rows[0] ?? null;
}

// Supprimer un utilisateur
export async function supprimerUtilisateur(id) {
  const { rowCount } = await pool.query(
      "DELETE FROM utilisateurs WHERE id = $1",
      [id]
  );
  return rowCount > 0;
}