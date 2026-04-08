<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui';

const { t, locale } = useI18n();

const plans = ref<PricingPlanProps[]>([
    {
        title: t('index.plan_section.plan.1.title'),
        description: t('index.plan_section.plan.1.description'),
        features: locale.value == 'fr' ? [
            "Sites vitrines sous WordPress ou Shopify",
            "Sites internet réalisés avec un framework moderne (Vue, Nuxt, Express, Prisma)",
            "Applications web internes",
            "Intégration HTML5, CSS3, jQuery, JavaScript, TypeScript",
            "Webdesign",
            "Référencement naturel (SEO)",
            "Fusion de données / Automatisation"
        ] : [
            "Showcase websites built with WordPress or Shopify",
            "Websites built using a modern framework (Vue, Nuxt, Express, Prisma)",
            "Internal web applications",
            "Integration of HTML5, CSS3, jQuery, JavaScript, TypeScript",
            "Web design",
            "Search engine optimization (SEO)",
            "Data integration / Automation"
        ],
    },
    {
        title: t('index.plan_section.plan.2.title'),
        description: t('index.plan_section.plan.2.description'),
        price: '',
        features: locale.value == 'fr' ? [
            "Audit Accessibilité",
            "Bonnes pratiques",
            "Mise en conformité (WCAG 2.2 /RGAA 4+)",
            "Audit Performance & SEO"
        ] : [
            "Accessibility Audit",
            "Best practices",
            "Compliance (WCAG 2.2 /RGAA 4+)",
            "Performance & SEO AUdit"
        ],
    },
    {
        title: t('index.plan_section.plan.3.title'),
        description: t('index.plan_section.plan.3.description'),
        price: '',
        features: locale.value == 'fr' ? [
            "Apprendre à utiliser l'IA",
            "Détecter des contenus générés par IA",
            "Utiliser des outils modernes (logiciels, applications web)",
            "Apprendre à naviguer sur Internet de manière sécurisée",
            "Apprendre à utiliser un ordinateur",
            "Apprendre à utiliser un client de messagerie mail"
        ] : [
            "Learning to use AI",
            "Detecting AI-generated content",
            "Using modern tools (software, web applications)",
            "Learning to browse the Internet safely",
            "Learning to use a computer",
            "Learning to use an email client"
        ],
    },
]);
</script>

<template>
    <UPricingPlans>
        <UPricingPlan v-for="(plan, i) in plans" :key="i" v-bind="plan" class="bg-(--bg-2)" orientation="vertical" :ui="{
            description: 'text-(--text-3)',
            featureTitle: 'text-(--text-2)'
        }" />
    </UPricingPlans>
</template>