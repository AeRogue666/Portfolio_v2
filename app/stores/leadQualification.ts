interface LeadData {
  projectType: string
  subType: string
  complexity: {
    pages: string
    features: string[]
    cms: boolean
  }
  formation: {
    hours: number
    attendees: number
  }
  maintenance: {
    estimatedInterventions: number
  }
  businessGoals: string
  problems: string
  personNumber: string
  budgetRange: string
  trainingFormat: string
  deadline: string
  publicType: string
  contact: {
    email: string
    message: string
    website: string
  }
  leadScore: number
  leadTier: "low" | "medium" | "high"
}

export const useLeadStore = defineStore("lead", () => {
  const step = ref<number>(0);

  const data = ref<LeadData>({
    projectType: "",
    subType: "",
    complexity: {
      pages: "",
      features: [],
      cms: false
    },
    formation: {
      hours: 0,
      attendees: 0
    },
    maintenance: {
      estimatedInterventions: 0
    },
    businessGoals: "",
    problems: "",
    personNumber: "",
    budgetRange: "",
    trainingFormat: "",
    deadline: "",
    publicType: "",
    contact: {
      email: "",
      message: "",
      website: ""
    },
    leadScore: 0,
    leadTier: "low"
  })

  const allTypes = ref([
    {
      projectType: "creation",
      subTypes: ["onepage", "vitrine", "professionnel", "ecommerce", "reservation", "custom"]
    },
    {
      projectType: "refonte",
      subTypes: ["refonte-design", "refonte-performance", "refonte-accessibilite", "refonte-securite", "refonte-fonctionnalite"]
    },
    {
      projectType: "optimisation",
      subTypes: ["optimisation-accessibilite", "optimisation-seo", "optimisation-securite", "optimisation-multi"]
    },
    {
      projectType: "maintenance",
      subTypes: ["maintenance-onepage", "maintenance-vitrine", "maintenance-professionnel", "maintenance-ecommerce", "maintenance-reservation", "maintenance-custom"]
    },
    {
      projectType: "formation",
      subTypes: ["ordinateur", "internet", "email", "securite-numerique", "ia", "custom"]
    },
    {
      projectType: "audit",
      subTypes: ["audit-accessibilite", "audit-seo", "audit-securite", "audit-all", "audit-flash"]
    }
  ])

  const isValidSubType = (projectType: string, subType: string): boolean => {
    const typeConfig = allTypes.value.find(t => t.projectType === projectType)
    return typeConfig ? typeConfig.subTypes.includes(subType) : false
  }

  watch(() => data.value.projectType, (newType) => {
    if (data.value.subType && !isValidSubType(newType, data.value.subType)) {
      data.value.subType = ""
      persist()
    }
  })

  function next() {
    persist()
    step.value++
  }

  function back() {
    persist()
    step.value--
  }

  function validateNextStep(): boolean {
    switch (step.value) {
      case 0:
        step.value = 0
        return true
      case 1:
        if (data.value.projectType === "message") return true
        if (data.value.projectType !== "message" && !data.value.subType) {
          step.value = 1
          return true
        }
        if (data.value.projectType && data.value.subType) {
          step.value = 2
          return true
        }
        return false
      case 2:
        return isValidSubType(data.value.projectType, data.value.subType)
      case 3:
        if (data.value.subType === "audit-flash" && data.value.contact.website) {
          step.value = 4
          return true
        } else if(data.value.projectType === "creation" || data.value.projectType === "formation") {
          return !!(data.value.businessGoals.length && data.value.problems.length) 
        }
        return !!(data.value.businessGoals.length && data.value.problems.length && data.value.contact.website)
      case 4:
        return !!(
          (!!data.value.budgetRange || (!!data.value.personNumber && !!data.value.trainingFormat && !!data.value.budgetRange && !!data.value.publicType)) && !!data.value.deadline
        )
      case 5:
        return !!data.value.contact.email
      default:
        return true
    }
  }

  function validateBackStep(): boolean {
    switch (step.value) {
      case 1:
        return false
      case 3:
        if (data.value.projectType === "audit") {
          step.value = 2
        }
        return true
      default:
        return true
    }
  }

  function persist() {
    if (!import.meta.client) return
    localStorage.setItem("leadDraft", JSON.stringify(data.value))
  }

  function hasDraft(): boolean {
    if (!import.meta.client) return false
    return !!localStorage.getItem("leadDraft")
  }

  function restore() {
    if (!import.meta.client) return
    const saved = localStorage.getItem("leadDraft")
    if (saved) data.value = JSON.parse(saved)
  }

  function resetStep() {
    switch (step.value) {
      case 1:
        data.value.projectType = ""
        break
      case 2:
        data.value.subType = ""
        break
      case 3:
        data.value.businessGoals = ""
        data.value.problems = ""
        data.value.complexity = {
          pages: "", features: [], cms: false
        }
        break
      case 4:
        data.value.personNumber = ""
        data.value.budgetRange = ""
        data.value.trainingFormat = ""
        data.value.deadline = ""
        break
      case 5:
        data.value.contact.email = ""
        data.value.contact.message = ""
        break
    }
    persist()
  }

  function reset() {
    if (import.meta.client) {
      localStorage.removeItem("leadDraft")
    }
    step.value = 0
    data.value = {
      projectType: "",
      subType: "",
      complexity: {
        pages: "",
        features: [],
        cms: false
      },
      formation: {
        hours: 0,
        attendees: 0
      },
      maintenance: {
        estimatedInterventions: 0
      },
      businessGoals: "",
      problems: "",
      personNumber: "",
      budgetRange: "",
      trainingFormat: "",
      deadline: "",
      publicType: "",
      contact: {
        email: "",
        message: "",
        website: ""
      },
      leadScore: 0,
      leadTier: "low"
    }
  }

  function setInitialProject(projectType: string, subType: string) {
    data.value.projectType = projectType
    data.value.subType = subType
    persist()
  }

  return {
    step,
    data,
    allTypes,
    isValidSubType,
    next,
    back,
    validateNextStep,
    validateBackStep,
    persist,
    hasDraft,
    restore,
    resetStep,
    reset,
    setInitialProject
  }
})

