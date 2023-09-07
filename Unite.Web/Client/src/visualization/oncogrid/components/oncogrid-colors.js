import consequencesMap from "../../_shared/genome/consequences-map.js";

const colors = {};

consequencesMap.forEach((value, key) => {
  colors[key] = value.color;
});

export default colors;