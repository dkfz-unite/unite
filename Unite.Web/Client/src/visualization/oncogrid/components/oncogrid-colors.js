import effectsMap from "../../_shared/genome/effects-map.js";

const colors = {};

effectsMap.forEach((value, key) => {
  colors[key] = value.color;
});

export default colors;