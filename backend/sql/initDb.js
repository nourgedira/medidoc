import fs from "node:fs";
import { pool } from "../config/db.js";

const sql = fs.readFileSync(new URL("./schema.sql", import.meta.url), "utf8");

try {
  await pool.query(sql);
  console.log("Tables créées avec succès");
} catch (error) {
  console.error("Erreur lors de la création des tables :", error.message);
} finally {
  await pool.end();
}