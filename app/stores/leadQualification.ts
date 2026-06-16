import dayjs from "dayjs";

export const useLeadStore = defineStore("lead", {
  state: () => ({
    step: 1,
    startedAt: dayjs().toISOString(),

    data: {
      projectType: "" as string,
      subType: "" as string,
      complexity: {
        pages: "",
        features: [] as string[],
        cms: "",
      },
      businessGoals: "",
      problems: "",
      budgetRange: "" as string,
      deadline: "" as string,
      contact: {
        email: "",
        message: "",
      },
      leadScore: 0,
      leadTier: "low" as "low" | "medium" | "high",
      createdAt: null as string | null,
    },
  }),

  actions: {
    next() {
      console.log(this.step, this.data.projectType, this.data.subType);
      this.step++;
    },
    back() {
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
          return !!this.data.budgetRange && !!this.data.deadline;
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
          ) this.step = 2; // Ce qui envoie sur l'étape 1 (step: 2 + step-- = 1)
          return true;
        default:
          return true;
      }
    },
    persist() {
      localStorage.setItem("leadDraft", JSON.stringify(this.data));
    },
    restore() {
      const saved = localStorage.getItem("leadDraft");
      if (saved) this.data = JSON.parse(saved);
    },
    reset() {
      localStorage.removeItem("leadDraft");
      this.$reset();
    },
    setTimestamp() {
      this.data.createdAt = dayjs().toISOString();
    },
  },
});
