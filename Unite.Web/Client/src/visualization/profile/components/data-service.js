import { colors } from "quasar";

export function getChromosomeLabel(chr) {
  return chr == "23" ? "X" : chr == "24" ? "Y" : `${chr}`;
};

export function getPositionLabel(pos) {
  if (pos < 1e3)
    return `${pos}`;
  else if (pos < 1e6)
    return `${(pos / 1e3).toFixed(1)}K`;
  else if (pos < 1e9)
    return `${(pos / 1e6).toFixed(1)}M`;
  else
    return `${(pos / 1e9).toFixed(1)}B`;
};

export function getRangeScale(name, y, domain) {
  return {
    title: name,
    anchor: y,
    type: "category",
    domain: domain,
    fixedrange: true,
    showline: true,
    mirror: true,
  };
};

export function getRangeSeries(entries, name, x, y, getColor, getText) {
  if (!entries?.length)
    return getRangeSeriesEmpty(name, x, y);

  return {
    name: name,
    type: "bar",
    orientation: "h",
    base: entries.map(entry => entry.r[0]),
    x: entries.map(entry => entry.r[1] - entry.r[0] + 1),
    y: entries.map(entry => name),
    marker: { 
      color: entries.map(entry => getColor(entry))
    },
    hoverinfo: "text",
    hovertext: entries.map(entry => getText(entry)),
    hoverlabel: hoverLabelStyle,
    xaxis: x,
    yaxis: y,
  };
};

function getRangeSeriesEmpty(name, x, y) {
  return {
    name: name,
    type: "bar",
    orientation: "h",
    x: [0],
    y: [name],
    marker: { 
      color: colors.getPaletteColor("transparent")
    },
    xaxis: x,
    yaxis: y,
  };
};

export const hoverLabelStyle = {
  bgcolor: colors.getPaletteColor("white"),
  bordercolor: colors.getPaletteColor("black"),
  font: { color: colors.getPaletteColor("black") }
};

export default {
  getChromosomeLabel,
  getPositionLabel,
  getRangeScale,
  getRangeSeries,
  hoverLabelStyle
};