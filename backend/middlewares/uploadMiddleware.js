import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const dossierUploads = fileURLToPath(
    new URL("../uploads/", import.meta.url)
);

// Créer uploads s'il n'existe pas
fs.mkdirSync(dossierUploads, { recursive: true });

const stockage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dossierUploads);
    },

    filename: (req, file, cb) => {
        const nomUnique =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(null, nomUnique + ".pdf");
    }
});

const upload = multer({
    storage: stockage,

    limits: {
        fileSize: 20 * 1024 * 1024 // 20 Mo maximum
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Seuls les fichiers PDF sont autorisés"));
        }

        cb(null, true);
    }
});

export default upload;