export const PRICING_CONFIG = {
  // Prix de base par type de projet
  basePrices: {
    creation: 500,
    refonte: 800,
    optimisation: 250, // (ex: audit_a11y, audit_seo)
    audit_a11y: 250,
    audit_seo: 250,
    maintenance: 30, // Par intervention / mensuel
    formation: 50, // Par heure et par personne
    message: 0,
  },
  subTypeModifiers: {
    vitrine: 0,
    ecommerce: 500,
    reservation: 300,
    custom: 600,
    accessibilite: 150,
    seo: 100,
    securite: 100,
    "audit-accessibilite": 200,
    "audit-seo": 150,
    "audit-securite": 150,
    ordinateur: 0,
    internet: 0,
    email: 0,
    "securite-numerique": 20,
    ia: 40,
    "formation-custom": 50,
  },
  // Multiplicateurs ou coûts additionnels par complexité
  complexity: {
    // Prix par page estimée
    perPage: {
      "1-5": 0, // Inclus dans le prix de base
      "6-10": 200,
      "11-30": 600,
      "31+": 2000,
    },
    // Prix forfaitaire par fonctionnalité complexe
    featuresPrices: {
      "Paiement en ligne": 400,
      "Espace client": 300,
      "Multilingue": 200,
      "Blog": 150,
      "Automatisation": 300,
      "API externe": 400,
    },
    // Multiplicateur selon le CMS / Stack (si applicable)
    cmsMultiplier: {
      gitbased_cms: 1.0, // Sveltia CMS, Nuxt Content, etc.
      headless_nuxt: 1.20, // Directus, Strapi, etc.
      wordpress: 1.25, // "Taxe" maintenance/intégration
      shopify: 1.15,
      drupal: 1.25,
      wix_squarespace: 1.4,
    },
  },
};
