import FilterOption from '../../filter.option.js';

class CellLineType extends FilterOption{
    static availableOptions = [
        { value: "GCS", label: "GCS" },
        { value: "Suspension", label: "Suspension" }
    ];

    constructor(value) {
        var option = CellLineType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default CellLineType;