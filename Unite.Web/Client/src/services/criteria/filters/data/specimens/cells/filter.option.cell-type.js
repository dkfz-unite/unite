import FilterOption from '../../filter.option.js';

class CellLineType extends FilterOption{
    static availableOptions = [
        { value: "Stem Cell", label: "Stem Cell" },
        { value: "Differentiated", label: "Differentiated" }
    ];

    constructor(value) {
        var option = CellLineType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default CellLineType;