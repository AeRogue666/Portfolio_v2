export default defineAppConfig({
  theme: {
    dark: true,
  },
  ui: {
    icons: {
      system: "fa7-solid:desktop",
      light: "fa7-solid:sun",
      dark: "fa7-solid:moon",
    },
    prose: {
      a: {
        base: 'border-b border-transparent hover:border-(--border-subtle) text-(--text) fs-body underline decoration-current decoration-1 underline-offset-4 transition-all duration-200 hover:text-(--focus) hover:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-2) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg)rounded-sm'
      }
    }
  },
});
