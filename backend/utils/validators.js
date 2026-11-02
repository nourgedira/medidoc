export function validerInscription({ nom, email, motDePasse }) {
  const erreurs = [];
  if (!nom || nom.trim().length < 2) erreurs.push("Nom invalide (2 caractères minimum)");
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) erreurs.push("Email invalide");
  if (!motDePasse || motDePasse.length < 8) erreurs.push("Mot de passe : 8 caractères minimum");
  return erreurs;
}