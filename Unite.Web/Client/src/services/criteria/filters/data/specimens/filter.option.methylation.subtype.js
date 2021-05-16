import FilterOption from '../filter.option.js';

class MethylationSubtype extends FilterOption{
    static availableOptions = [
        { value: "H3-K27", label: "H3-K27" },
        { value: "H3-G34", label: "H3-G34" },
        { value: "RTKI", label: "RTKI" },
        { value: "RTKII", label: "RTKII" },
        { value: "Mesenchymal", label: "Mesenchymal" }
    ];

    constructor(value) {
        var option = MethylationSubtype.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default MethylationSubtype;