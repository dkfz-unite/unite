import { colors } from "quasar";

const map = new Map();
map.set("High", { name: "High", color: colors.getPaletteColor("red-8") });
map.set("Moderate", { name: "Moderate", color: colors.getPaletteColor("orange-8") });
map.set("Low", { name: "Low", color: colors.getPaletteColor("green-8") });
map.set("Unknown", { name: "Unknown", color: colors.getPaletteColor("grey-8") });

export default map;