export function qualifiedContactTemplate(data: {
  qualification: {
    projectType: string | null;
    subType: string | null;
    complexity: Record<string, any>;
    budgetRange: string | null;
    deadline: string | null;
    leadScore: number;
    leadTier: "low" | "medium" | "high";
    createdAt: string | null;
    businessGoals?: string | undefined;
    problems?: string | undefined;
  };
  type: "qualified";
  email: string;
  website?: string | undefined;
  message?: string | undefined;
}) {
  const q = data.qualification;
  const priorityColor =
    q.leadTier === "high"
      ? "#dc2626"
      : q.leadTier === "medium"
        ? "#f59e0b"
        : "#6b7280";

  return `
    <div style="font-family:Manrope,sans-serif;padding:24px;background:#f9fafb;">
      <div style="max-width:40rem;margin:auto;background:#fff,border-radius:0.5rem;padding:1.5rem;">
      <h2 style="margin:0 0 1rem 0;">Nouvelle requête qualifiée de projet</h2>

      <section style="display:flex; flex-direction:columns; align-items:center;">
        <div style="margin-bottom:1rem;">
          <span style="background:${priorityColor}; color:white; padding: 0.375rem 0.75rem; border-radius:1.25rem; font-size:0.75rem; font-weight:bold;">
          ${q.leadTier.toLocaleUpperCase()} PRIORITY
        </span>
        </div>

        <h3>Récapitulatif du projet</h3>

        <ul>
          <li>
            <strong>Type:</strong>
            ${q.projectType}
          </li>
          <li>
            <strong>Nature:</strong>
            ${q.subType}
          </li>
          <li>
            <strong>Estimation Budgétaire:</strong>
            ${q.budgetRange}
          </li>
          <li>
            <strong>Délai:</strong>
            ${q.deadline}
          </li>
          <li>
            <strong>Score estimé:</strong>
            ${q.leadScore}
          </li>
        </ul>

        <h3>Détails complexes</h3>
        <pre style="background:#f3f4f6;padding:0.75rem;border-radius:0.375rem;font-size:0.75rem;">
          ${JSON.stringify(q.complexity, null, 2)}
        </pre>

        ${
          q.businessGoals
            ? `<h3>Objectifs business:</h3><p>${q.businessGoals}</p>`
            : ""
        }

        ${
          q.problems ? `<h3>Problèmes rencontrés:</h3><p>${q.problems}</p>` : ""
        }

        <h3>Contact</h3>
        <p>
        <strong>Email:</strong>
        ${data.email}
        </p>

        ${
          data.message
            ? `<h3>Message additionnel:</h3><p>${data.message}</p>`
            : ""
        }
      </section>
      </div>
    </div>`;
}
