import { colors } from "quasar";
import dataService from "./data-service";
import { getLabel } from "@/_shared/helpers/enum-helpers";
import CnvType from "@/domain/genome/variants/cnvs/models/enums/cnv-type";

function getCnvColor(entry) {
  const type = entry.e.type;
  const tcn = entry.e.tcn;
  const loh = entry.e.loh;

  if (type == "Gain") {
    return tcn >= 10 ? colors.getPaletteColor("green-10")
      : colors.getPaletteColor("green-4");
  } else if (type == "Loss") {
    return tcn <= 0.3 ? colors.getPaletteColor("red-10")
      : colors.getPaletteColor("red-4");
  } else if (type == "Neutral") {
    return loh ? colors.getPaletteColor("orange-4")
      : colors.getPaletteColor("grey-4");
  } else {
    return colors.getPaletteColor("orange-4");
  }
};

function getColorLoh(entry) {
  return colors.getPaletteColor("orange-4");
}

function getCnvText(entry) {
  const loh = entry.e.loh ? " LOH" : "";
  const del = entry.e.del ? " DEL" : "";

  let tooltip = "";
  tooltip += `CNV: ${entry.e.id}<br>`;
  tooltip += `Location: ${entry.e.position}<br>`;
  tooltip += `Length (bp): ${(entry.e.length).toLocaleString()}<br>`;
  tooltip += `Type: ${getLabel(entry.e.type, CnvType.values)}${loh}${del}<br>`;
  tooltip += `TCN: ${entry.e.tcn}<br>`;
  if (entry.e.genes > 0)
    tooltip += `Affected Genes: ${entry.e.genes.toLocaleString()}<br>`;
  return tooltip;
};

export function getScales(y, domain) {
  return dataService.getRangeScale(null, y, domain);
};

export function getSeries(entries, x, y) {
  return dataService.getRangeSeries(entries, "CNVs", x, y, getCnvColor, getCnvText);
};

export default {
  getScales,
  getSeries
};
