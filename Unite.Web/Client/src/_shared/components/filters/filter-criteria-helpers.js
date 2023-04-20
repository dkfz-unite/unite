export function sanitizeString(value) {
    return value?.trim();
}

export function sanitiseArray(values, numbers = false) {
    if (numbers === true) {
        let numberValues = values
            ?.filter(value => !isNaN(value.trim()))
            ?.map(value => value.trim());

        return numberValues?.length ? numberValues : [];
    } else {
        return values?.length ? values.map(value => value.trim()) : [];
    }
}

export function sanitiseRange(range) {
    var from = !!range?.from && !isNaN(range.from) ? +range.from : null;
    var to = !!range?.to && !isNaN(range.to) ? +range.to : null;

    return { from: from, to: to };
}

export function sanitiseThreshold(model) {
    var value = !!model?.value && !isNaN(model.value) ? +model.value : null;
    var mode = model?.mode != null ? model.mode : true;

    return { value: value, mode: mode };
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
    sanitizeString: sanitizeString,
    sanitiseArray: sanitiseArray,
    sanitiseRange: sanitiseRange,
    sanitiseThreshold: sanitiseThreshold,
    copy: copy
}