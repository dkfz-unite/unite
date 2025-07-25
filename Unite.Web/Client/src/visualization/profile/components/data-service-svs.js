import { colors } from "quasar";
import dataService from "./data-service";
import { getLabel } from "@/_shared/helpers/enum-helpers";
import SvType from "@/domain/omics/variants/svs/models/enums/sv-type";

function getSvColor(entry) {
  const type = entry.e.type;

  return type == "DUP" ? colors.getPaletteColor("green-4")
       : type == "TDUP" ? colors.getPaletteColor("green-4")
       : type == "DEL" ? colors.getPaletteColor("red-4")
       : type == "INS" ? colors.getPaletteColor("blue-4")
       : type == "COM" ? colors.getPaletteColor("orange-4")
       : type == "ITX" ? colors.getPaletteColor("purple-4")
       : type == "CTX" ? colors.getPaletteColor("cyan-4")
       : colors.getPaletteColor("grey-4");
};

function getSvText(entry) {
  let tooltip = "";
      tooltip += `SV: ${entry.e.id}<br>`;
      tooltip += `Location: ${entry.e.position}<br>`;
      if (entry.e.length > 0)
        tooltip += `Length (bp): ${(entry.e.length).toLocaleString()}<br>`;
      tooltip += `Type: ${getLabel(entry.e.type, SvType.values)}<br>`;
      if (entry.e.genes > 0)
        tooltip += `Affected Genes: ${entry.e.genes.toLocaleString()}<br>`;
      return tooltip;
};

export function getScales(y, domain) {
  return dataService.getRangeScale(null, y, domain);
};

export function getSeries(entries, x, y) {
  // Spaces after name are added to align with genes track
  return dataService.getRangeSeries(entries, "SVs   ", x, y, getSvColor, getSvText);
};

export default {
  getScales,
  getSeries
};
