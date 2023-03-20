import { colors } from "quasar";

const props = {
    code: (range) => range.code,
    impact: {
        h: (range) => range.ssm?.h || 0,
        m: (range) => range.ssm?.m || 0,
        l: (range) => range.ssm?.l || 0,
        u: (range) => range.ssm?.u || 0,
        max: (range) => Math.max(range.ssm?.h || 0, range.ssm?.m || 0, range.ssm?.l || 0, range.ssm?.u || 0),
        sum: (range) => (range.ssm?.h || 0) + (range.ssm?.m || 0) + (range.ssm?.l || 0) + (range.ssm?.u || 0)
    }
};

const names = {
    impact: {
        h: "High",
        m: "Moderate",
        l: "Low",
        u: "Unknown"
    }
};

const colours = {
    impact: {
        h: colors.getPaletteColor("red-5"),
        m: colors.getPaletteColor("orange-5"),
        l: colors.getPaletteColor("green-5"),
        u: colors.getPaletteColor("grey-4")
    }
}

function createDataset(name, color, values, x = (value) => value.x, y = (value) => value.y, xaxis = "x1", yaxis = "y1") {
    return {
        name: name,
        type: "bar",
        x: values.map(x),
        y: values.map(y),
        marker: { color: color },
        xaxis: xaxis,
        yaxis: yaxis
    };
}

export function getStatsImpact(ranges) {
    const maximize = (prop) => Math.max(...ranges.map(prop));
    const aggregate = (prop) => ranges.map(prop).reduce((a, b) => a + b);
    const share = (number, total) => Math.round(number / total * 100);
    
    const max = maximize(props.impact.max);
    const sum = aggregate(props.impact.sum);
    const h = aggregate(props.impact.h);
    const m = aggregate(props.impact.m);
    const l = aggregate(props.impact.l);
    const u = aggregate(props.impact.u);

    return {
        max: max,
        sum: sum,
        data: [
            { number: h, percent: share(h, sum), text: names.impact.h, color: colours.impact.h },
            { number: m, percent: share(m, sum), text: names.impact.m, color: colours.impact.m },
            { number: l, percent: share(l, sum), text: names.impact.l, color: colours.impact.l },
            { number: u, percent: share(u, sum), text: names.impact.u, color: colours.impact.u }
        ]
    };
}

export function getDataImpact(ranges, xaxis = "x1", yaxis = "y1") {
    return [
        createDataset(names.impact.h, colours.impact.h, ranges, props.code, props.impact.h, xaxis, yaxis),
        createDataset(names.impact.m, colours.impact.m, ranges, props.code, props.impact.m, xaxis, yaxis),
        createDataset(names.impact.l, colours.impact.l, ranges, props.code, props.impact.l, xaxis, yaxis),
        createDataset(names.impact.u, colours.impact.u, ranges, props.code, props.impact.u, xaxis, yaxis)
    ];
}

export function getScaleImpact(anchor, domain, dtick) {
    return {
        title: "#Mutations",
        anchor: anchor,
        domain: domain,
        fixedrange: true,
        showline: true,
        side: "left",
        dtick: dtick
    }
}

export default {
    getStatsImpact,
    getDataImpact,
    getScaleImpact
}