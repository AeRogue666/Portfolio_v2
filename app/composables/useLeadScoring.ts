import { SCORING } from "../../config/scoring";

export function useLeadScoring() {
  function scoreLead(data: {
    projectType: string | null;
    complexity: { pages: string; features: string | any[]; cms: boolean };
    budgetRange: any;
    deadline: string | null;
    businessGoals: string;
    problems: string;
  }) {
    let score = 0;

    // Base du type de projet
    if (data.projectType && SCORING[data.projectType as keyof typeof SCORING])
      score += SCORING[data.projectType as keyof typeof SCORING] ?? 0;

    // Volume de pages
    if (data.complexity?.pages === "31+" || data.complexity?.pages === "11-30") score += 15;
    if (data.complexity?.pages === "4-10" || data.complexity?.pages === "6-10") score += 8;

    // Features & CMS
    if (data.complexity.features?.length) score += data.complexity.features.length * 5;
    if (data.complexity?.cms === true) score += 5;

    // Qualité de l'expression du besoin
    if (data.businessGoals.length > 100) score += 10;
    else if (data.problems?.length > 80) score += 6;
    else if (data.problems?.length > 60) score += 4;

    // Budget
    switch (data.budgetRange) {
      case "8k+":
        score += 35;
        break;
      case "3-8k":
        score += 25;
        break;
      case "1-3k":
        score += 12;
        break;
      case "<1k":
        score += 3;
        break;
    }

    // Matrice Deadline / Budget
    if (data.deadline === "urgent" || data.deadline === "1m") {
      if (data.budgetRange === "8k+" || data.budgetRange === "3-8k") {
        score += 5; // Prioritaire et rentable
      } else {
        score -= 15; // Warning : Risque de sur-sollicitation non rentable
      }
    }

    // Détermination du Tier
    let tier: "low" | "medium" | "high" = "low";
    if (score > 75) tier = "high";
    else if (score >= 40) tier = "medium";

    return { score, tier };
  }

  return { scoreLead };
}
