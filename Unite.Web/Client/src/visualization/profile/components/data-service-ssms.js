import { colors } from "quasar";
import dataService from "./data-service";
import { getLabel } from "@/_shared/helpers/enum-helpers";
import SsmType from "@/domain/genome/variants/ssms/models/enums/ssm-type";
import EffectImpact from "@/domain/genome/variants/_shared/variants/models/enums/effect-impact";
import EffectType from "@/domain/genome/variants/_shared/variants/models/enums/effect-type";

function getVariantText(entry) {
  let tooltip = "";
  tooltip += `<br>`;
  tooltip += `SSM: ${entry.e.id}<br>`;
  tooltip += `Location: ${entry.e.position}<br>`;
  tooltip += `Type: ${getLabel(entry.e.type, SsmType.values)}<br>`;
  tooltip += `DNA Change: ${entry.e.change}<br>`;
  if (entry.e.changeCodon)
    tooltip += `Codon Change: ${entry.e.changeCodon}<br>`;
  if (entry.e.changeProtein)
    tooltip += `Protein Change: ${entry.e.changeProtein}<br>`;
  tooltip += `Impact: ${getLabel(entry.e.impact, EffectImpact.values)}<br>`;
  tooltip += `Effect: ${getLabel(entry.e.effect, EffectType.values)}<br>`;
  tooltip += `Gene: ${entry.e.gene}<br>`;

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
      if (impact.n > 0)
        tooltip += `${getImpactName(index)}: ${impact.n}<br>`;
    });

    return tooltip;
  }
};

function getChangeName(number) {
  return number == 0 ? "<b>A</b>denine"
       : number == 1 ? "<b>C</b>ytosine"
       : number == 2 ? "<b>G</b>uanine"
       : "<b>T</b>hymine";
};

function getChangeColor(number) {
  return number == 0 ? colors.getPaletteColor("green-4")
       : number == 1 ? colors.getPaletteColor("red-4")
       : number == 2 ? colors.getPaletteColor("orange-4")
       : colors.getPaletteColor("blue-4");
};

function getChangeFromText(entry) {
  if (entry.e) {
    return getVariantText(entry);
  } else {
    var changes = entry.i.reduce((acc, impact) => {
      acc[0] += impact.f[0];
      acc[1] += impact.f[1];
      acc[2] += impact.f[2];
      acc[3] += impact.f[3];
      return acc;
    }, [0, 0, 0, 0]);

    let tooltip = "From:<br>";

    changes.forEach((change, index) => {
      if (change > 0)
        tooltip += `${getChangeName(index)}: ${change}<br>`;
    });

    return tooltip;
  }
};

function getChangeToText(entry) {
  if (entry.e) {
    return getVariantText(entry);
  } else {
    var changes = entry.i.reduce((acc, impact) => {
      acc[0] += impact.t[0];
      acc[1] += impact.t[1];
      acc[2] += impact.t[2];
      acc[3] += impact.t[3];
      return acc;
    }, [0, 0, 0, 0]);

    let tooltip = "To:<br>";

    changes.forEach((change, index) => {
      if (change > 0)
        tooltip += `${getChangeName(index)}: ${change}<br>`;
    });

    return tooltip;
  }
};

export function getImpactSeries(entries, number, x, y) {
  const name = getImpactName(number);
  const color = getImpactColor(number);
  const items = entries?.filter(entry => entry.i[number].n > 0) || [];

  return {
    name: name,
    type: "bar",
    x: items.map(entry => entry.r[0]),
    y: items.map(entry => entry.i[number].n),
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

export function getChangeFromSeries(entries, number, impacts, x, y) {
  const reducer = (entry) => impacts.reduce((count, impact) => count + entry.i[impact].f[number], 0);
  const name = getChangeName(number);
  const color = getChangeColor(number);
  const items = entries?.filter(entry => reducer(entry) > 0) || [];

  return {
    name: name,
    type: "bar",
    x: items.map(entry => entry.r[0]),
    y: items.map(entry => reducer(entry)),
    marker: { 
      color: color 
    },
    hoverinfo: "text",
    hovertext: items.map(entry => getChangeFromText(entry)),
    hoverlabel: dataService.hoverLabelStyle,
    xaxis: x,
    yaxis: y
  };
};

export function getChangeToSeries(entries, number, impacts, x, y) {
  const reducer = (entry) => impacts.reduce((count, impact) => count + entry.i[impact].t[number], 0);
  const name = getChangeName(number);
  const color = getChangeColor(number);
  const items = entries?.filter(entry => reducer(entry) > 0) || [];

  return {
    name: name,
    type: "bar",
    x: items.map(entry => entry.r[0]),
    y: items.map(entry => reducer(entry)),
    marker: { 
      color: color 
    },
    hoverinfo: "text",
    hovertext: items.map(entry => getChangeToText(entry)),
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
  getImpactSeries,
  getChangeFromSeries,
  getChangeToSeries
};
