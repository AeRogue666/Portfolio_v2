export default defineNuxtPlugin(() => {
  const router = useRouter();
  let isInitialLoad = true;

  router.afterEach(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }
    
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
