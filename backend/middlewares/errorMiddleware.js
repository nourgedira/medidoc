export function routeIntrouvable(req, res) {
  res.status(404).json({ erreur: "Route introuvable" });
}

export function gestionErreurs(err, req, res, next) {
  const statusCode = err.statusCode ?? 500;
  if (statusCode === 500) console.error(err);
  res.status(statusCode).json({
    erreur: statusCode === 500 ? "Erreur interne du serveur" : err.message,
  });
}