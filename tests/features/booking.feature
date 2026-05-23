@regression @navigation
Feature: Points d'entrée principaux Club Med
  En tant qu'utilisateur Club Med
  Je veux identifier les points d'entrée importants
  Afin de préparer ou gérer mon séjour

  Scenario: Vérifier les points d'entrée de connexion
    Given je suis sur la page My Club Med App
    Then les points d'entrée de connexion sont visibles

  Scenario: Vérifier le point d'entrée de recherche
    Given je suis sur la page My Club Med App
    Then le point d'entrée de recherche est visible
