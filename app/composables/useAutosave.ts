import type { Block } from "../types/blocks";

type SavePayload = {
  blocks: Block[];
  id: string;
};

export function useAutosave(options: {
  id: string;
  blocks: Ref<Block[]>;
  save: (payload: SavePayload) => Promise<void>;
  delay?: number;
}) {
  const status = ref<"idle" | "saving" | "saved" | "error">("idle");
  const lastSaved = ref<Block[]>([]);

  const triggerSave = async () => {
    status.value = "saving";

    try {
      await options.save({
        id: options.id,
        blocks: structuredClone(options.blocks.value),
      });

      lastSaved.value = structuredClone(options.blocks.value);
      status.value = "saved";
    } catch (e) {
      status.value = "error";
    }
  };

  const debounceSave = useDebounceFn(triggerSave, options.delay ?? 800);
  const isRemoteUpdate = ref(false);

  watch(
    options.blocks,
    () => {
      if(isRemoteUpdate.value) return;
      
      status.value = "idle";
      debounceSave();
    },
    {
      deep: true,
    },
  );

  return {
    status,
    lastSaved,
    triggerSave,
  };
}
