import { colors } from "quasar";
import dataService from "./data-service";
import { getLabel } from "@/_shared/helpers/enum-helpers";
import Biotype from "@/domain/genome/genes/models/enums/biotype";

function getGeneColor(entry) {
  return colors.getPaletteColor("blue-4");
};

function getGeneColorPlus(entry) {
  return colors.getPaletteColor("grey-4");
};

function getGeneColorMinus(entry) {
  return colors.getPaletteColor("grey-6");
}

function getGeneText(entry) {
  let tooltip = "";
  tooltip += `Gene: ${entry.e.symbol}<br>`;
  tooltip += `Location: ${entry.e.position}<br>`;
  tooltip += `Strand: ${entry.e.strand ? "+" : "-"}<br>`;
  tooltip += `Total length (bp): ${(entry.e.length).toLocaleString()}<br>`;
  tooltip += `Exonic length (bp): ${(entry.e.lengthExons).toLocaleString()}<br>`;
  tooltip += `Biotype: ${getLabel(entry.e.biotype, Biotype.values)}<br>`;
  return tooltip;
}

export function getScales(y, domain) {
  return dataService.getRangeScale(null, y, domain);
};

export function getSeries(entries, x, y) {
  return dataService.getRangeSeries(entries, "Genes", x, y, getGeneColor, getGeneText);
};

export function getSeriesPlus(entries, x, y) {
  const genes = entries.filter(e => e.e.strand === true);
  return dataService.getRangeSeries(genes, "Genes +", x, y, getGeneColorPlus, getGeneText);
}

export function getSeriesMinus(entries, x, y) {
  const genes = entries.filter(e => e.e.strand === false);
  return dataService.getRangeSeries(genes, "-", x, y, getGeneColorMinus, getGeneText);
}

export default {
  getScales,
  getSeries,
  getSeriesPlus,
  getSeriesMinus
};
