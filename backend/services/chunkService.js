import { pipelineConfig } from "../config/pipeline.js";

export function decouperPage(texte, taille, chevauchement) {
  const propre = texte.replace(/\s+/g, " ").trim();
  if (!propre) return [];
  if (propre.length <= taille) return [propre];

  const morceaux = [];
  let debut = 0;
  while (debut < propre.length) {
    let fin = Math.min(debut + taille, propre.length);
    if (fin < propre.length) {
      const coupure = propre.lastIndexOf(" ", fin);
      if (coupure > debut + taille / 2) fin = coupure;
    }
    morceaux.push(propre.slice(debut, fin).trim());
    if (fin >= propre.length) break;
    debut = Math.max(fin - chevauchement, debut + 1);
  }
  return morceaux;
}

// pages = [{ numeroPage: 1, texte: "..." }, ...]
export function decouperDocument(pages) {
  const { chunkSize, chunkOverlap } = pipelineConfig;
  const passages = [];
  let ordre = 0;
  for (const page of pages) {
    for (const contenu of decouperPage(page.texte, chunkSize, chunkOverlap)) {
      passages.push({ contenu, numeroPage: page.numeroPage, ordre: ordre++ });
    }
  }
  return passages;
}