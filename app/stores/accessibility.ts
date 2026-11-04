export type ContrastMode = "normal" | "high" | "low";
export type FontScale = 1 | 1.25 | 1.5 | 1.75 | 2;
export type FontFamily = "source-sans" | "atkinson" | "roboto";
export type ReadingDirection = "ltr" | "rtl";

export interface AccessibilityState {
  fontScale: FontScale;
  grayscale: boolean;
  contrast: ContrastMode;
  underlineLinks: boolean;
  fontFamily: FontFamily;
  readingDirection: ReadingDirection;
}

const DEFAULT_STATE: AccessibilityState = {
  fontScale: 1,
  grayscale: false,
  contrast: "normal",
  underlineLinks: false,
  fontFamily: "source-sans",
  readingDirection: "ltr",
};

export const useAccessibilityStore = defineStore("accessibility", () => {
  const contrast = ref<ContrastMode>("normal");
  const fontFamily = ref<FontFamily>("source-sans");
  const grayscale = ref<boolean>(false);
  const underlineLinks = ref<boolean>(false);
  const fontScale = ref<FontScale>(1);
  const readingDirection = ref<ReadingDirection>("ltr");

  useHead({
    htmlAttrs: {
      "data-contrast": () => contrast.value,
      "data-font-family": () => fontFamily.value,
      "data-grayscale": () => (grayscale.value ? "true" : "false"),
      "data-underline-links": () => (underlineLinks.value ? "true" : "false"),
      "dir": () => readingDirection.value,
      style: () => `--text-scale: ${fontScale.value};`,
    },
  });

  function changeFont(value: FontFamily) {
    fontFamily.value = value;
  }
  function increaseFont() {
    // FONT SCALE
    const scales: FontScale[] = [1, 1.25, 1.5, 1.75, 2];
    const i = scales.indexOf(fontScale.value);
    if (i !== -1 && i < scales.length - 1)
      fontScale.value = scales[i + 1] as FontScale;
  }
  function decreaseFont() {
    // FONT SCALE
    const scales: FontScale[] = [1, 1.25, 1.5, 1.75, 2];
    const i = scales.indexOf(fontScale.value);
    if (i > 0) fontScale.value = scales[i - 1] as FontScale;
  }
  function changeDirection(dir: ReadingDirection) {
    readingDirection.value = dir
  }
  function changeTextContrast(mode: ContrastMode) {
    contrast.value = mode
  }
  function toggleGrayscale() {
    grayscale.value = !grayscale.value;
  }
  function toggleUnderlineLinks() {
    underlineLinks.value = !underlineLinks.value;
  }
  function reset() {
    contrast.value = "normal";
    fontFamily.value = "source-sans";
    grayscale.value = false;
    underlineLinks.value = false;
    fontScale.value = 1;
  }

  return {
    contrast,
    fontFamily,
    grayscale,
    underlineLinks,
    fontScale,
    changeFont,
    changeDirection,
    changeTextContrast,
    toggleGrayscale,
    toggleUnderlineLinks,
    increaseFont,
    decreaseFont,
    reset,
  };
});

/* export const useAccessibilityStore = defineStore("accessibility", {
  state: (): AccessibilityState => ({ ...DEFAULT_STATE }),

  actions: {
    apply() {
      const html = document.documentElement;

      html.style.setProperty("--text-scale", String(this.fontScale));
      html.dataset.contrast = this.contrast;
      html.dataset.grayscale = String(this.grayscale);
      html.dataset.underline = String(this.underlineLinks);
      html.dataset.font = this.fontFamily;
      html.dir = this.direction;
    },
    reset() {
      Object.assign(this, DEFAULT_STATE);
    },
    increaseFont() {
      // FONT SCALE
      const scales: FontScale[] = [1, 1.25, 1.5, 1.75, 2];
      const i = scales.indexOf(this.fontScale);
      if (i !== -1 && i < scales.length - 1) this.fontScale = scales[i + 1] as FontScale;
    },
    decreaseFont() {
      // FONT SCALE
      const scales: FontScale[] = [1, 1.25, 1.5, 1.75, 2];
      const i = scales.indexOf(this.fontScale);
      if (i > 0) this.fontScale = scales[i - 1] as FontScale;
    },
    changeFont(font: FontFamily) {
      // FONT FAMILY
      this.fontFamily = font;
    },
    toggleGrayscale() {
      // GRAYSCALE
      this.grayscale = !this.grayscale;
    },
    toggleUnderlineLinks() {
      // UNDERLINE LINKS
      this.underlineLinks = !this.underlineLinks;
    },
    changeTextContrast(contrast: ContrastMode) {
      // CONTRAST
      this.contrast = contrast;
    },
  },
});
 */
