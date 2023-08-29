import { colors } from "quasar";

let colorsSet = ["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "amber", "orange"];
let colorsIndex = 0;

export function next(tone = null) {
  let colorTone = tone > 0 ? `-${tone % 10}` : ``;
  let color = colors.getPaletteColor(colorsSet[colorsIndex] + colorTone);
  colorsIndex = (colorsIndex + 1) % colorsSet.length;
  return color;
}

export function reset() {
  colorsIndex = 0;
}

export default {
  next,
  reset
}