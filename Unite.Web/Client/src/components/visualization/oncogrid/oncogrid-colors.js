import consequences from "../_common/consequences.js";

const colors = consequences.reduce((self, item) => { return { ...self, [item["type"]]: item.color } });

export default colors;