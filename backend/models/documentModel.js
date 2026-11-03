import { pool } from "../config/db.js";

// Ajouter un document
export async function creerDocument({
                                        titre,
                                        nomFichier,
                                        cheminFichier,
                                        tailleOctets,
                                        proprietaireId
                                    }) {
    const { rows } = await pool.query(
        `INSERT INTO documents
      (titre, nom_fichier, chemin_fichier,
       taille_octets, proprietaire_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [
            titre,
            nomFichier,
            cheminFichier,
            tailleOctets,
            proprietaireId
        ]
    );

    return rows[0];
}

// Afficher les documents d'un utilisateur
export async function trouverDocumentsParUtilisateur(id) {
    const { rows } = await pool.query(
        `SELECT id, titre, nom_fichier, taille_octets,
            nombre_pages, cree_le
     FROM documents
     WHERE proprietaire_id = $1
     ORDER BY cree_le DESC`,
        [id]
    );

    return rows;
}

export async function modifierNombrePages(id, nombrePages) {
    const { rows } = await pool.query(
        `UPDATE documents
     SET nombre_pages = $1
     WHERE id = $2
     RETURNING *`,
        [nombrePages, id]
    );

    return rows[0];
}
