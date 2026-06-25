export interface SimpleContactPayload {
  email: string;
  message: string;
  website?: string;
  type: string;
}

export interface QualifiedLeadPayload {
  email: string;
  message?: string;
  website?: string;
  type: string;

  qualification?: {
    projectType: string | null;
    subType: string | null;
    complexity: Record<string, any>;
    businessGoals?: string;
    problems?: string;
    budgetRange?: string | null;
    deadline?: string | null;
    leadScore: number;
    leadTier: "low" | "medium" | "high";
  };
}

export type ContactPayload = SimpleContactPayload | QualifiedLeadPayload;
