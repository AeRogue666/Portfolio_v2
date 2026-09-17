export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.afterEach(() => {
    nextTick(() => {
      const mainContent =
        document.querySelector("main") || document.querySelector("h1");

      if (mainContent) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.style.outline = "none";
        mainContent.focus();
      }
    });
  });
});
