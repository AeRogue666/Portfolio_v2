export function useLeadScoring() {
  function scoreLead(data: {
    projectType: string | null;
    complexity: { pages: string; features: string | any[]; cms: string };
    budgetRange: any;
    deadline: string | null;
    businessGoals: string;
    problems: string;
  }) {
    let score = 0;
    const typeWeight: Record<string, number> = {
      creation: 25,
      refonte: 30,
      optimisation: 15,
      audit_a11y: 18,
      audit_seo: 18,
      formation: 10,
    };

    if (data.projectType && typeWeight[data.projectType])
      score += typeWeight[data.projectType];

    // Complexity
    if (data.complexity?.pages === "10+") score += 15;
    if (data.complexity?.pages === "4-10") score += 8;
    if (data.complexity?.cms) score += 8;
    if (data.complexity.features?.length)
      score += data.complexity.features.length * 4;

    if (data.businessGoals.length > 30) score += 10;
    if (data.problems?.length > 20) score += 6;

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

    // Deadline logic
    if (data.deadline === "urgent") {
      if (data.budgetRange === "8k+" || data.budgetRange === "3-8k") {
        score += 5;
      } else {
        score -= 10;
      }
    }

    let tier: "low" | "medium" | "high" = "low";
    if (score > 80) tier = "high";
    else if (score >= 45) tier = "medium";

    return { score, tier };
  }

  return { scoreLead };
}
