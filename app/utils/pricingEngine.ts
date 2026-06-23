import { PRICING_CONFIG } from "../../config/pricing";

interface LeadData {
  projectType: string;
  subType: string;
  complexity: {
    pages: string;
    features: string[];
    cms: string;
  };
}

export function calculatePrice(data: LeadData): { min: number; max: number } {
  const type = data.projectType;
  if (!type || type === "message") return { min: 0, max: 0 };

  let total =
    PRICING_CONFIG.basePrices[type as keyof typeof PRICING_CONFIG.basePrices] ||
    0;
  total +=
    PRICING_CONFIG.subTypeModifiers[
      data.subType as keyof typeof PRICING_CONFIG.subTypeModifiers
    ] || 0;

  if (type === "formation") return { min: total, max: total };

  if (data.complexity.pages) {
    total +=
      PRICING_CONFIG.complexity.perPage[
        data.complexity.pages as keyof typeof PRICING_CONFIG.complexity.perPage
      ] || 0;
  }

  if (data.complexity.features && data.complexity.features.length > 0) {
    data.complexity.features.forEach((featureName) => {
      total ==
        PRICING_CONFIG.complexity.featuresPrices[
          featureName as keyof typeof PRICING_CONFIG.complexity.featuresPrices
        ] || 0;
    });
  }

  if (data.complexity.cms) {
    const multiplier =
      PRICING_CONFIG.complexity.cmsMultiplier[
        data.complexity
          .cms as keyof typeof PRICING_CONFIG.complexity.cmsMultiplier
      ] || 0;
    total = total * multiplier;
  }

  return {
    min: Math.round(total * 0.95),
    max: Math.round(total * 1.1),
  };
}
