import type { Locale } from "@/types/i18n";

export interface AccessibilityReport {
  translations: Record<
    Locale,
    {
      // Résumé
      title: string;
      description: string;

      // Sections
      summaryTitle: string;
      conformanceLabel: string;
      conformableCriteriaLabel: string;
      nonConformitiesLabel: string;
      nonApplicablesLabel: string;
      statusLabel: string;
      conformityTotal: {
        label: string;
        total: string;
        partial: string;
      };
      testEnvironmentTitle: string;

      // Scores
      scoresTitle: string;
      pageLabelCol: string;
      lighthouseCol: string;
      waveCol: string;
      accessibilityCol: string;

      // RGAA
      rgaaTitle: string;
      searchPlaceholder: string;
      thematicFilterLabel: string;
      statusFilterLabel: string;
      allOption: string;
      idCol: string;
      thematicCol: string;
      criterionCol: string;
      statusCol: string;
      pagesCol: string;

      // Use cases
      useCasesTitle: string;
      implementationLabel: string;

      // Corrections
      correctionsTitle: string;
      issueLabel: string;
      solutionLabel: string;
      statusLabel2: string;

      // Environment
      environmentTitle: string;
      screenReadersCategory: string;
      keyboardNavigationCategory: string;
      automatedToolsCategory: string;
      contrastTestCategory: string;

      // Glossary
      glossaryTitle: string;
      termLabel: string;
      definitionLabel: string;

      // Conclusion
      conclusionTitle: string;
      conclusionP1: string;
      conclusionP2: string;
      conclusionP3: string;
      conclusionP4: string;

      // Thématiques RGAA
      thematics: Array<{ id: string; label: string }>;

      // Données du tableau RGAA
      criteria: Array<{
        id: string;
        thematic: string;
        criterion: string;
        status: "C" | "NC" | "NA";
        pages: string[];
      }>;

      pageScores: Array<{
        page: string;
        lighthouse: number;
        wave: number;
        accessibility: string;
      }>;

      // Cas d'usage
      useCases: Array<{
        title: string;
        description: string;
        implementation: string;
      }>;

      // Corrections
      corrections: Array<{
        issue: string;
        solution: string;
        status: string;
      }>;

      // Environnement
      testEnvironment: Array<{
        category: string;
        details: string[];
      }>;

      // Glossaire
      glossary: Array<{
        term: string;
        definition: string;
      }>;
    }
  >;
}
