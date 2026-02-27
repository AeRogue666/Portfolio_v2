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

export const accessibilityReport: AccessibilityReport = {
  translations: {
    fr: {
      title: "Rapport d'accessibilité",
      description: "Audit complet RGAA 4 et WCAG 2.1 Level AAA du portfolio",
      summaryTitle: "Résumé Exécutif",
      conformanceLabel: "Conformité globale",
      conformableCriteriaLabel: "Critères conformes",
      nonConformitiesLabel: "Critères non-conformes",
      nonApplicablesLabel: "Critères non-applicables",
      statusLabel: "Statut",
      conformityTotal: {
        label: "Conformité",
        total: "Totale",
        partial: "Partielle",
      },
      testEnvironmentTitle: "Environnement de test",
      scoresTitle: "Scores par Page",
      pageLabelCol: "Page",
      lighthouseCol: "Lighouse A11y",
      waveCol: "WAVE",
      accessibilityCol: "Accessibilité",
      rgaaTitle: "Tableau RGAA 4 - 85 Critères",
      searchPlaceholder: "ID ou texte du critère...",
      thematicFilterLabel: "Thématique",
      statusFilterLabel: "Statut",
      allOption: "Toutes",
      idCol: "ID",
      thematicCol: "Thématique",
      criterionCol: "Critère",
      statusCol: "Statut",
      pagesCol: "Pages",
      useCasesTitle: "Points Complexes -Cas d'Usage",
      implementationLabel: "Implémentation:",
      correctionsTitle: "Journal des Anomalies et Corrections",
      issueLabel: "Anomalie",
      solutionLabel: "Solution:",
      statusLabel2: "Statut",
      environmentTitle: "Environnement de Test Détaillée",
      screenReadersCategory: "Lecteurs d'écran",
      keyboardNavigationCategory: "Navigation clavier",
      automatedToolsCategory: "Outils automatisés",
      contrastTestCategory: "Test de contraste",
      glossaryTitle: "Glossaire Technique",
      termLabel: "Terme",
      definitionLabel: "Définition",
      conclusionTitle: "Conclusion",
      conclusionP1:
        "Ce rapport et les scores d'audit automatisés ne sont que le reflet d'une intention. La véritable valeur de l'accessibilité réside dans l'usage réel.",
      conclusionP2:
        "J'invite les recruteurs, développeurs et experts Ally à parcourir ce portfolio en utilisant uniquement le clavier (Tab, Enter, Escape) ou en activant un lecteur d'écran (NVDA sur Windows ou Talkback sur mobile).",
      conclusionP3:
        "Vous constaterez que la hiérarchie de l'information, la gestion du focus et les annonces dynamiques ne sont pas des correctifs de dernière minute, mais le fruit d'une architecture pensée pour tous dès le premier composant.",
      conclusionP4:
        "Si vous souhaitez échanger sur les méthodes de test ou les choix techniques effectués pour garantir ce niveau de conformité, je reste à votre entière disposition.",
      thematics: [
        { id: "images", label: "Images" },
        { id: "colors", label: "Couleurs" },
        { id: "forms", label: "Formulaires" },
        { id: "navigation", label: "Navigation" },
        { id: "consultation", label: "Consultation" },
        { id: "elements", label: "Éléments" },
        { id: "scripts", label: "Scripts" },
        { id: "mandatory", label: "Structuration" },
        { id: "presentation", label: "Présentation" },
        { id: "multimedia", label: "Multimédia" },
        { id: "temporal", label: "Contenus temporels" },
        { id: "language", label: "Langue" },
        { id: "links", label: "Liens et navigation" },
      ],
      criteria: [
        {
          id: "1.1",
          thematic: "images",
          criterion: "Chaque image a-t-elle une alternative textuelle?",
          status: "C",
          pages: [
            "Index",
            "Projects",
            "Updates",
            "About",
            "Accessibility",
            "Report",
            "404",
          ],
        },
        {
          id: "1.2",
          thematic: "images",
          criterion:
            "Pour chaque image porteuse d'information, l'alternative textuelle est-elle pertinente?",
          status: "C",
          pages: ["Index", "Projects", "Updates", "About"],
        },
        {
          id: "1.3",
          thematic: "images",
          criterion:
            "Pour chaque bouton porteur d'information, l'alternative textuelle est-elle pertinente?",
          status: "C",
          pages: ["Index", "About", "Accessibility", "Report", "404"],
        },
        {
          id: "3.1",
          thematic: "colors",
          criterion: "L'information est-elle donnée par la couleur seule?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "3.2",
          thematic: "colors",
          criterion:
            "Le contraste (texte/fond) est-il suffisant? (Ratio 7:1 AAA)",
          status: "C",
          pages: ["All"],
        },
        {
          id: "11.1",
          thematic: "forms",
          criterion: "Chaque champ de formulaire a-t-il une étiquette (label)?",
          status: "C",
          pages: ["Report"],
        },
        {
          id: "11.2",
          thematic: "forms",
          criterion:
            "Chaque étiquette est-elle correctement associée à son champ?",
          status: "C",
          pages: ["Report"],
        },
        {
          id: "11.3",
          thematic: "forms",
          criterion:
            "Les messages d'erreur sont-ils explicites et accessibles?",
          status: "C",
          pages: ["Report"],
        },
        {
          id: "12.1",
          thematic: "navigation",
          criterion: "Existe-t-il un lien d'évitement (skip-link) fonctionnel?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.2",
          thematic: "navigation",
          criterion: "La prise de focus est-elle visible?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.3",
          thematic: "navigation",
          criterion: "La navigation au clavier est-elle possible?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.4",
          thematic: "navigation",
          criterion:
            "Le focus est-il piégé dans les modales et panneaux ? (Focus Trap)",
          status: "C",
          pages: ["Index", "Accessibility", "Report"],
        },
        {
          id: "12.5",
          thematic: "navigation",
          criterion: "L'ordre de tabulation est-il logique?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "7.1",
          thematic: "consultation",
          criterion: "La sémantique HTML5 est-elle correctement utilisée?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "7.2",
          thematic: "consultation",
          criterion: "Les rôles ARIA sont-ils appropriés?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "7.3",
          thematic: "consultation",
          criterion: "Les annonces live (aria-live) fonctionnent-elles ?",
          status: "C",
          pages: ["Index"],
        },
        {
          id: "2.1",
          thematic: "elements",
          criterion: "Les boutons ont-ils un texte accessible?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "2.2",
          thematic: "elements",
          criterion: "Les liens sont-ils distinguables des autres contenus?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "8.1",
          thematic: "mandatory",
          criterion: "La page a-t-elle un titre (title) pertinent?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "8.2",
          thematic: "mandatory",
          criterion: "La hiérarchie des titres (h1-h6) est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "8.3",
          thematic: "mandatory",
          criterion: "L'attribut lang est-il déclaré sur l'élément <html>?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "10.1",
          thematic: "presentation",
          criterion: "L'information reste-t-elle compréhensible sans CSS?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "10.2",
          thematic: "presentation",
          criterion:
            "Le zoom 200% ne casse-t-il pas la mise en page (Responsive)?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "10.3",
          thematic: "presentation",
          criterion:
            "Les éléments de texte sont-ils lisibles et conformes WCAG AAA ?",
          status: "C",
          pages: ["All"],
        },
      ],
      pageScores: [
        { page: "Index", lighthouse: 96, wave: 10, accessibility: "100%" },
        {
          page: "Projects/[slug]",
          lighthouse: 100,
          wave: 10,
          accessibility: "100%",
        },
        {
          page: "Updates/[slug]",
          lighthouse: 100,
          wave: 10,
          accessibility: "100%",
        },
        { page: "About", lighthouse: 96, wave: 10, accessibility: "100%" },
        {
          page: "Accessibility Statement",
          lighthouse: 100,
          wave: 10,
          accessibility: "100%",
        },
        { page: "Report", lighthouse: 97, wave: 10, accessibility: "100%" },
        { page: "404", lighthouse: 94, wave: 10, accessibility: "96%" },
        { page: "Rapport d'accessibilité", lighthouse: 100, wave: 10, accessibility: '100' },
      ],
      useCases: [
        {
          title: "Système de filtrage dynamique (Index)",
          description:
            'Les filtres de tags et tri utilisent des ARIA Live Regions (aria-live="polite"). Lors d\'une recherche ou changement de filtre, le nombre de résultats mis à jour est immédiatement annoncé vocalement sans interrompre la navigation',
          implementation:
            "useFeed composable + FeedFilters avec aria-live sur les annonces de résultats",
        },
        {
          title: "Focus Trap dans les panneaux (FeedFilters)",
          description:
            "Le panel de filtres implémente un focus trap qui confine la navigation au clavier à l'intérieur du panel. Tab sur le dernier élément revient au premier, et Escape ferme le panel.",
          implementation:
            "@vueuse/integrations useFocusTrap + gestion manuelle Tab/Shift+Tab",
        },
        {
          title: "Navigation au clavier sans souris",
          description:
            "Toute l'application est navigable au clavier: Tab pour naviguer, Enter/Space pour activer, Escape pour fermer. Les sidebars desktop utilisent un focus trap, les modales mobiles utilisent UDrawer avec gestion native du focus.",
          implementation:
            "Combinaison de sémantique HTML5 + ARIA roles + événements keydown",
        },
        {
          title: "Mode Grayscale pour accessibilité visuelle",
          description:
            "Un toggle dans la SidebarRight permet d'activer le mode grayscale. Cela convertit tous les éléments d'interface en nuances de gris pour tester l'accessibilité sans dépendre de la couleur.",
          implementation:
            "Store Pinia (accessibilityStore) + computed grayscale appliqué sur les éléments critiques",
        },
        {
          title: "Skip-link fonctionnel",
          description:
            "Un skip-link en haut de page permet de passer directement au contenu principal (#main-content). Invisible par défaut, il devient visible et focusable au premier Tab.",
          implementation: 'sr-only + focus:top-0 + href="#main-content"',
        },
      ],
      corrections: [
        {
          issue: "Sidebar Left Accessible name manquant",
          solution:
            'Ajout de aria-label="Navigation principale" au <aside role="dialog">',
          status: "Corrigé",
        },
        {
          issue: "Feed-title dupliqué en desktop/mobile",
          solution:
            "Séparation en feed-title-desktop et feed-title-mobile avec aria-labelledby approprié",
          status: "Corrigé",
        },
        {
          issue: "USelect sans label associé (page Report)",
          solution:
            'Implementation du pattern: <label id="X"> + <USelect aria-labelledby="X">',
          status: "Corrigé",
        },
        {
          issue: "Skip-link non focusable sur 404",
          solution: "Non applicable page d'erreur avec contenu limité",
          status: "Documenté",
        },
      ],
      testEnvironment: [
        {
          category: "Lecteurs d'écran",
          details: [
            "NVDA 2824.1 (Windows 11 + Chrome & Firefox)",
            "Talkback (Android 12 + Chrome)",
          ],
        },
        {
          category: "Navigation clavier",
          details: [
            "Test complet sans souris",
            "Vérification de l'ordre de tabulation (Tab/Shift+Tab)",
            "Test de la touche Escape pour fermer les panels",
            "Zoom 200% pas de perte de contenu",
          ],
        },
        {
          category: "Outils automatisés",
          details: [
            "Lighthouse Accessibility (scores affichés par page)",
            "WAVE WebAIM Evaluation Tool (10/10 pour la plupart)",
            "Axe DevTools pour détection d'anomalies courantes",
          ],
        },
        {
          category: "Tests de contraste",
          details: [
            "Ratio 7:1 (WCAG AAA) pour tous les textes",
            "Utilisation de variables CSS custom pour garantir la cohérence",
            "Mode Grayscale activable pour vérifier l'indépendance à la couleur",
          ],
        },
      ],
      glossary: [
        {
          term: "ARIA",
          definition:
            "Accessible Rich Internet Applications. Ensemble d'attributs HTML qui communiquent le rôle, l'état et les propriétés des éléments aux technologies d'assistance.",
        },
        {
          term: "RGAA 4",
          definition:
            "Référentiel Général d'Amélioration de l'Accessibilité. Standard français basé sur les WCAG 2.1, structuré en 13 thématiques et 85 critères.",
        },
        {
          term: "WCAG",
          definition:
            "Web Content Accessibility Guidelines. Standard international (W3C) définissant 3 niveaux: A, AA, AAA. Ce portfolio vise AAA.",
        },
        {
          term: "Focus Trap",
          definition:
            "Mécanisme qui confine la navigation au clavier à l'intérieur d'un élément (modale, sidebar) pour éviter une navigation erratique.",
        },
        {
          term: "ARIA Live Region",
          definition:
            "Zone de la page dont les mises à jour sont annoncées automatiquement aux lecteurs d'écran sans recharger la page.",
        },
        {
          term: "Sémantique HTML5",
          definition:
            "Utilisation de balises structurantes (<main>, <nav>, <header>, <footer>) pour communiquer le sens du contenu aux outils d'assistance.",
        },
        {
          term: "Ratio de contraste",
          definition:
            "Mesure de la différence visuelle entre deux couleurs. WCAG AAA requiert un ratio minimum de 7:1 pour le texte normal.",
        },
        {
          term: "Skip-link",
          definition:
            "Lien d'évitement en début de page permettant de passer directement au contenu principal, utile pour la navigation au clavier.",
        },
      ],
    },
    en: {
      title: "Accessibility Report",
      description:
        "Complete RGAA 4 and WCAG 2.1 Level AAA audit of the portfolio",
      summaryTitle: "Executive Summary",
      conformanceLabel: "Global conformance",
      conformableCriteriaLabel: "Compliant criteria",
      nonConformitiesLabel: "Non-conformities",
      nonApplicablesLabel: "Non-applicables",
      statusLabel: "Status",
      conformityTotal: {
        label: "Conformity",
        total: "Total",
        partial: "Partial",
      },
      testEnvironmentTitle: "Test environment",
      scoresTitle: "Scores by Page",
      pageLabelCol: "Page",
      lighthouseCol: "Lighthouse A11y",
      waveCol: "WAVE",
      accessibilityCol: "Accessibility",
      rgaaTitle: "RGAA 4 Table - 85 Criteria",
      searchPlaceholder: "ID or criterion text...",
      thematicFilterLabel: "Thematic",
      statusFilterLabel: "Status",
      allOption: "All",
      idCol: "ID",
      thematicCol: "Thematic",
      criterionCol: "Criterion",
      statusCol: "Status",
      pagesCol: "Pages",
      useCasesTitle: "Complex Points - Use Cases",
      implementationLabel: "Implementation",
      correctionsTitle: "Anomalies and Corrections Log",
      issueLabel: "Anomaly",
      solutionLabel: "Solution",
      statusLabel2: "Status",
      environmentTitle: "Detailed Test Environment",
      screenReadersCategory: "Screen readers",
      keyboardNavigationCategory: "Keyboard navigation",
      automatedToolsCategory: "Automated tools",
      contrastTestCategory: "Contrast tests",
      glossaryTitle: "Technical Glossary",
      termLabel: "Term",
      definitionLabel: "Definition",
      conclusionTitle: "Conclusion",
      conclusionP1:
        "This report and automated audit scores are only a reflection of intention. The true value of accessibility lies in actual usage.",
      conclusionP2:
        "I invite recruiters, developers, and A11y experts to browser this portfolio using only the keyboard (Tab, Enter, Escape) or by enabling a screen reader (NVDA on Windows, or Talkback on mobile).",
      conclusionP3:
        "You will find that information hierarchy, focus management, and dynamic announcements are not last-minute fixes, but the result of an architecture designed for everyone from the first component.",
      conclusionP4:
        "If you would like to discuss the testing methods or technical choices made to ensure this level of compliance, I remain at your entire disposal.",
      thematics: [
        { id: "images", label: "Images" },
        { id: "colors", label: "Colors" },
        { id: "forms", label: "Forms" },
        { id: "navigation", label: "Navigation" },
        { id: "consultation", label: "Consultation" },
        { id: "elements", label: "Elements" },
        { id: "scripts", label: "Scripts" },
        { id: "mandatory", label: "Structure" },
        { id: "presentation", label: "Presentation" },
        { id: "multimedia", label: "Multimedia" },
        { id: "temporal", label: "Temporal content" },
        { id: "language", label: "Language" },
        { id: "links", label: "Links and navigation" },
      ],
      criteria: [
        {
          id: "1.1",
          thematic: "images",
          criterion: "Does each image have text alternative?",
          status: "C",
          pages: [
            "Index",
            "Projects",
            "Updates",
            "About",
            "Accessibility",
            "Report",
            "404",
          ],
        },
        {
          id: "1.2",
          thematic: "images",
          criterion:
            "For each meaningful image, is the text alternative appropriate?",
          status: "C",
          pages: ["Index", "Projects", "Updates", "About"],
        },
        {
          id: "1.3",
          thematic: "images",
          criterion:
            "For each meaningful button, is the text alternative appropriate?",
          status: "C",
          pages: ["Index", "About", "Accessibility", "Report", "404"],
        },
        {
          id: "3.1",
          thematic: "colors",
          criterion: "Is information conveyed by color alone?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "3.2",
          thematic: "colors",
          criterion:
            "Is contrast (text/background) sufficient? (7:1 ratio AAA)",
          status: "C",
          pages: ["All"],
        },
        {
          id: "11.1",
          thematic: "forms",
          criterion: "Does each form field have a label?",
          status: "C",
          pages: ["Report"],
        },
        {
          id: "11.2",
          thematic: "forms",
          criterion: "Is each label correctly associated with its field?",
          status: "C",
          pages: ["Report"],
        },
        {
          id: "11.3",
          thematic: "forms",
          criterion: "Are error messages explicit and accessible?",
          status: "C",
          pages: ["Report"],
        },
        {
          id: "12.1",
          thematic: "navigation",
          criterion: "Is there a functional skip link?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.2",
          thematic: "navigation",
          criterion: "Is focus focus visible?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.3",
          thematic: "navigation",
          criterion: "Is keyboard navigation possible?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.4",
          thematic: "navigation",
          criterion: "Is focus trapped in modals and panels? (Focus Trap)",
          status: "C",
          pages: ["Index", "Accessibility", "Report"],
        },
        {
          id: "12.5",
          thematic: "navigation",
          criterion: "Is the tab order logical?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "7.1",
          thematic: "consultation",
          criterion: "Is HTML5 semantics correctly used?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "7.2",
          thematic: "consultation",
          criterion: "Are ARIA roles appropriate?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "7.3",
          thematic: "consultation",
          criterion: "Do live announcements (aria-live) work?",
          status: "C",
          pages: ["Index"],
        },
        {
          id: "2.1",
          thematic: "elements",
          criterion: "Do buttons have accessible text?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "2.2",
          thematic: "elements",
          criterion: "Are links distinguishable from other content?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "8.1",
          thematic: "mandatory",
          criterion: "Does the page have a relevant title?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "8.2",
          thematic: "mandatory",
          criterion: "Is the heading hierarchy (h1-h6) respected?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "8.3",
          thematic: "mandatory",
          criterion: "Is the lang attribute declared on <html>?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "10.1",
          thematic: "presentation",
          criterion: "Does content remain understandable without CSS?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "10.2",
          thematic: "presentation",
          criterion: "Does 200% zoom break the layout (Responsive)?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "10.3",
          thematic: "presentation",
          criterion: "Is text readable and WCAG AAA compliant?",
          status: "C",
          pages: ["All"],
        },
      ],
      pageScores: [
        { page: "Index", lighthouse: 96, wave: 10, accessibility: "100%" },
        {
          page: "Projects/[slug]",
          lighthouse: 100,
          wave: 10,
          accessibility: "100%",
        },
        {
          page: "Updates/[slug]",
          lighthouse: 100,
          wave: 10,
          accessibility: "100%",
        },
        { page: "About", lighthouse: 96, wave: 10, accessibility: "100%" },
        {
          page: "Accessibility Statement",
          lighthouse: 100,
          wave: 10,
          accessibility: "100%",
        },
        { page: "Report", lighthouse: 97, wave: 10, accessibility: "100%" },
        { page: "404", lighthouse: 94, wave: 10, accessibility: "96%" },
        { page: "Accessibility report", lighthouse: 100, wave: 10, accessibility: '100' },
      ],
      useCases: [
        {
          title: "Dynamic filtering system (Index)",
          description:
            'Tag and sorting filters use ARIA Live Regions (aria-live="polite"). When searching or changing filters, updated result count is immediately announced to screen readers without interrupting navigation.',
          implementation:
            "useFeed composable + FeedFilters with aria-live on result announcements",
        },
        {
          title: "Focus trap in panels (FeedFilters)",
          description:
            "The filter panel implements a focus trap that confines keyboard navigation within the panel. Tabbing on the last element returns to the first, and Escape closes the panel.",
          implementation:
            "@vueuse useFocusTrap + manual Tab/Shift+Tab handling",
        },
        {
          title: "Keyboard-only navigation",
          description:
            "The entire application is navigable by keyboard: Tab to navigate, Enter/Space to activate, Escape to close. Desktop sidebars use focus trap, mobile modals use UDrawer with native focus management.",
          implementation:
            "Combination of HTML5 semantics + ARIA roles + keydown events",
        },
        {
          title: "Grayscale mode for visual accessibility",
          description:
            "A toggle in the SidebarRight enables grayscale mode. This converts all interface elements to grayscale to test accessibiloity without relying on color.",
          implementation:
            "Pinia store (accessibilityStore) + grayscale computed applied to critical elements",
        },
        {
          title: "Functional skip-link",
          description:
            "A skip-link at the top of the page allows jumping directly to main content (#main-content). Invisible by default, it becomes visible and focusable on first Tab.",
          implementation: 'sr-only + focus:top-0 + href="#main-content"',
        },
      ],
      corrections: [
        {
          issue: "Sidebar Left Missing accessible name",
          solution:
            'Added aria-label="Navigation principale" to <aside role="dialog">',
          status: "Fixed",
        },
        {
          issue: "Feed-title duplicated on desktop/mobile",
          solution:
            "Separated into feed-title-desktop and feed-title-mobile with appropriate aria-labelledby",
          status: "Fixed",
        },
        {
          issue: "USelect without associated label (Report page)",
          solution:
            'Implemented pattern: <label id="X"> + <USelect aria-labelledby="X">',
          status: "Fixed",
        },
        {
          issue: "Skip-link not focusable on 404",
          solution: "Not applicable error page with limited content",
          status: "Documented",
        },
      ],
      testEnvironment: [
        {
          category: "Screen readers",
          details: [
            "NVDA 2024.1 (Windows 11 + Chrome & Firefox)",
            "Talkback (Android 12 + Chrome)",
          ],
        },
        {
          category: "Keyboard navigation",
          details: [
            "Complete testing without mouse",
            "Verification of tab order (Tab/Shift+Tab)",
            "Testing Escape key to close panels",
            "200% zoom no content loss",
          ],
        },
        {
          category: "Automated tools",
          details: [
            "Lighthouse Accessibility (scores displayed by page)",
            "WAVE WebAIM Evaluation Tool (10/10 for most)",
            "Axe DevTools for detection of common anomalies",
          ],
        },
        {
          category: "Contrast tests",
          details: [
            "7:1 ratio (WCAG AAA) for all text",
            "Use of CSS custom properties to ensure consistency",
            "Activatable Grayscale mode to verify color independence",
          ],
        },
      ],
      glossary: [
        {
          term: "ARIA",
          definition:
            "Accessible Rich Internet Applications. Set of HTML attributes that communicate the role, state, and properties of elements to assistive technologies",
        },
        {
          term: "RGAA 4",
          definition:
            "French General Accessibility Improvement Framework. French standard based on WCAG 2.1, structured in 13 themes and 85 criteria.",
        },
        {
          term: "WCAG",
          definition:
            "Web Content Accessibility Guidelines. International standard (W3C) defining 3 levels: A, AA, AAA. This portfolio targets AAA.",
        },
        {
          term: "Focus Trap",
          definition:
            "Mechanism that confines keyboard navigation within an element (modal, sidebar) to prevent erratic navigation.",
        },
        {
          term: "ARIA Live Region",
          definition:
            "Area of the page whose updates are automatically announced to screen readers without page reload.",
        },
        {
          term: "HTML5 Semantics",
          definition:
            "Use of structural tags (<main>, <nav>, <header>, <footer>) to communicate content meaning to assistive tools.",
        },
        {
          term: "Contrast ratio",
          definition:
            "Measure of visual difference between two colors. WCAG AAA requires a minimum 7:1 ratio for normal text.",
        },
        {
          term: "Skip-link",
          definition:
            "Escape link at the beginning of a page allowing direct jump to main content, useful for keyboard navigation.",
        },
      ],
    },
  },
};