/* export const useLeadStore = defineStore("lead", {
  state: () => ({
    step: 0,
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
    allTypes: [
      {
        projectType: "creation",
        subTypes: ["onepage", "vitrine", "professionnel", "ecommerce", "reservation", "custom"]
      },
      {
        projectType: "refonte",
        subTypes: ["refonte-design", "refonte-performance", "refonte-accessibilite", "refonte-securite", "refonte-fonctionnalite"]
      },
      {
        projectType: "optimisation",
        subTypes: ["optimisation-accessibilite", "optimisation-seo", "optimisation-securite", "optimisation-multi"]
      },
      {
        projectType: "maintenance",
        subTypes: ["maintenance-onepage", "maintenance-vitrine", "maintenance-professionnel", "maintenance-ecommerce", "maintenance-reservation", "maintenance-custom"]
      },
      {
        projectType: "formation",
        subTypes: ["ordinateur", "internet", "email", "securite-numerique", "ia", "custom"]
      },
      {
        projectType: "audit",
        subTypes: ["audit-accessibilite", "audit-seo", "audit-securite", "audit-all", "audit-flash"]
      }
    ]
  }),

  getters: {
    // estimatedPrice(state: { data: any }) {return calculatePrice(state.data);},
    isValidSubType: (state) => {
      return (projectType: string, subType: string) => {
        const typeConfig = state.allTypes.find(t => t.projectType === projectType)

        return typeConfig ? typeConfig.subTypes.includes(subType) : false
      }
    }
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
        case 0:
          this.step = 0;
          return true;
        case 1:
          if (this.data.projectType === "message") return true;
          else if (this.data.projectType !== "message" && !this.data.subType) {
            this.step = 1; // Ce qui envoie sur l'étape 2 (step: 1 + step++ = 2)
            return true;
          } else if (
            this.data.projectType && this.data.subType
          ) {
            this.step = 2; // Ce qui envoie sur l'étape 3 (step: 2 + step++ = 3)
            return true;
          }
        case 2:
          return this.isValidSubType;
        // return !!this.data.subType;
        case 3:
          if ((this.data.subType == 'audit-flash' && this.data.contact.website)) {
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
 */