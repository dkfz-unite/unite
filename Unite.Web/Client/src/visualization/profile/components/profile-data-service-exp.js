import { colors } from "quasar";

const props = {
    code: (range) => range.code,
    reads: (range) => range.exp?.reads,
    tpm: (range) => range.exp?.tpm,
    fpkm: (range) => range.exp?.fpkm
};

const names = {
    reads: "Reads",
    tpm: "TPM",
    fpkm: "FPKM"
};

const colours = {
    reads: colors.getPaletteColor("black"),
    tpm: colors.getPaletteColor("teal-5"),
    fpkm: colors.getPaletteColor("purple-5")
}

function createDataset(name, color, visible, values, x = (value) => value.x, y = (value) => value.y, xaxis = "x1", yaxis = "y1") {
    return {
        name: name,
        type: "scatter",
        mode: "line",
        visible: visible,
        x: values.map(x),
        y: values.map(y),
        line: { width: 1, color: color },
        opacity: 0.5,
        xaxis: xaxis,
        yaxis: yaxis
    };
}

export function getData(ranges, xaxis = "x1", yaxis = "y1") {
    return [
        createDataset(names.reads, colours.reads, "legendonly", ranges, props.code, props.reads, xaxis, yaxis),
        createDataset(names.tpm, colours.tpm, "legendonly", ranges, props.code, props.tpm, xaxis, yaxis),
        createDataset(names.fpkm, colours.fpkm, null, ranges, props.code, props.fpkm, xaxis, yaxis)
    ];
}

export function getScale(anchor, domain) {
    return {
        title: "Expression",
        anchor: anchor,
        domain: domain,
        overlaying: "y",
        fixedrange: true,
        showline: true,
        showgrid: false,
        side: "right",
    }
}

export default {
    getData,
    getScale
}