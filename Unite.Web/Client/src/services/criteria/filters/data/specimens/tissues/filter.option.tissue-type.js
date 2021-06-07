import FilterOption from '../../filter.option.js';

class TissueType extends FilterOption{
    static availableOptions = [
        { value: "Control", label: "Control" },
        { value: "Tumour", label: "Tumour" }
    ];

    constructor(value) {
        var option = TissueType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default TissueType;