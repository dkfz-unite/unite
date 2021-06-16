import FilterOption from '../../filter.option.js';

class TumorType extends FilterOption{
    static availableOptions = [
        { value: "Primary", label: "Primary" },
        { value: "Metastasis", label: "Metastasis" },
        { value: "Recurrent", label: "Recurrent" }
    ];

    constructor(value) {
        var option = TumorType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default TumorType;