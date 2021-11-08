export function sanitiseArray(values) {
    return values?.length ? values.map(value => value.trim()) : [];
}

export function sanitiseRange(range) {
    var from = !!range?.from && !isNaN(range.from) ? +range.from : null;
    var to = !!range?.to && !isNaN(range.to) ? +range.to : null;

    return { from: from, to: to };
}

export function copy(source) {
    const criteria = {};

    for (const property in source) {
        if (Object.hasOwnProperty.call(source, property)) {
            const value = source[property];

            if (value instanceof Array) {
                if (value?.length) {
                    criteria[property] = value;
                    continue;
                }
            } else if ( value instanceof Object) {
                if (value?.from != null || value?.to != null) {
                    criteria[property] = value;
                    continue;
                }
            } else {
                if (value != null) {
                    criteria[property] = value;
                    continue;
                }
            }
        }
    }

    return criteria;
}

export default {
    sanitiseArray: sanitiseArray,
    sanitiseRange: sanitiseRange,
    copy: copy
}