import { aboutSchema } from "./about";
import { clientSchema } from "./client";
import { contentSchema } from "./content";
import { experimentSchema } from "./experiment";
import { projectSchema } from "./project";
import { serviceSchema } from "./service";

export const contentRegistry = {
  content: {
    label: "Content",
    schema: contentSchema,
  },

  projects: {
    label: "Projects",
    schema: projectSchema,
  },

  experiments: {
    label: "Experiments",
    schema: experimentSchema,
  },

  clients: {
    label: "Clients",
    schema: clientSchema,
  },

  services: {
    label: "Services",
    schema: serviceSchema,
  },

  about: {
    label: "About",
    schema: aboutSchema,
  },
} as const;
