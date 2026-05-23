export const homeLocators = {
  mainHeading: 'h1',
  downloadSectionByText: 'text=Télécharger',
  appStoreLink: 'a:has-text("App Store")',
  googlePlayLink: 'a:has-text("Google Play")',
  cookieConsentButton: [
    'button:has-text("Accepter")',
    'button:has-text("Tout accepter")',
    'button:has-text("Continuer sans accepter")',
    '#onetrust-accept-btn-handler'
  ]
};
