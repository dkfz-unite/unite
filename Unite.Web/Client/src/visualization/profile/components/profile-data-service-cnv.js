import { colors, dom } from "quasar";

const props = {
    code: (range) => range.code,
    tcn: (range) => range.cnv?.tcn,
    cna: (range) => range.cnv?.cna,
    gain: (range) => range.cnv?.cna == "Gain",
    loss: (range) => range.cnv?.cna == "Loss",
    neutral: (range) => range.cnv?.cna == "Neutral",
    undetermined: (range) => range.cnv?.cna == "Undetermined",
    loh: (range) => range.cnv?.loh == true,
    del: (range) => range.cnv?.del == true,
    color: (range) => getColor(range.cnv?.cna),
};

const names = {
    tcn: "TCN",
    cna: "CNA",
    gain: "Gain",
    loss: "Loss",
    neutral: "Neutral",
    undetermined: "Undetermined"
};

const colours = {
    gain: colors.getPaletteColor("green-5"),
    loss: colors.getPaletteColor("red-5"),
    neutral: colors.getPaletteColor("grey-4"),
    undetermined: colors.getPaletteColor("grey-3")
}

function getColor(type) {
    return type == "Gain" ? colours.gain
         : type == "Loss" ? colours.loss
         : type == "Neutral" ? colours.neutral
         : colours.undetermined
} 

function createDataset(name, values, x = (value) => value.x, y = (value) => value.y, color = (value) => value.color, xaxis = "x1", yaxis = "y1") {
    return {
        name: name,
        type: "scatter",
        mode: "markers",
        x: values.map(x),
        y: values.map(y),
        marker: { color: values.map(color) },
        xaxis: xaxis,
        yaxis: yaxis
    };
}

export function getStats(ranges) {
    const aggregate = (prop) => ranges.map(prop).reduce((a, b) => a + b);
    const share = (number, total) => Math.round(number / total * 100);
    
    const hasTcn = ranges.some(props.tcn);
    const sum = aggregate(range => !!range.cnv);
    const loss = aggregate(props.loss);
    const neutral = aggregate(props.neutral);
    const undetermined = aggregate(props.undetermined);
    const gain = aggregate(props.gain);

    return {
        hasTcn: hasTcn,
        sum: sum,
        data: [
            { number: loss, percent: share(loss, sum), text: names.loss, color: colours.loss },
            { number: neutral, percent: share(neutral, sum), text: names.neutral, color: colours.neutral },
            { number: undetermined, percent: share(undetermined, sum), text: names.undefined, color: colours.undetermined },
            { number: gain, percent: share(gain, sum), text: names.gain, color: colours.gain }
        ]
    };
}

export function getDataCna(ranges, xaxis = "x1", yaxis = "y1") {
    return [ createDataset(names.cna, ranges, props.code, props.cna, props.color, xaxis, yaxis) ];
}

export function getDataTcn(ranges, xaxis = "x1", yaxis = "y1") {
    return [ createDataset(names.tcn, ranges, props.code, props.tcn, props.color, xaxis, yaxis) ];
}

export function getScaleCna(anchor, domain) {
    return {
        title: null,
        anchor: anchor,
        domain: domain,
        autorange: false,
        fixedrange: true,
        showline: true,
        type: "category",
        categoryarray: ["Loss", "Neutral", "Gain"],
        // color: colors.getPaletteColor("blue")
    }
}

export function getScaleTcn(anchor, domain) {
    return {
        title: names.tcn,
        anchor: anchor,
        domain: domain,
        autorange: true,
        fixedrange: true,
        showline: true,
        zeroline: true,
        rangemode: "tozero",
        // color: colors.getPaletteColor("blue")
    }
}

export default {
    getStats,
    getDataCna,
    getDataTcn,
    getScaleCna,
    getScaleTcn
}