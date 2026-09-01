export const useLeadStore = defineStore("lead", {
  state: () => ({
    step: 1,
    data: {
      projectType: "" as string,
      subType: "" as string,
      complexity: {
        pages: "" as string,
        features: [] as string[],
        cms: false as boolean,
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
      publicType: "" as string,
      contact: {
        email: "",
        message: "",
        website: "",
      },
      leadScore: 0,
      leadTier: "low" as "low" | "medium" | "high",
    },
  }),

  getters: {
    /* estimatedPrice(state: { data: any }) {
      return calculatePrice(state.data);
    }, */
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
            this.data.projectType === "audit" && this.data.subType !== ""
          ) {
            this.step = 2; // Ce qui envoie sur l'étape 3 (step: 2 + step++ = 3)
            return true;
          } else return !!this.data.projectType;
        case 2:
          return !!this.data.subType;
        case 3:
          if((this.data.subType == 'audit-flash' && this.data.contact.website)) {
            this.step = 4;
            return true;
          } else if (this.data.businessGoals.length && this.data.problems.length) return true
        case 4:
          return (
            (!!this.data.budgetRange ||
              (!!this.data.personNumber && !!this.data.trainingFormat && !!this.data.budgetRange && !!this.data.publicType)) &&
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
            this.data.projectType === "audit")
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
          this.data.complexity = { pages: "", features: [], cms: false };
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
      if (!import.meta.client) {
        localStorage.removeItem("leadDraft");
      }

      this.$reset();
    },
    setInitialProject(projectType: string, subType: string) {
      this.data.projectType = projectType;
      this.data.subType = subType;
      this.persist();
    },
  },
});
