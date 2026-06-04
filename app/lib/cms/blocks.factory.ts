import type { Block } from "@/types/blocks";

export function createBlock(type: Block["type"]): Block {
  switch (type) {
    case "richText":
      return {
        id: crypto.randomUUID(),
        type,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
            },
          ],
        },
      };
    case "hero":
      return {
        id: crypto.randomUUID(),
        type,
        title: "",
        subtitle: "",
      };

    case "cta":
      return {
        id: crypto.randomUUID(),
        type,
        title: "",
        buttonLabel: "",
        buttonHref: ""
      };

    case "image":
      return {
        id: crypto.randomUUID(),
        type,
        src: "",
        alt: ""
      };

    case "packages":
      return {
        id: crypto.randomUUID(),
        type,
        packages: []
      };
    default:
      throw new Error(`Unknown block type: ${type}`);
  }
}

/* export function createRichTextEditor(): RichTextBlock {
  return {
    id: crypto.randomUUID(),
    type: "richText",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
  };
}
 */
