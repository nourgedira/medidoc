import { pool } from "../config/db.js";

export async function trouverParEmail(email) {
  const { rows } = await pool.query(
    "SELECT * FROM utilisateurs WHERE email = $1",
    [email]
  );
  return rows[0] ?? null;
}

export async function trouverParId(id) {
  const { rows } = await pool.query(
    "SELECT id, nom, email, role, cree_le FROM utilisateurs WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export async function creerUtilisateur({ nom, email, motDePasseHash }) {
  const { rows } = await pool.query(
    `INSERT INTO utilisateurs (nom, email, mot_de_passe)
     VALUES ($1, $2, $3)
     RETURNING id, nom, email, role, cree_le`,
    [nom.trim(), email.toLowerCase(), motDePasseHash]
  );
  return rows[0];
}