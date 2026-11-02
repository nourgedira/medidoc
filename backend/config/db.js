import pg from "pg";
import { env } from "./env.js";

export const pool = new pg.Pool({ connectionString: env.databaseUrl });

export async function testConnection() {
  const result = await pool.query("SELECT NOW()");
  console.log("Base de données connectée :", result.rows[0].now);
}