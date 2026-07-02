import { calculatePrice } from "@/utils/pricingEngine";

export const useLeadStore = defineStore("lead", {
  state: () => ({
    step: 1,
    data: {
      projectType: "" as string,
      subType: "" as string,
      complexity: {
        pages: "" as string,
        features: [] as string[],
        cms: "gitbased_cms" as string,
      },
      formation: {
        hours: 0,
        attendees: 0,
      },
      maintenance: {
        estimatedInterventions: 0,
      },
      businessGoals: "",
      problems: "",
      personNumber: "" as string,
      budgetRange: "" as string,
      trainingFormat: "" as string,
      deadline: "" as string,
      contact: {
        email: "",
        message: "",
      },
      leadScore: 0,
      leadTier: "low" as "low" | "medium" | "high",
    },
  }),

  getters: {
    estimatedPrice(state: { data: any }) {
      return calculatePrice(state.data);
    },
  },

  actions: {
    next() {
      console.log(this.step, this.data.projectType, this.data.subType);
      this.persist();
      this.step++;
    },
    back() {
      this.persist();
      this.step--;
    },
    validateNextStep() {
      switch (this.step) {
        case 1:
          if (this.data.projectType === "message") return true;
          else if (
            this.data.projectType === "audit_a11y" ||
            this.data.projectType === "audit_seo"
          ) {
            this.step = 2; // Ce qui envoie sur l'étape 3 (step: 2 + step++ = 3)
            return true;
          } else return !!this.data.projectType;
        case 2:
          return !!this.data.subType;
        case 3:
          if (this.data.businessGoals.length && this.data.problems.length)
            return true;
        case 4:
          return (
            (!!this.data.budgetRange ||
              (!!this.data.personNumber && !!this.data.trainingFormat)) &&
            !!this.data.deadline
          );
        case 5:
          return !!this.data.contact.email;
        default:
          return true;
      }
    },
    validateBackStep() {
      switch (this.step) {
        case 1:
          return false;
        case 3:
          if (
            this.data.projectType === "audit_a11y" ||
            this.data.projectType === "audit_seo"
          )
            this.step = 2; // Ce qui envoie sur l'étape 1 (step: 2 + step-- = 1)
          return true;
        default:
          return true;
      }
    },
    persist() {
      if (!import.meta.client) return;

      localStorage.setItem("leadDraft", JSON.stringify(this.data));
    },
    hasDraft() {
      if (!import.meta.client) return false;

      return !!localStorage.getItem("leadDraft"); // localStorage.getItem("leadDraft") !== null;
    },
    restore() {
      if (!import.meta.client) return; 
      const saved = localStorage.getItem("leadDraft");
      if (saved) this.data = JSON.parse(saved);
    },
    resetStep() {
      switch (this.step) {
        case 1:
          this.data.projectType = "";
          this.persist();
          break;
        case 2:
          this.data.subType = "";
          this.persist();
          break;
        case 3:
          this.data.businessGoals = "";
          this.data.problems = "";
          this.data.complexity = { pages: "", features: [], cms: "" };
          this.persist();
          break;
        case 4:
          this.data.personNumber = "";
          this.data.budgetRange = "";
          this.data.trainingFormat = "";
          this.data.deadline = "";
          this.persist();
          break;
        case 5:
          this.data.contact.email = "";
          this.data.contact.message = "";
          this.persist();
          break;
        default:
          this.persist();
          break;
      }
    },
    reset() {
      if (!import.meta.client ) {
        localStorage.removeItem("leadDraft");
      }

      this.$reset();
    },
  },
});
