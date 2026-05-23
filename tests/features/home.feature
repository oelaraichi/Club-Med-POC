@smoke @home
Feature: Page My Club Med App
  En tant qu'utilisateur Club Med
  Je veux consulter la page My Club Med App
  Afin de découvrir les fonctionnalités et les liens de téléchargement de l'application

  Scenario: Vérifier le chargement de la page My Club Med App
    Given je suis sur la page My Club Med App
    Then la page My Club Med App est affichée correctement

  Scenario: Vérifier les liens de téléchargement de l'application
    Given je suis sur la page My Club Med App
    Then la section de téléchargement est visible
    And les liens App Store et Google Play sont disponibles
