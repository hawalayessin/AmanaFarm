# AMANAFARM

Plateforme de mise en relation pour le secteur agricole en Tunisie — marketplace d'animaux, services, produits et offres de gros.

## Architecture

```
amanafarm/
├── frontend/          # Angular 18 standalone (SPA)
│   ├── src/app/
│   │   ├── components/    # Pages dynamiques (services, products, wholesale...)
│   │   ├── services/      # StateService (signals + CRUD API)
│   │   └── app.component.ts  # Auth, panneaux, routing
│   └── package.json
│
├── backend/           # Spring Boot 3.5.7 + Java 17
│   ├── src/main/java/.../
│   │   ├── controller/     # REST API endpoints
│   │   ├── service/        # Auth, JWT, CRUD services
│   │   ├── model/          # JPA entities
│   │   ├── auth/           # LoginRequest, RegisterRequest, AuthResponse
│   │   └── config/         # SecurityConfig, CorsConfig, GlobalExceptionHandler
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── start.ps1          # Script de démarrage (Windows)
└── README.md
```

## Prérequis

| Outil | Version | Vérification |
|-------|---------|-------------|
| Java | 17+ | `java -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| MySQL | 8.0 | `mysql --version` |
| Maven | 3.8+ (inclus via mvnw.cmd) | — |

## Installation

### 1. Base de données

Assurez-vous que MySQL est en cours d'exécution :

```powershell
# Vérifier le service
Get-Service MySQL80

# Démarrer si arrêté
Start-Service MySQL80

# Créer la base de données (si elle n'existe pas)
mysql -u root -e "CREATE DATABASE IF NOT EXISTS amanafarm_db"
```

### 2. Backend

```powershell
cd backend

# Compiler (première fois ou après modification)
.\mvnw.cmd clean package -DskipTests

# Lancer
java -jar target\amanafarm-backend-0.0.1-SNAPSHOT.jar
```

Le backend démarre sur **http://localhost:8081**.

### 3. Frontend

```powershell
cd frontend

# Installer les dépendances (première fois)
npm install

# Lancer en développement
npm start
```

Le frontend démarre sur **http://localhost:4200**.

### 4. Script de démarrage rapide

```powershell
# Backend uniquement
.\start.ps1

# Backend + frontend
.\start.ps1 -Frontend
```

## API Endpoints

### Authentification

| Méthode | URL | Body |
|---------|-----|------|
| POST | `/api/auth/register` | `{ firstName, lastName, email, phone, password }` |
| POST | `/api/auth/login` | `{ email, password }` |

### CRUD

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/animals` | Liste des annonces animaux |
| POST | `/api/animals` | Ajouter une annonce |
| GET | `/api/workers` | Liste des travailleurs |
| POST | `/api/workers` | Ajouter un travailleur |
| PUT | `/api/workers/{id}` | Modifier un travailleur |
| DELETE | `/api/workers/{id}` | Supprimer un travailleur |
| GET | `/api/profiles` | Profils professionnels |
| POST | `/api/profiles` | Ajouter un profil |
| DELETE | `/api/profiles/{id}` | Supprimer un profil |
| GET | `/api/service-requests` | Demandes de services |
| POST | `/api/service-requests` | Ajouter une demande |
| DELETE | `/api/service-requests/{id}` | Supprimer une demande |
| GET | `/api/jobs` | Offres d'emploi |
| POST | `/api/jobs` | Ajouter une offre |
| DELETE | `/api/jobs/{id}` | Supprimer une offre |
| GET | `/api/products` | Produits agricoles |
| POST | `/api/products` | Ajouter un produit |
| DELETE | `/api/products/{id}` | Supprimer un produit |
| GET | `/api/wholesale` | Articles en gros |
| POST | `/api/wholesale` | Ajouter un article |
| DELETE | `/api/wholesale/{id}` | Supprimer un article |

## Résolution de problèmes

### "Port 8081 already in use"

Le processus Java précédent n'a pas été tué. Utilisez `start.ps1` qui libère le port automatiquement, ou :

```powershell
# Trouver et tuer le processus sur le port 8081
$p = Get-NetTCPConnection -LocalPort 8081 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $p -Force
```

### "No operations allowed after connection closed"

MySQL a été redémarré mais les connexions du pool HikariCP sont devenues obsolètes. Redémarrez le backend.

### La page blanche / Erreur de build Angular

```powershell
cd frontend
npm install
npm run build
```
