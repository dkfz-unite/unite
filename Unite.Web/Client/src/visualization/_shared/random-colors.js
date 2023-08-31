import { colors } from "quasar";

export default class RandomColors {
  colorsSet = ["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"];
  colorsIndex = 0;

  constructor() {
  }

  next(tone = null) {
    let colorTone = tone > 0 ? `-${tone % 10}` : ``;
    let color = colors.getPaletteColor(this.colorsSet[this.colorsIndex] + colorTone);
    this.colorsIndex = (this.colorsIndex + 1) % this.colorsSet.length;
    return color;
  }
}
