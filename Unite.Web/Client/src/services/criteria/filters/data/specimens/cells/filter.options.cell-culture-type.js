import FilterOption from '../../filter.option.js';

class CellLineCultureType extends FilterOption{
    static availableOptions = [
        { value: "Suspension", label: "Suspension" },
        { value: "Adherent", label: "Adherent" }
    ];

    constructor(value) {
        var option = CellLineCultureType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default CellLineCultureType;