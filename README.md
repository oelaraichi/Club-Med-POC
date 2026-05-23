# Club Med App QA POC

Automatisation QA basique pour la page **My Club Med App**.

## Objectif

V�rifier que la page se charge et que les liens de t�l�chargement vers l'App Store et Google Play sont visibles.

## Architecture utilis�e

- **Cucumber** pour les sc�narios BDD (`tests/features/*.feature`, `tests/step-definitions/*.ts`)
- **Playwright** pour piloter le navigateur et v�rifier l'interface
- **Page Object Model** pour s�parer la logique de page (`src/pages`) des helpers (`src/functions`)
- **Allure** pour g�n�rer un rapport de test clair

Structure principale :

```text
src/
  pages/
  functions/
  locators/
  utils/
tests/
  features/
  step-definitions/
  hooks/
cucumber.js
README.md
package.json
```

## Installation

```powershell
npm install
npx playwright install --with-deps chromium
```

## Ex�cution des tests

```powershell
npm test
```

## Rapport Allure

```powershell
npm run allure:generate
npm run allure:open
```

## Page test�e

https://www.clubmed.fr/l/my-club-med-app
