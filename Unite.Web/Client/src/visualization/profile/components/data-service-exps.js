import { colors } from "quasar";
import dataService from "./data-service";

function getGeneText(entry) {
  let tooltip = "";
  tooltip += `<br>`;
  tooltip += `Gene: ${entry.e.gene}<br>`;
  tooltip += `Reads: ${entry.reads[0]}<br>`;
  tooltip += `TPM: ${entry.reads[1]}<br>`;
  tooltip += `FPKM: ${entry.reads[2]}<br>`;

  return tooltip;
};

function getExpressionName(number) {
  return number == 0 ? "Reads"
       : number == 1 ? "TPM"
       : "FPKM";
};

function getExpressionColor(number) {
  return number == 0 ? colors.getPaletteColor("grey-9")
       : number == 1 ? colors.getPaletteColor("teal-4")
       : colors.getPaletteColor("purple-4");
};

function getExpressionText(entry) {
  if (entry.e) {
    return getGeneText(entry);
  } else {
    let tooltip = "";

    tooltip += `Reads: ${entry.reads[0]}<br>`;
    tooltip += `TPM: ${entry.reads[1]}<br>`;
    tooltip += `FPKM: ${entry.reads[2]}<br>`;

    return tooltip;
  }
}

export function getScales(name, y, domain, maxValue) {
  return {
    title: name,
    type: "number",
    anchor: y,
    domain: domain,
    fixedrange: true,
    zeroline: true,
    showline: true,
    mirror: true,
    side: "left",
    dtick: maxValue <= 5 ? 1 : null,
    rangemode: "tozero"
  };
};

export function getSeries(entries, number, x, y) {
  const name = getExpressionName(number);
  const color = getExpressionColor(number);
  const items = entries?.filter(entry => entry.reads[number] > 0) || [];

  return {
    name: name,
    type: "scatter",
    mode: "lines",
    x: items.map(entry => entry.r[0]),
    y: items.map(entry => entry.reads[number]),
    opacity: 0.5,
    line: { 
      color: color,
      width: 1,
    },
    hoverinfo: "text",
    hovertext: items.map(entry => getExpressionText(entry)),
    hoverlabel: dataService.hoverLabelStyle,
    xaxis: x,
    yaxis: y
  };
};

export default {
  getScales,
  getSeries
};
