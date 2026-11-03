import { pool } from "../config/db.js";

export async function creerPassages(documentId, passages) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const p of passages) {
      await client.query(
        `INSERT INTO passages (document_id, contenu, numero_page, ordre)
         VALUES ($1, $2, $3, $4)`,
        [documentId, p.contenu, p.numeroPage, p.ordre]
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function compterParDocument(documentId) {
  const { rows } = await pool.query(
    "SELECT COUNT(*)::int AS total FROM passages WHERE document_id = $1",
    [documentId]
  );
  return rows[0].total;
}