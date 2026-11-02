import app from "./app.js";
import { env } from "./config/env.js";
import { testConnection } from "./config/db.js";

app.listen(env.port, async () => {
  console.log(`API MediDoc AI démarrée sur http://localhost:${env.port}`);
  try {
    await testConnection();
  } catch (error) {
    console.error("Connexion à la base impossible :", error.message);
  }
});