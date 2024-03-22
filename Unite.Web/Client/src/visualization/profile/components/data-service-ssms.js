import { colors } from "quasar";
import dataService from "./data-service";
import { getLabel } from "@/_shared/helpers/enum-helpers";
import SsmType from "@/domain/genome/variants/ssms/models/enums/ssm-type";

function getVariantText(entry) {
  let tooltip = "";
  tooltip += `<br>`;
  tooltip += `SSM: ${entry.e.id}<br>`;
  tooltip += `Location: ${entry.e.position}<br>`;
  tooltip += `Type: ${getLabel(entry.e.type, SsmType.values)}<br>`;
  tooltip += `Change: ${entry.e.change}<br>`;
  tooltip += `Impact: ${entry.e.impact}<br>`;
  tooltip += `Consequence: ${entry.e.consequence}<br>`;

  return tooltip;
};

function getImpactName(number) {
  return number == 0 ? "High"
       : number == 1 ? "Moderate"
       : number == 2 ? "Low"
       : "Unknown";
};

function getImpactColor(number) {
  return number == 0 ? colors.getPaletteColor("red-4")
       : number == 1 ? colors.getPaletteColor("orange-4")
       : number == 2 ? colors.getPaletteColor("green-4")
       : colors.getPaletteColor("grey-4");
};

function getImpactText(entry) {
  if (entry.e) {
    return getVariantText(entry);
  } else {
    let tooltip = "";

    entry.i.forEach((impact, index) => {
      if (impact > 0)
        tooltip += `${getImpactName(index)}: ${impact}<br>`;
    });

    return tooltip;
  }
};

export function getImpactSeries(entries, number, x, y) {
  const name = getImpactName(number);
  const color = getImpactColor(number);
  const items = entries?.filter(entry => entry.i[number] > 0) || [];

  return {
    name: name,
    type: "bar",
    x: items.map(entry => entry.r[0]),
    y: items.map(entry => entry.i[number]),
    marker: { 
      color: color 
    },
    hoverinfo: "text",
    hovertext: items.map(entry => getImpactText(entry)),
    hoverlabel: dataService.hoverLabelStyle,
    xaxis: x,
    yaxis: y
  };
};

export function getScales(y, domain, maxValue) {
  return {
    title: "#Mutations",
    type: "number",
    anchor: y,
    domain: domain,
    fixedrange: true,
    zeroline: true,
    showline: true,
    mirror: true,
    dtick: maxValue <= 5 ? 1 : null,
    rangemode: "tozero"
  };
};

export default {
  getScales,
  getImpactSeries
};
