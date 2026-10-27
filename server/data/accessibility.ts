import type { AccessibilityReport } from '@/types/accessibility';

export const accessibilityReport: AccessibilityReport = {
  translations: {
    fr: {
      title: "Rapport d'accessibilité",
      description: "Audit complet RGAA 4 et WCAG 2.1 Level AAA du site internet",
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
      technologiesTitle: "Technologies utilisées pour le site",
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
      justificationCol: "Justification (si N/A)",
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
        { id: "cadre", label: "Cadres" },
        { id: "colors", label: "Couleurs" },
        { id: "multimedia", label: "Multimédia" },
        { id: "elements", label: "Éléments" },
        { id: "links", label: "Liens et navigation" },
        { id: "scripts", label: "Scripts" },
        { id: "mandatory", label: "Éléments obligatoires" },
        { id: "relationship", label: "Infos & Relations" },
        { id: "presentation", label: "Présentation" },
        { id: "forms", label: "Formulaires" },
        { id: "navigation", label: "Navigation" },
        { id: "consultation", label: "Consultation" },
      ],
      criteria: [
        {
          id: "1.1",
          thematic: "images",
          criterion: "Chaque image a-t-elle une alternative textuelle ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.2",
          thematic: "images",
          criterion:
            "Chaque image de décoration est-elle correctement ignorée par les technologies d’assistance  ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.3",
          thematic: "images",
          criterion:
            "Pour chaque image porteuse d’information ayant une alternative textuelle, cette alternative est-elle pertinente ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.4",
          thematic: "images",
          criterion:
            "Pour chaque image utilisée comme composant d’interface (bouton, lien), son alternative textuelle permet-elle d'en connaître la fonction et la destination ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.5",
          thematic: "images",
          criterion:
            "Pour chaque image texte porteuse d’information, existe-t-il une image de remplacement textuelle ou une alternative pertinente ?",
          status: "NA",
          pages: ["All"],
        },
        {
          id: "1.6",
          thematic: "images",
          criterion:
            "Chaque image porteuse d’information complexe a-t-elle, si nécessaire, une description détaillée complète ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.7",
          thematic: "images",
          criterion:
            "Pour chaque image porteuse d’information complexe pour laquelle une description détaillée est nécessaire, cette description est-elle pertinente ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "2.1",
          thematic: "cadre",
          criterion: "Chaque cadre (iframe) a-t-il un titre de cadre ?",
          status: "NA",
          pages: [],
          justification: "Aucun élément iframe ou cadre n'est utilisé sur le site."
        },
        {
          id: "2.2",
          thematic: "cadre",
          criterion: "Chaque titre de cadre (iframe) est-il pertinent ?",
          status: "NA",
          pages: ["All"],
        },
        {
          id: "3.1",
          thematic: "colors",
          criterion: "L’information ne doit pas être donnée par la couleur uniquement. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "3.2",
          thematic: "colors",
          criterion:
            "• Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisant (hors cas particuliers) ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "3.3",
          thematic: "colors",
          criterion:
            "Dans chaque page web, les couleurs utilisées dans les composants d’interface ou les éléments graphiques porteurs d’information ont-elles un contraste suffisant ?",
          status: "NA",
          pages: ["All"],
        },
        {
          id: "4.1",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel préenregistré (audio ou vidéo) a-t-il, si nécessaire, une transcription textuelle ou une audiodescription ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.2",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel synchronisé préenregistré (vidéo avec audio) a-t-il, si nécessaire, des sous-titres synchronisés ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.3",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel synchronisé préenregistré (vidéo avec audio) a-t-il, si nécessaire, une audiodescription synchronisée ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.4",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel préenregistré (audio ou vidéo) a-t-il une transcription textuelle, des sous-titres ou une audiodescription pertinents ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.5",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel en direct (audio ou vidéo) a-t-il, si nécessaire, des sous-titres synchronisés ou une alternative textuelle ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.6",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel préenregistré (audio ou vidéo) est-il accompagné, si nécessaire, d’une interprétation en langue des signes ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.7",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel (audio ou vidéo) est-il contrôlable par le clavier et la souris ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.8",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel (audio ou vidéo) est-il compatible avec les technologies d’assistance ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.9",
          thematic: "multimedia",
          criterion:
            "Le contenu audio d’un média temporel ne doit pas se lancer automatiquement, ou doit être contrôlable. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "5.1",
          thematic: "elements",
          criterion:
            "Chaque tableau de données a-t-il un titre sémantique (caption) ?",
          status: "C",
          pages: ["Accessibility-report"]
        },
        {
          id: "5.2",
          thematic: "elements",
          criterion:
            "Pour chaque tableau de données ayant un titre, ce titre est-il pertinent ?",
          status: "C",
          pages: ["Accessibility-report"]
        },
        {
          id: "5.3",
          thematic: "elements",
          criterion:
            "Pour chaque tableau de données ayant un titre, ce titre est-il pertinent ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.4",
          thematic: "elements",
          criterion:
            "Chaque en-tête de tableau de données est-il correctement identifié (balise <th>) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.5",
          thematic: "elements",
          criterion:
            "Dans chaque tableau de données, chaque cellule est-elle correctement associée à ses en-têtes ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.6",
          thematic: "elements",
          criterion:
            "Chaque tableau de données complexe a-t-il des en-têtes correctement liés aux cellules via des id et des attributs headers ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.7",
          thematic: "elements",
          criterion:
            "Chaque tableau de mise en forme est-il correctement ignoré par les technologies d’assistance (rôle presentation ou none) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.8",
          thematic: "elements",
          criterion:
            "Chaque tableau de mise en forme n’utilise pas d’éléments sémantiques propres aux tableaux de données. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "6.1",
          thematic: "links",
          criterion:
            "Chaque lien est-il explicite (son intitulé seul ou avec son contexte permet de comprendre sa destination) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "6.2",
          thematic: "links",
          criterion:
            "Chaque intitulé de lien est-il pertinent (et évite les redondances visuelles inutiles) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "7.1",
          thematic: "scripts",
          criterion: "Chaque script (composant interactif) est-il, si nécessaire, compatible avec les technologies d’assistance ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.2",
          thematic: "scripts",
          criterion: "Chaque script est-il contrôlable par le clavier et par la souris ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.3",
          thematic: "scripts",
          criterion: "Chaque script est-il structuré de manière à ce que les changements de statut ou de contenu soient signalés aux technologies d’assistance ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.4",
          thematic: "scripts",
          criterion: "Les raccourcis clavier d’application ou de script ne doivent pas interférer avec le système, ou doivent pouvoir être désactivés/modifiés. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.5",
          thematic: "scripts",
          criterion: "Les alertes ou messages de statut temporels (notifications) sont-ils correctement transmis par les technologies d'assistance (via aria-live) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "8.1",
          thematic: "mandatory",
          criterion: "Chaque page web a-t-elle un code source valide selon son type de DOCTYPE (sans erreur critique d'imbrication ou d'attributs dupliqués) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.2",
          thematic: "mandatory",
          criterion: "Pour chaque page web, les balises ne sont pas utilisées uniquement pour leur rendu visuel. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.3",
          thematic: "mandatory",
          criterion: "La langue principale de chaque page web est-elle définie (via l'attribut lang sur l'élément <html>) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.4",
          thematic: "mandatory",
          criterion: "Les changements de langue dans le texte sont-ils indiqués par un attribut lang approprié ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.5",
          thematic: "mandatory",
          criterion: "Chaque page web a-t-elle un titre de page (<title>) unique et pertinent ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.6",
          thematic: "mandatory",
          criterion: "Pour chaque page web, les changements de direction du texte (gauche à droite ou droite à gauche) sont-ils signalés si nécessaire ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.7",
          thematic: "mandatory",
          criterion: "Dans chaque page web, chaque élément de contenu est-il structuré de manière appropriée (paragraphes, citations, listes) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.8",
          thematic: "mandatory",
          criterion: "Les éléments de code informatique ou de citation utilisent-ils les balises sémantiques appropriées (<code>, <kbd>, <samp>, <blockquotes>) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "8.9",
          thematic: "mandatory",
          criterion: "Dans chaque page web, les balises de mise en valeur (<strong>, <em>) ne sont pas détournées de leur sens. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.10",
          thematic: "mandatory",
          criterion: "Les textes insérés ou supprimés sont-ils signalés par les balises appropriées (<ins>, <del>) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "9.1",
          thematic: "relationship",
          criterion: "Dans chaque page web, la hiérarchie des titres (<h1> à <h6> est-elle logiuqe et respectée ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "9.2",
          thematic: "relationship",
          criterion: "La structure générale de chaque page web utilise-t-elle correctement les balises de grandes zones (<header>, <nav>, <main>, <footer>, <aside>) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "9.3",
          thematic: "relationship",
          criterion: "Dans chaque page web, chaque liste d’éléments est-elle correctement structurée (<ul>, <ol>, <dl>) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "9.4",
          thematic: "relationship",
          criterion: "Dans chaque page web, les regroupements de contenus similaires (comme les groupes de liens) sont-ils correctement structurés ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.1",
          thematic: "presentation",
          criterion: "Dans chaque page web, les feuilles de style (CSS) sont-elles utilisées pour gérer la mise en forme de manière exclusive ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "10.2",
          thematic: "presentation",
          criterion: "Le contenu textuel reste-t-il entièrement visible et lisible lorsque les feuilles de style sont désactivées ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.3",
          thematic: "presentation",
          criterion: "Dans chaque page web, l’information ne doit pas être véhiculée uniquement par la forme, la taille ou la position d’un élément. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.4",
          thematic: "presentation",
          criterion: "Le texte reste-t-il lisible et l'interface utilisable lorsque la taille des caractères est augmentée jusqu’à 200% (zoom texte seul) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.5",
          thematic: "presentation",
          criterion: "Dans chaque page web, les déclarations de CSS ne bloquent pas le redimensionnement du texte par l'utilisateur. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.6",
          thematic: "presentation",
          criterion: "Le contenu reste-t-il entièrement visible et fonctionnel lors d'un zoom d'écran à 400% sans faire apparaître de barre de défilement horizontale (Responsive / Reflow) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.7",
          thematic: "presentation",
          criterion: "Dans chaque page web, le contraste des textes reste-t-il suffisant lors de l'utilisation de polices de caractères ou de styles personnalisés ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.8",
          thematic: "presentation",
          criterion: "Pour chaque page web, les espacements de texte personnalisés par l'utilisateur (interligne, espace entre les mots/lettres) ne provoquent pas de perte de contenu ou de chevauchement ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.9",
          thematic: "presentation",
          criterion: "Dans chaque page web, les contenus cachés par défaut restent-ils invisibles pour les technologies d’assistance tant qu'ils ne sont pas activés ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.10",
          thematic: "presentation",
          criterion: "Dans chaque page web, l’utilisateur peut-il contrôler les animations, clignotements ou défilements automatiques de contenus ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.11",
          thematic: "presentation",
          criterion: "L’affichage d’un contenu additionnel au survol de la souris ou au focus du clavier (comme une infobulle) est-il contrôlable par l’utilisateur ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.12",
          thematic: "presentation",
          criterion: "Le site ne doit pas imposer une orientation d’affichage unique (portrait ou paysage) à moins d'une contrainte technique absolue. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.13",
          thematic: "presentation",
          criterion: "Les données de formulaires ou d’interfaces complexes restent-elles compréhensibles indépendamment de la mise en page choisie ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.14",
          thematic: "presentation",
          criterion: "Les textes justifiés, difficiles à lire pour les personnes dyslexiques, sont-ils évités ou désactivables ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.1",
          thematic: "forms",
          criterion: "Chaque champ de formulaire a-t-il une étiquette (label) textuelle ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.2",
          thematic: "forms",
          criterion:
            "Chaque étiquette de champ est-elle correctement associée à son champ respectif (via l'attribut for et id) ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.3",
          thematic: "forms",
          criterion:
            "Dans chaque formulaire, les étiquettes de champs ayant la même fonction ou le même nom sont-elles différenciées si nécessaire ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.4",
          thematic: "forms",
          criterion:
            "Dans chaque formulaire, les champs de même nature ou liés entre eux sont-ils regroupés sémantiquement (<fieldset>, <legend>) ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.5",
          thematic: "forms",
          criterion:
            "Dans chaque formulaire, les indications sur le format attendu des saisies ou sur le caractère obligatoire d'un champ sont-elles accessibles ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.6",
          thematic: "forms",
          criterion:
            "Les messages d’erreur générés lors de la soumission d'un formulaire sont-ils explicites, faciles à localiser et liés aux champs concernés ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.7",
          thematic: "forms",
          criterion:
            "Pour chaque message d'erreur de formulaire, des suggestions de correction sont-elles proposées à l'utilisateur si elles sont connues ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.8",
          thematic: "forms",
          criterion:
            "Les formulaires qui traitent des données juridiques, financières ou de tests permettent-ils à l'utilisateur de vérifier, corriger ou annuler sa saisie avant validation définitive ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.9",
          thematic: "forms",
          criterion:
            "Les champs qui attendent des informations personnelles courantes de l'utilisateur permettent-ils le remplissage automatique (attribut autocomplete) ?",
          status: "NC",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.10",
          thematic: "forms",
          criterion:
            "Chaque bouton de formulaire a-t-il un intitulé textuel explicite qui indique sa fonction ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.11",
          thematic: "forms",
          criterion:
            " Dans chaque formulaire, le contrôle de la saisie n'est pas bloquant et s'exécute de manière accessible. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.12",
          thematic: "forms",
          criterion:
            "L'utilisateur n'est pas soumis à une limite de temps pour remplir un formulaire ou cette limite est prolongeable. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.13",
          thematic: "forms",
          criterion:
            "L'utilisation d'un mécanisme de sécurité (comme un CAPTCHA) est-elle accessible ou doublée d'une alternative accessible ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.1",
          thematic: "navigation",
          criterion: "Chaque page web contient-elle un lien d'évitement (skip-link) fonctionnel permettant de naviguer directement au contenu principal ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.2",
          thematic: "navigation",
          criterion: "Le lien d'évitement est-il visible ou devient-il visible lors de la prise de focus au clavier ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.3",
          thematic: "navigation",
          criterion: "La prise de focus clavier est-elle parfaitement visible sur tous les éléments interactifs de la page (liens, boutons, champs) ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.4",
          thematic: "navigation",
          criterion:
            "L’ordre de tabulation au clavier (touche Tab) suit-il un ordre logique et prévisible pour l'utilisateur ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.5",
          thematic: "navigation",
          criterion: "La navigation au clavier ne doit pas bloquer le focus sur un élément de manière définitive (absence de piège à focus hors modales contrôlées) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.6",
          thematic: "navigation",
          criterion: "Le site propose-t-il au moins deux méthodes de navigation différentes pour accéder aux pages (ex: menu de navigation principal ET plan du site ou moteur de recherche) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.7",
          thematic: "navigation",
          criterion: "Dans chaque page web, des indicateurs permettent-ils à l’utilisateur de localiser sa position dans le site (fil d'Ariane, état actif dans le menu) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.8",
          thematic: "navigation",
          criterion: "Dans chaque page web, la zone de contenu principal est-elle facilement identifiable sémantiquement ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.9",
          thematic: "navigation",
          criterion: "La page web propose-t-elle des mécanismes pour faciliter la navigation rapide au sein du contenu textuel (ancres de table des matières par exemple) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.10",
          thematic: "navigation",
          criterion: "Les raccourcis clavier intégrés au site web sont-ils documentés et contrôlables ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.11",
          thematic: "navigation",
          criterion: "Les gestes complexes requis par l'interface tactile (comme le glisser-déposer) peuvent-ils être exécutés par des gestes simples (simples clics ou boutons fléchés) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.1",
          thematic: "consultation",
          criterion: "Pour chaque document en téléchargement (PDF, Word, etc.), existe-t-il une version accessible ou une alternative textuelle équivalente ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.2",
          thematic: "consultation",
          criterion: "Chaque document en téléchargement accessible respecte-t-il les règles d'accessibilité propres à son format ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.3",
          thematic: "consultation",
          criterion: "Pour chaque page web, les contenus additionnels en mouvement ou mis à jour automatiquement (carrousels, flux de actus) sont-ils contrôlables ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "13.4",
          thematic: "consultation",
          criterion: "Les changements brusques de contexte (comme l'ouverture automatique d'une nouvelle fenêtre ou la redirection instantanée) ne doivent pas se produire sans en avertir l'utilisateur. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.5",
          thematic: "consultation",
          criterion: "Les expressions inhabituelles, idiotismes, abréviations ou termes techniques font-ils l'objet d'une définition sémantique ou d'une explication accessible ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.6",
          thematic: "consultation",
          criterion: "Les textes complexes ou de niveau de lecture élevé proposent-ils une version simplifiée ou un résumé en langage clair (Facile à Lire et à Comprendre - FALC) si nécessaire ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.7",
          thematic: "consultation",
          criterion: "Le site ne provoque pas de réactions physiques ou de crises d'épilepsie liées à des flashs ou des variations lumineuses rapides (fréquence supérieure à 3 flashs par seconde). Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "13.8",
          thematic: "consultation",
          criterion: "L'accès aux fonctionnalités du site ne dépend pas d’une action matérielle exclusive (comme secouer le téléphone ou utiliser obligatoirement une caméra). Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "13.9",
          thematic: "consultation",
          criterion: "Les sessions utilisateur qui expirent automatiquement (déconnexion de sécurité) permettent-elles de sauvegarder les données ou d'étendre le délai avant coupure ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.10",
          thematic: "consultation",
          criterion: "Les composants d’interface utilisateur ou les icônes identiques d’une page à l’autre gardent-ils un nom accessible et une fonction cohérents sur l'ensemble du site ?",
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
        { page: "Rapport d'accessibilité", lighthouse: 100, wave: 10, accessibility: '100%' },
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
          issue: "SidebarLeft mobile inutilisable sur desktop",
          solution:
            'Ajout d\'une nouvelle sidebar nommé SidebarLeftDesktop utilisant un aside pour desktop et utilisant SidebarLeftMobile uniquement pour téléphone',
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
            "Micosoft Accessibility Insights for Web",
            "IBM Equal Access Accessibility Checker",
            "Tanagaru Contrast Checker",
            "W3C Contrast Checker",
          ],
        },
        {
          category: "Tests de contraste",
          details: [
            "Ratio 7:1 (WCAG AAA) pour tous les textes",
            "Utilisation de variables CSS custom pour garantir la cohérence",
            "Mode Grayscale activable pour vérifier l'indépendance à la couleur",
          ],
        }
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
      technologiesTitle: "Used technologies for the site",
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
      justificationCol: "Justification (if N/A)",
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
        { id: "cadre", label: "Frames" },
        { id: "colors", label: "Colors" },
        { id: "multimedia", label: "Multimedia" },
        { id: "elements", label: "Elements" },
        { id: "links", label: "Links" },
        { id: "scripts", label: "Scripts" },
        { id: "mandatory", label: "Structure" },
        { id: "relationship", label: "Infos & Relationships" },
        { id: "presentation", label: "Presentation" },
        { id: "forms", label: "Forms" },
        { id: "navigation", label: "Navigation" },
        { id: "consultation", label: "Consultation" },
      ],
      criteria: [
        {
          id: "1.1",
          thematic: "images",
          criterion: "Chaque image a-t-elle une alternative textuelle ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.2",
          thematic: "images",
          criterion:
            "Chaque image de décoration est-elle correctement ignorée par les technologies d’assistance  ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.3",
          thematic: "images",
          criterion:
            "Pour chaque image porteuse d’information ayant une alternative textuelle, cette alternative est-elle pertinente ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.4",
          thematic: "images",
          criterion:
            "Pour chaque image utilisée comme composant d’interface (bouton, lien), son alternative textuelle permet-elle d'en connaître la fonction et la destination ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.5",
          thematic: "images",
          criterion:
            "Pour chaque image texte porteuse d’information, existe-t-il une image de remplacement textuelle ou une alternative pertinente ?",
          status: "NA",
          pages: ["All"],
        },
        {
          id: "1.6",
          thematic: "images",
          criterion:
            "Chaque image porteuse d’information complexe a-t-elle, si nécessaire, une description détaillée complète ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "1.7",
          thematic: "images",
          criterion:
            "Pour chaque image porteuse d’information complexe pour laquelle une description détaillée est nécessaire, cette description est-elle pertinente ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "2.1",
          thematic: "cadre",
          criterion: "Chaque cadre (iframe) a-t-il un titre de cadre ?",
          status: "NA",
          pages: [],
          justification: "Aucun élément iframe ou cadre n'est utilisé sur le site."
        },
        {
          id: "2.2",
          thematic: "cadre",
          criterion: "Chaque titre de cadre (iframe) est-il pertinent ?",
          status: "NA",
          pages: ["All"],
        },
        {
          id: "3.1",
          thematic: "colors",
          criterion: "L’information ne doit pas être donnée par la couleur uniquement. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "3.2",
          thematic: "colors",
          criterion:
            "• Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisant (hors cas particuliers) ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "3.3",
          thematic: "colors",
          criterion:
            "Dans chaque page web, les couleurs utilisées dans les composants d’interface ou les éléments graphiques porteurs d’information ont-elles un contraste suffisant ?",
          status: "NA",
          pages: ["All"],
        },
        {
          id: "4.1",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel préenregistré (audio ou vidéo) a-t-il, si nécessaire, une transcription textuelle ou une audiodescription ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.2",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel synchronisé préenregistré (vidéo avec audio) a-t-il, si nécessaire, des sous-titres synchronisés ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.3",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel synchronisé préenregistré (vidéo avec audio) a-t-il, si nécessaire, une audiodescription synchronisée ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.4",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel préenregistré (audio ou vidéo) a-t-il une transcription textuelle, des sous-titres ou une audiodescription pertinents ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.5",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel en direct (audio ou vidéo) a-t-il, si nécessaire, des sous-titres synchronisés ou une alternative textuelle ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.6",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel préenregistré (audio ou vidéo) est-il accompagné, si nécessaire, d’une interprétation en langue des signes ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.7",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel (audio ou vidéo) est-il contrôlable par le clavier et la souris ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.8",
          thematic: "multimedia",
          criterion:
            "Chaque média temporel (audio ou vidéo) est-il compatible avec les technologies d’assistance ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "4.9",
          thematic: "multimedia",
          criterion:
            "Le contenu audio d’un média temporel ne doit pas se lancer automatiquement, ou doit être contrôlable. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Il n'y a aucun contenu vidéo ou audio préenregistré sur le site."
        },
        {
          id: "5.1",
          thematic: "elements",
          criterion:
            "Chaque tableau de données a-t-il un titre sémantique (caption) ?",
          status: "C",
          pages: ["Accessibility-report"]
        },
        {
          id: "5.2",
          thematic: "elements",
          criterion:
            "Pour chaque tableau de données ayant un titre, ce titre est-il pertinent ?",
          status: "C",
          pages: ["Accessibility-report"]
        },
        {
          id: "5.3",
          thematic: "elements",
          criterion:
            "Pour chaque tableau de données ayant un titre, ce titre est-il pertinent ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.4",
          thematic: "elements",
          criterion:
            "Chaque en-tête de tableau de données est-il correctement identifié (balise <th>) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.5",
          thematic: "elements",
          criterion:
            "Dans chaque tableau de données, chaque cellule est-elle correctement associée à ses en-têtes ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.6",
          thematic: "elements",
          criterion:
            "Chaque tableau de données complexe a-t-il des en-têtes correctement liés aux cellules via des id et des attributs headers ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.7",
          thematic: "elements",
          criterion:
            "Chaque tableau de mise en forme est-il correctement ignoré par les technologies d’assistance (rôle presentation ou none) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "5.8",
          thematic: "elements",
          criterion:
            "Chaque tableau de mise en forme n’utilise pas d’éléments sémantiques propres aux tableaux de données. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "6.1",
          thematic: "links",
          criterion:
            "Chaque lien est-il explicite (son intitulé seul ou avec son contexte permet de comprendre sa destination) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "6.2",
          thematic: "links",
          criterion:
            "Chaque intitulé de lien est-il pertinent (et évite les redondances visuelles inutiles) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "7.1",
          thematic: "scripts",
          criterion: "Chaque script (composant interactif) est-il, si nécessaire, compatible avec les technologies d’assistance ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.2",
          thematic: "scripts",
          criterion: "Chaque script est-il contrôlable par le clavier et par la souris ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.3",
          thematic: "scripts",
          criterion: "Chaque script est-il structuré de manière à ce que les changements de statut ou de contenu soient signalés aux technologies d’assistance ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.4",
          thematic: "scripts",
          criterion: "Les raccourcis clavier d’application ou de script ne doivent pas interférer avec le système, ou doivent pouvoir être désactivés/modifiés. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "7.5",
          thematic: "scripts",
          criterion: "Les alertes ou messages de statut temporels (notifications) sont-ils correctement transmis par les technologies d'assistance (via aria-live) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "8.1",
          thematic: "mandatory",
          criterion: "Chaque page web a-t-elle un code source valide selon son type de DOCTYPE (sans erreur critique d'imbrication ou d'attributs dupliqués) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.2",
          thematic: "mandatory",
          criterion: "Pour chaque page web, les balises ne sont pas utilisées uniquement pour leur rendu visuel. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.3",
          thematic: "mandatory",
          criterion: "La langue principale de chaque page web est-elle définie (via l'attribut lang sur l'élément <html>) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.4",
          thematic: "mandatory",
          criterion: "Les changements de langue dans le texte sont-ils indiqués par un attribut lang approprié ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.5",
          thematic: "mandatory",
          criterion: "Chaque page web a-t-elle un titre de page (<title>) unique et pertinent ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.6",
          thematic: "mandatory",
          criterion: "Pour chaque page web, les changements de direction du texte (gauche à droite ou droite à gauche) sont-ils signalés si nécessaire ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.7",
          thematic: "mandatory",
          criterion: "Dans chaque page web, chaque élément de contenu est-il structuré de manière appropriée (paragraphes, citations, listes) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.8",
          thematic: "mandatory",
          criterion: "Les éléments de code informatique ou de citation utilisent-ils les balises sémantiques appropriées (<code>, <kbd>, <samp>, <blockquotes>) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "8.9",
          thematic: "mandatory",
          criterion: "Dans chaque page web, les balises de mise en valeur (<strong>, <em>) ne sont pas détournées de leur sens. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "8.10",
          thematic: "mandatory",
          criterion: "Les textes insérés ou supprimés sont-ils signalés par les balises appropriées (<ins>, <del>) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "9.1",
          thematic: "relationship",
          criterion: "Dans chaque page web, la hiérarchie des titres (<h1> à <h6> est-elle logiuqe et respectée ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "9.2",
          thematic: "relationship",
          criterion: "La structure générale de chaque page web utilise-t-elle correctement les balises de grandes zones (<header>, <nav>, <main>, <footer>, <aside>) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "9.3",
          thematic: "relationship",
          criterion: "Dans chaque page web, chaque liste d’éléments est-elle correctement structurée (<ul>, <ol>, <dl>) ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "9.4",
          thematic: "relationship",
          criterion: "Dans chaque page web, les regroupements de contenus similaires (comme les groupes de liens) sont-ils correctement structurés ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.1",
          thematic: "presentation",
          criterion: "Dans chaque page web, les feuilles de style (CSS) sont-elles utilisées pour gérer la mise en forme de manière exclusive ?",
          status: "C",
          pages: ["All"]
        },
        {
          id: "10.2",
          thematic: "presentation",
          criterion: "Le contenu textuel reste-t-il entièrement visible et lisible lorsque les feuilles de style sont désactivées ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.3",
          thematic: "presentation",
          criterion: "Dans chaque page web, l’information ne doit pas être véhiculée uniquement par la forme, la taille ou la position d’un élément. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.4",
          thematic: "presentation",
          criterion: "Le texte reste-t-il lisible et l'interface utilisable lorsque la taille des caractères est augmentée jusqu’à 200% (zoom texte seul) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.5",
          thematic: "presentation",
          criterion: "Dans chaque page web, les déclarations de CSS ne bloquent pas le redimensionnement du texte par l'utilisateur. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.6",
          thematic: "presentation",
          criterion: "Le contenu reste-t-il entièrement visible et fonctionnel lors d'un zoom d'écran à 400% sans faire apparaître de barre de défilement horizontale (Responsive / Reflow) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.7",
          thematic: "presentation",
          criterion: "Dans chaque page web, le contraste des textes reste-t-il suffisant lors de l'utilisation de polices de caractères ou de styles personnalisés ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.8",
          thematic: "presentation",
          criterion: "Pour chaque page web, les espacements de texte personnalisés par l'utilisateur (interligne, espace entre les mots/lettres) ne provoquent pas de perte de contenu ou de chevauchement ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.9",
          thematic: "presentation",
          criterion: "Dans chaque page web, les contenus cachés par défaut restent-ils invisibles pour les technologies d’assistance tant qu'ils ne sont pas activés ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.10",
          thematic: "presentation",
          criterion: "Dans chaque page web, l’utilisateur peut-il contrôler les animations, clignotements ou défilements automatiques de contenus ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.11",
          thematic: "presentation",
          criterion: "L’affichage d’un contenu additionnel au survol de la souris ou au focus du clavier (comme une infobulle) est-il contrôlable par l’utilisateur ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.12",
          thematic: "presentation",
          criterion: "Le site ne doit pas imposer une orientation d’affichage unique (portrait ou paysage) à moins d'une contrainte technique absolue. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.13",
          thematic: "presentation",
          criterion: "Les données de formulaires ou d’interfaces complexes restent-elles compréhensibles indépendamment de la mise en page choisie ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "10.14",
          thematic: "presentation",
          criterion: "Les textes justifiés, difficiles à lire pour les personnes dyslexiques, sont-ils évités ou désactivables ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.1",
          thematic: "forms",
          criterion: "Chaque champ de formulaire a-t-il une étiquette (label) textuelle ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.2",
          thematic: "forms",
          criterion:
            "Chaque étiquette de champ est-elle correctement associée à son champ respectif (via l'attribut for et id) ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.3",
          thematic: "forms",
          criterion:
            "Dans chaque formulaire, les étiquettes de champs ayant la même fonction ou le même nom sont-elles différenciées si nécessaire ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.4",
          thematic: "forms",
          criterion:
            "Dans chaque formulaire, les champs de même nature ou liés entre eux sont-ils regroupés sémantiquement (<fieldset>, <legend>) ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.5",
          thematic: "forms",
          criterion:
            "Dans chaque formulaire, les indications sur le format attendu des saisies ou sur le caractère obligatoire d'un champ sont-elles accessibles ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.6",
          thematic: "forms",
          criterion:
            "Les messages d’erreur générés lors de la soumission d'un formulaire sont-ils explicites, faciles à localiser et liés aux champs concernés ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.7",
          thematic: "forms",
          criterion:
            "Pour chaque message d'erreur de formulaire, des suggestions de correction sont-elles proposées à l'utilisateur si elles sont connues ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.8",
          thematic: "forms",
          criterion:
            "Les formulaires qui traitent des données juridiques, financières ou de tests permettent-ils à l'utilisateur de vérifier, corriger ou annuler sa saisie avant validation définitive ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "11.9",
          thematic: "forms",
          criterion:
            "Les champs qui attendent des informations personnelles courantes de l'utilisateur permettent-ils le remplissage automatique (attribut autocomplete) ?",
          status: "NC",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.10",
          thematic: "forms",
          criterion:
            "Chaque bouton de formulaire a-t-il un intitulé textuel explicite qui indique sa fonction ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.11",
          thematic: "forms",
          criterion:
            " Dans chaque formulaire, le contrôle de la saisie n'est pas bloquant et s'exécute de manière accessible. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.12",
          thematic: "forms",
          criterion:
            "L'utilisateur n'est pas soumis à une limite de temps pour remplir un formulaire ou cette limite est prolongeable. Cette règle est-elle respectée ?",
          status: "C",
          pages: ["Contact Modal","Report"],
        },
        {
          id: "11.13",
          thematic: "forms",
          criterion:
            "L'utilisation d'un mécanisme de sécurité (comme un CAPTCHA) est-elle accessible ou doublée d'une alternative accessible ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.1",
          thematic: "navigation",
          criterion: "Chaque page web contient-elle un lien d'évitement (skip-link) fonctionnel permettant de naviguer directement au contenu principal ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.2",
          thematic: "navigation",
          criterion: "Le lien d'évitement est-il visible ou devient-il visible lors de la prise de focus au clavier ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.3",
          thematic: "navigation",
          criterion: "La prise de focus clavier est-elle parfaitement visible sur tous les éléments interactifs de la page (liens, boutons, champs) ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.4",
          thematic: "navigation",
          criterion:
            "L’ordre de tabulation au clavier (touche Tab) suit-il un ordre logique et prévisible pour l'utilisateur ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.5",
          thematic: "navigation",
          criterion: "La navigation au clavier ne doit pas bloquer le focus sur un élément de manière définitive (absence de piège à focus hors modales contrôlées) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.6",
          thematic: "navigation",
          criterion: "Le site propose-t-il au moins deux méthodes de navigation différentes pour accéder aux pages (ex: menu de navigation principal ET plan du site ou moteur de recherche) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.7",
          thematic: "navigation",
          criterion: "Dans chaque page web, des indicateurs permettent-ils à l’utilisateur de localiser sa position dans le site (fil d'Ariane, état actif dans le menu) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.8",
          thematic: "navigation",
          criterion: "Dans chaque page web, la zone de contenu principal est-elle facilement identifiable sémantiquement ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "12.9",
          thematic: "navigation",
          criterion: "La page web propose-t-elle des mécanismes pour faciliter la navigation rapide au sein du contenu textuel (ancres de table des matières par exemple) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.10",
          thematic: "navigation",
          criterion: "Les raccourcis clavier intégrés au site web sont-ils documentés et contrôlables ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "12.11",
          thematic: "navigation",
          criterion: "Les gestes complexes requis par l'interface tactile (comme le glisser-déposer) peuvent-ils être exécutés par des gestes simples (simples clics ou boutons fléchés) ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.1",
          thematic: "consultation",
          criterion: "Pour chaque document en téléchargement (PDF, Word, etc.), existe-t-il une version accessible ou une alternative textuelle équivalente ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.2",
          thematic: "consultation",
          criterion: "Chaque document en téléchargement accessible respecte-t-il les règles d'accessibilité propres à son format ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.3",
          thematic: "consultation",
          criterion: "Pour chaque page web, les contenus additionnels en mouvement ou mis à jour automatiquement (carrousels, flux de actus) sont-ils contrôlables ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "13.4",
          thematic: "consultation",
          criterion: "Les changements brusques de contexte (comme l'ouverture automatique d'une nouvelle fenêtre ou la redirection instantanée) ne doivent pas se produire sans en avertir l'utilisateur. Cette règle est-elle respectée ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.5",
          thematic: "consultation",
          criterion: "Les expressions inhabituelles, idiotismes, abréviations ou termes techniques font-ils l'objet d'une définition sémantique ou d'une explication accessible ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.6",
          thematic: "consultation",
          criterion: "Les textes complexes ou de niveau de lecture élevé proposent-ils une version simplifiée ou un résumé en langage clair (Facile à Lire et à Comprendre - FALC) si nécessaire ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.7",
          thematic: "consultation",
          criterion: "Le site ne provoque pas de réactions physiques ou de crises d'épilepsie liées à des flashs ou des variations lumineuses rapides (fréquence supérieure à 3 flashs par seconde). Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "13.8",
          thematic: "consultation",
          criterion: "L'accès aux fonctionnalités du site ne dépend pas d’une action matérielle exclusive (comme secouer le téléphone ou utiliser obligatoirement une caméra). Cette règle est-elle respectée ?",
          status: "C",
          pages: ["All"],
        },
        {
          id: "13.9",
          thematic: "consultation",
          criterion: "Les sessions utilisateur qui expirent automatiquement (déconnexion de sécurité) permettent-elles de sauvegarder les données ou d'étendre le délai avant coupure ?",
          status: "NA",
          pages: [],
          justification: "Aucun contenu de ce type n'est présent sur l'ensemble du site."
        },
        {
          id: "13.10",
          thematic: "consultation",
          criterion: "Les composants d’interface utilisateur ou les icônes identiques d’une page à l’autre gardent-ils un nom accessible et une fonction cohérents sur l'ensemble du site ?",
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
        { page: "Accessibility report", lighthouse: 100, wave: 10, accessibility: '100%' },
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
