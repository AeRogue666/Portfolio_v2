export type ContrastMode = "normal" | "high" | "low";
export type FontScale = 1 | 1.25 | 1.5 | 1.75 | 2;
export type FontFamily = "source-sans" | "atkinson" | "roboto";

export interface AccessibilityState {
  fontScale: FontScale;
  grayscale: boolean;
  contrast: ContrastMode;
  underlineLinks: boolean;
  fontFamily: FontFamily;
}

const DEFAULT_STATE: AccessibilityState = {
  fontScale: 1,
  grayscale: false,
  contrast: "normal",
  underlineLinks: false,
  fontFamily: "source-sans",
};

export const useAccessibilityStore = defineStore("accessibility", {
  state: (): AccessibilityState => ({ ...DEFAULT_STATE }),

  actions: {
    apply() {
      const html = document.documentElement;

      html.style.setProperty("--text-scale", String(this.fontScale));
      html.dataset.contrast = this.contrast;
      html.dataset.grayscale = String(this.grayscale);
      html.dataset.underline = String(this.underlineLinks);
      html.dataset.font = this.fontFamily;
    },
    reset() {
      Object.assign(this, DEFAULT_STATE);
    },
    increaseFont() {
      // FONT SCALE
      const scales: FontScale[] = [1, 1.25, 1.5, 1.75, 2];
      const i = scales.indexOf(this.fontScale);
      if (i < scales.length - 1) this.fontScale = scales[i + 1];
    },
    decreaseFont() {
      // FONT SCALE
      const scales: FontScale[] = [1, 1.25, 1.5, 1.75, 2];
      const i = scales.indexOf(this.fontScale);
      if (i > 0) this.fontScale = scales[i - 1];
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
