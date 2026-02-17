export function useContactForm() {
  const submitState = ref<"idle" | "loading" | "success" | "error">("idle"),
    loading = computed(() => submitState.value === "loading");

  const toast = useToast(),
    overlay = useOverlay();

  async function submit(
    data: {
      email: string;
      message: string;
      website?: string;
    },
    onSuccess?: () => void,
  ) {
    submitState.value = "loading";

    try {
      await $fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      submitState.value = "success";

      toast.add({
        title: "Message sent",
        description: "Your message has been successfully delivered.",
        color: "success",
      });

      onSuccess?.();
    } catch (error: any) {
      submitState.value = "error";

      toast.add({
        title: "Error",
        description: error.data.statusMessage || "Something went wrong.",
        color: "error",
      });
    }

    setTimeout(() => {
      overlay.close("contact-modal");
      submitState.value = "idle";
    }, 1800);
  }

  return {
    submitState,
    loading,
    submit,
  };
}
