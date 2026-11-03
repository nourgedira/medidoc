import test from "node:test";
import assert from "node:assert/strict";
import { decouperDocument } from "../../services/chunkService.js";

test("garde le numéro de page de chaque passage", () => {
  const pages = [
    { numeroPage: 1, texte: "Texte de la page un." },
    { numeroPage: 2, texte: "mot ".repeat(500) },
  ];
  const passages = decouperDocument(pages);
  assert.equal(passages[0].numeroPage, 1);
  assert.ok(passages.filter((p) => p.numeroPage === 2).length > 1);
});

test("ignore les pages vides", () => {
  assert.equal(decouperDocument([{ numeroPage: 1, texte: "   " }]).length, 0);
});