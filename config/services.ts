export const SERVICES = {
  creation: {
    label: "types.creation",
    hasComplexity: true,
    hasBudget: true,
    hasDeadline: true,
    hasSummary: true,

    subTypes: [
      "subtypes.onepage",
      "subtypes.vitrine",
      "subtypes.professionnel",
      "subtypes.ecommerce",
      "subtypes.reservation",
      "subtypes.custom",
    ],
  },

  refonte: {
    label: "types.refonte",
    subTypes: [
      "subtypes.design",
      "subtypes.performance",
      "subtypes.accessibilite",
      "subtypes.securite",
      "subtypes.fonctionnalite",
    ],
  },

  optimisation: {
    label: "types.optimisation",
    subTypes: ["subtypes.accessibilite", "subtypes.seo", "subtypes.securite", "subtypes.multi"],
  },

  maintenance: {
    label: "types.maintenance",
    subTypes: ["subtypes.onepage", "subtypes.vitrine", "subtypes.professionnel", "subtypes.ecommerce", "subtypes.custom", "subtypes.ponctuelle"]
  },

  audit: {
    label: "types.audit",
    subTypes: ["subtypes.accessibilite", "subtypes.seo", "subtypes.securite", "subtypes.all", "subtypes.audit-flash"],
  },

  formation: {
    label: "types.formation",
    subTypes: ["subtypes.ordinateur", "subtypes.internet", "subtypes.email", "subtypes.securite-numerique", "subtypes.ia", "subtypes.custom"],
  },
};
