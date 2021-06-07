import FilterOption from '../../filter.option.js';

class TumourType extends FilterOption{
    static availableOptions = [
        { value: "Primary", label: "Primary" },
        { value: "Metastasis", label: "Metastasis" },
        { value: "Recurrent", label: "Recurrent" }
    ];

    constructor(value) {
        var option = TumourType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default TumourType;