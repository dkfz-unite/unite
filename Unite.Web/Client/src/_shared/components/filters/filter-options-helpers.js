export function mapOptions(options, labels) {
    let mappings = [];

    for (const label in labels) {
        const value = labels[label];

        const option = options 
            ? options.find(option => option.value == value) 
            : { value: value };

        if (option) {
            mappings.push({ label: label, value: option.value, amount: option.amount, total: option.total });
        } else {
            continue;
        }
    }

    return mappings;
}

export default {
    mapOptions: mapOptions
}