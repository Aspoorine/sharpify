# Système d'Authentification Sharpify

## Vue d'ensemble

Ce système d'authentification simple utilise TanStack Query pour gérer l'état côté client et localStorage pour persister le token JWT. **Tous les appels API passent par un service unifié** pour éviter la duplication de code.

## Architecture

### Composants principaux

1. **`apiService.ts`** - Service API unifié avec gestion automatique des tokens
2. **`authService.ts`** - Service d'authentification utilisant apiService
3. **`useAuth.ts`** - Hook personnalisé avec TanStack Query
4. **`SigninPage.tsx`** - Page de connexion simplifiée
5. **`ProtectedRoute.tsx`** - Composant de protection des routes
6. **`App.tsx`** - Configuration des routes et TanStack Query

### Flux d'authentification

1. **Connexion** : L'utilisateur saisit email/password → appel à `/auth/login` → stockage du token
2. **Vérification** : À chaque chargement, vérification automatique via `/auth/me`
3. **Protection** : Routes protégées redirigent vers `/signin` si non authentifié
4. **Déconnexion** : Suppression du token et nettoyage du cache

## Fonctionnalités

### ✅ Implémentées

-   [x] Formulaire de connexion simple (email/password)
-   [x] Stockage du token JWT dans localStorage
-   [x] Vérification automatique de l'authentification
-   [x] Protection des routes
-   [x] Bouton de déconnexion dans la sidebar
-   [x] Gestion des erreurs avec toast notifications
-   [x] **Service API unifié** avec intercepteurs automatiques
-   [x] Types TypeScript centralisés

### 🔄 Gestion automatique

-   **Token expiré** : Déconnexion automatique et redirection
-   **Requêtes API** : Inclusion automatique du token dans les headers
-   **Cache** : Invalidation automatique lors de la déconnexion
-   **Intercepteurs** : Gestion centralisée dans apiService

## Service API Unifié

### `apiService.ts`

```typescript
// Instance axios configurée avec intercepteurs
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Intercepteur automatique pour ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour gérer les erreurs 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);
```

### Utilisation dans les services

```typescript
// ✅ Correct - Utilise le service unifié
import { apiService } from './apiService';

export async function getData() {
    const response = await apiService.instance.get('/api/data');
    return response.data;
}

// ❌ Incorrect - Ne pas créer de nouvelles instances axios
import axios from 'axios';
const api = axios.create({...}); // Éviter cela
```

## Utilisation

### Dans un composant

```typescript
import { useAuth } from "../hooks/useAuth";

function MonComposant() {
    const { user, isAuthenticated, login, logout } = useAuth();

    // Utiliser les données utilisateur
    console.log(user?.email);

    // Vérifier l'authentification
    if (!isAuthenticated) return <div>Non connecté</div>;
}
```

### Protection d'une route

```typescript
<Route
    path="/protected"
    element={
        <ProtectedRoute>
            <MonComposant />
        </ProtectedRoute>
    }
/>
```

## Configuration

### Variables d'environnement

-   `VITE_API_BASE_URL` : URL de l'API backend (défaut: `http://localhost:3000`)

### TanStack Query

-   `staleTime` : 5 minutes
-   `retry` : 1 tentative
-   Cache automatiquement invalidé lors de la déconnexion

## Sécurité

-   Token JWT stocké dans localStorage
-   **Intercepteurs centralisés** dans apiService
-   Gestion des erreurs 401 (token expiré)
-   Redirection automatique vers la page de connexion
-   **Aucune duplication** de gestion des tokens

## Avantages de l'architecture unifiée

1. **DRY (Don't Repeat Yourself)** : Une seule source de vérité pour la gestion des tokens
2. **Maintenance** : Modifications centralisées dans apiService
3. **Cohérence** : Tous les appels API utilisent la même configuration
4. **Sécurité** : Gestion uniforme des erreurs d'authentification
5. **Performance** : Une seule instance axios configurée

## Extensions possibles

-   [ ] Page d'inscription
-   [ ] Récupération de mot de passe
-   [ ] Refresh token
-   [ ] Rôles et permissions
-   [ ] Session timeout
-   [ ] Remember me
