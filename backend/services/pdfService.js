import { PDFParse } from "pdf-parse";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dossierUploads = fileURLToPath(
    new URL("../uploads/", import.meta.url)
);

export async function extraireTextePDF(nomFichier) {
    const cheminFichier = path.join(dossierUploads, nomFichier);

    const buffer = await fs.readFile(cheminFichier);

    const parser = new PDFParse({ data: buffer });

    try {
        const resultat = await parser.getText();
        const informations = await parser.getInfo();

        return {
            texte: resultat.text,
            nombrePages: informations.total
        };
    } finally {
        await parser.destroy();
    }
}