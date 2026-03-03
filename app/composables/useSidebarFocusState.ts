export const useSidebarFocusState = () => {
  const isModalOpen = ref(false);

  const setModalOpen = (value: boolean) => {
    isModalOpen.value = value;
  };

  provide("sidebarFocusState", { isModalOpen, setModalOpen });

  return { isModalOpen, setModalOpen };
};

export const useSidebarFocusStateInject = () => {
  const state = inject<{
    isModalOpen: Ref<boolean>;
    setModalOpen: (value: boolean) => void;
  }>("sidebarFocusState");

  if (!state) {
    throw new Error(
      "useSidebarFocusStateInject must be used within a component that has called useSIdebarFocusState",
    );
  }

  return state;
};
