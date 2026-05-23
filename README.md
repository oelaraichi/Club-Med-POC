# POC QA Automation - Club Med App

Ce projet est un POC d'automatisation QA pour la page **My Club Med App** :

https://www.clubmed.fr/l/my-club-med-app

Le POC utilise :

- **Playwright** pour l'automatisation UI
- **Gherkin / Cucumber** pour écrire les scénarios BDD
- **Page Object Model** pour séparer la logique métier des sélecteurs
- **Allure Report** pour générer un rapport de test automatique
- **CircleCI** pour exécuter les tests dans une pipeline CI
- **GitHub** pour la gestion du code source

---

## Objectif du POC

L'objectif est de construire une base simple, lisible, maintenable et scalable pour automatiser des tests end-to-end autour de la page Club Med App.

Les premiers scénarios couvrent :

- Le chargement de la page My Club Med App
- La présence du titre principal
- La présence de la section de téléchargement
- La présence des liens App Store et Google Play
- La présence des points d'entrée de connexion
- La présence du point d'entrée de recherche

---

## Architecture du projet

```text
clubmed-qa-poc/
├── .circleci/
│   └── config.yml
├── src/
│   ├── locators/
│   │   ├── home.locators.ts
│   │   ├── login.locators.ts
│   │   └── search.locators.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   └── SearchPage.ts
│   ├── functions/
│   │   ├── auth.functions.ts
│   │   ├── booking.functions.ts
│   │   └── common.functions.ts
│   └── utils/
│       ├── env.ts
│       └── testData.ts
├── tests/
│   ├── features/
│   │   ├── home.feature
│   │   └── booking.feature
│   ├── step-definitions/
│   │   ├── home.steps.ts
│   │   └── booking.steps.ts
│   └── hooks/
│       ├── hooks.ts
│       └── world.ts
├── reports/
│   ├── allure-results/
│   └── allure-report/
├── cucumber.js
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Rôle des dossiers

| Dossier / fichier | Rôle |
|---|---|
| `.circleci/config.yml` | Configuration de la pipeline CircleCI |
| `src/locators` | Centralisation des sélecteurs UI |
| `src/pages` | Page Object Model : actions et assertions par page |
| `src/functions` | Fonctions métier réutilisables |
| `src/utils` | Configuration, variables d'environnement et données de test |
| `tests/features` | Scénarios Gherkin lisibles par le métier |
| `tests/step-definitions` | Liaison entre les steps Gherkin et le code TypeScript |
| `tests/hooks` | Initialisation et fermeture du navigateur Playwright |
| `reports/allure-results` | Résultats bruts générés par Allure |
| `reports/allure-report` | Rapport HTML Allure généré |

---

## Prérequis

Installer :

- Node.js 22 ou supérieur
- npm
- Git
- Un compte GitHub
- Un compte CircleCI connecté à GitHub

Vérifier les versions :

```bash
node -v
npm -v
git --version
```

---

## Installation locale

Cloner le repo :

```bash
git clone git@github.com:<ton-user-github>/clubmed-qa-poc.git
cd clubmed-qa-poc
```

Installer les dépendances :

```bash
npm install
```

Installer les navigateurs Playwright :

```bash
npx playwright install
```

Créer le fichier `.env` :

```bash
cp .env.example .env
```

---

## Exécution des tests

Exécuter tous les tests :

```bash
npm run test
```

Exécuter uniquement les tests smoke :

```bash
npm run test:smoke
```

Exécuter les tests en mode visible :

```bash
npm run test:headed
```

Exécuter en mode debug :

```bash
npm run test:debug
```

---

## Rapport Allure

Après l'exécution des tests, générer le rapport :

```bash
npm run allure:generate
```

Ouvrir le rapport :

```bash
npm run allure:open
```

Ou lancer un serveur temporaire Allure :

```bash
npm run allure:serve
```

---

## Création du repository GitHub

### Option 1 : depuis l'interface GitHub

1. Aller sur GitHub
2. Cliquer sur **New repository**
3. Nommer le repo : `clubmed-qa-poc`
4. Choisir `Public` ou `Private`
5. Ne pas initialiser avec README si tu utilises ce projet généré localement
6. Cliquer sur **Create repository**

Puis lancer :

```bash
git init
git add .
git commit -m "Initial QA automation POC with Playwright Cucumber Allure CircleCI"
git branch -M main
git remote add origin git@github.com:<ton-user-github>/clubmed-qa-poc.git
git push -u origin main
```

### Option 2 : avec GitHub CLI

```bash
gh repo create clubmed-qa-poc --private --source=. --remote=origin --push
```

---

## Configuration CircleCI

1. Se connecter à CircleCI
2. Connecter le compte GitHub
3. Importer le projet `clubmed-qa-poc`
4. CircleCI détecte automatiquement `.circleci/config.yml`
5. Lancer la première pipeline

La pipeline exécute les étapes suivantes :

1. Checkout du code
2. Installation des dépendances npm
3. Installation du navigateur Chromium pour Playwright
4. Exécution des tests Cucumber / Playwright
5. Génération du rapport Allure
6. Publication du rapport en artifact CircleCI

---

## Convention de création des tests

### 1. Ajouter les locators

Créer ou compléter un fichier dans `src/locators`.

Exemple :

```ts
export const homeLocators = {
  mainHeading: 'h1',
  appStoreLink: 'a:has-text("App Store")'
};
```

### 2. Ajouter les actions dans une Page Object

Créer ou compléter un fichier dans `src/pages`.

```ts
async expectStoreLinksVisible(): Promise<void> {
  await expect(this.page.locator(homeLocators.appStoreLink).first()).toBeVisible();
}
```

### 3. Ajouter une fonction métier réutilisable

Créer ou compléter un fichier dans `src/functions`.

```ts
export async function verifyDownloadJourneyEntryPoints(page: Page): Promise<void> {
  const homePage = new HomePage(page);
  await homePage.expectDownloadSectionVisible();
  await homePage.expectStoreLinksVisible();
}
```

### 4. Ajouter le scénario Gherkin

Créer ou compléter un fichier `.feature` dans `tests/features`.

```gherkin
Scenario: Vérifier les liens de téléchargement de l'application
  Given je suis sur la page My Club Med App
  Then la section de téléchargement est visible
  And les liens App Store et Google Play sont disponibles
```

### 5. Ajouter les step definitions

Créer ou compléter un fichier dans `tests/step-definitions`.

```ts
Then('les liens App Store et Google Play sont disponibles', async function () {
  await verifyDownloadJourneyEntryPoints(this.page);
});
```

---

## Bonnes pratiques appliquées

- Séparation claire entre locators, pages, fonctions métier et scénarios
- Scénarios Gherkin lisibles par les profils fonctionnels
- Locators centralisés pour faciliter la maintenance
- Fonctions métier réutilisables pour réduire la duplication
- Screenshot automatique en cas d'échec
- Rapport Allure généré automatiquement
- Pipeline CI prête pour GitHub + CircleCI

---

## Roadmap possible

Prochaines évolutions recommandées :

- Ajouter des tests mobile viewport
- Ajouter des tests multi-navigateurs Chromium / Firefox / WebKit
- Ajouter des tags `@smoke`, `@regression`, `@critical`
- Ajouter des tests d'accessibilité basiques
- Ajouter des tests API si des endpoints sont disponibles
- Ajouter une stratégie de données de test
- Publier automatiquement le rapport Allure sur GitHub Pages ou un bucket externe
