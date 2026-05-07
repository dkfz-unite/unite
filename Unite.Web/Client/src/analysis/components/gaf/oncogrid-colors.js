import effectsMap from "@/visualization/_shared/genome/effects-map2.js";

const colors = {};

effectsMap.forEach((value, key) => {
  colors[key] = value.color;
});

export default colors;