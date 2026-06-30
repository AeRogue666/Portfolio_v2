export type ProjectType =
  | "creation"
  | "refonte"
  | "optimisation"
  | "maintenance"
  | "formation"
  | "message";

export interface LeadState {
  step: number;
  startedAt: string;
  data: {
    projectType: ProjectType | "";
    subType: string;
    complexity: {
      pages: "1-5" | "6-10" | "11-30" | "31+" | "";
      features: string[];
      cms: string;
    };
    formation: {
      hours: number;
      attendees: number;
    };
    maintenance: {
      estimatedInterventions: number;
    };
    businessGoals: string;
    problems: string;
    personNumber: string;
    budgetRange: string;
    trainingFormat: string;
    deadline: string;
    contact: {
      email: string;
      message: string;
    };
  };
}
