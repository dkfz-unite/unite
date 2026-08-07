import { colors } from "quasar";
import palettes from "./palettes";

export default class RandomColors {
  palette: string[] = palettes.summer;
  index: number = 0;

  constructor(palette?: string[]) {
    if (palette) {
      this.palette = palette;
    }
  }

  next(tone?: number) {
    const paletteColor = this.palette[this.index];
    this.index = (this.index + 1) % this.palette.length;

    if (tone != null) {
      const customColor = paletteColor.replace(/-\d+$/, `-${tone}`);
      return colors.getPaletteColor(customColor);
    } else {
      return colors.getPaletteColor(paletteColor);
    }
  }
}
