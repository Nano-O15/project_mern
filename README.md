# LeMauvaisCoin
 
## Fonctionnalités de l'application
 
### 1. Gestion des utilisateurs
- Inscription avec email et mot de passe
- Connexion sécurisée (JWT)
- Déconnexion
- Visualisation de la liste des utilisateurs
- Accès au profil utilisateur
 
### 2. Gestion des annonces
- Création d'une annonce avec :
  - Titre
  - Description
  - Prix
  - Catégorie
  - État du produit
  - Image (URL)
- Modification de ses propres annonces
- Suppression de ses propres annonces
- Visualisation de toutes les annonces
- Visualisation détaillée d'une annonce
 
### 3. Filtres et recherche
- Filtrage des annonces par catégorie
- Catégories disponibles :
  - Console
  - Jeux-Vidéo
  - Électronique
  - Véhicule
  - Immobilier
 
## Étapes pour lancer le projet
 
### 1. Backend
```bash
# Se placer dans le dossier backend
cd backend
 
# Installer les dépendances
npm install
 
# Créer un fichier .env avec :
PORT=8000
MONGODB_URI=mongodb://localhost:27017/lemauvaiscoin
JWT_SECRET=votre_secret
 
# Lancer le serveur
npm start
```
 
### 2. Frontend
```bash
# Se placer dans le dossier frontend
cd frontend/nozoma
 
# Installer les dépendances
npm install
 
# Lancer l'application
npm start
```
 
L'application sera accessible sur : http://localhost:3000
 
 