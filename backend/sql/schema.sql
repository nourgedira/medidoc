CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS utilisateurs (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'utilisateur'
    CHECK (role IN ('utilisateur', 'admin')),
  cree_le TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  nom_fichier VARCHAR(255) NOT NULL,
  chemin_fichier VARCHAR(500) NOT NULL,
  taille_octets INTEGER NOT NULL,
  nombre_pages INTEGER,
  proprietaire_id INTEGER NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
  cree_le TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS passages (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  contenu TEXT NOT NULL,
  numero_page INTEGER NOT NULL,
  ordre INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  utilisateur_id INTEGER NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  titre VARCHAR(255),
  cree_le TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  reponse TEXT NOT NULL,
  pages_sources INTEGER[] NOT NULL DEFAULT '{}',
  statut_verification VARCHAR(20) NOT NULL DEFAULT 'non_verifiee'
    CHECK (statut_verification IN ('non_verifiee', 'verifiee', 'corrigee', 'abstention')),
  duree_ms INTEGER,
  cree_le TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_erreurs (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  contexte TEXT,
  cree_le TIMESTAMPTZ NOT NULL DEFAULT NOW()
);