import FilterOption from '../filter.option.js';

class SequenceType extends FilterOption {
    static availableOptions = [
        { value: "c", label: "Coding DNA (c)" },
        { value: "n", label: "Non Coding DNA (n)" },
        { value: "g", label: "Linear Genomic DNA (g)" },
        { value: "o", label: "Circular Genomic DNA (o)" },
        { value: "m", label: "Mitochondrial DNA (m)" },
        { value: "r", label: "RNA (r)" },
        { value: "p", label: "Protein (p)" }
    ];

    constructor(value) {
        super();

        var option = SequenceType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default SequenceType;