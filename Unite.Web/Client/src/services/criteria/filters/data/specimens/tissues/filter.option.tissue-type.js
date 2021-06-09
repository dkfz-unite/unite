import FilterOption from '../../filter.option.js';

class TissueType extends FilterOption{
    static availableOptions = [
        { value: "Control", label: "Control" },
        { value: "Tumour", label: "Tumour" }
    ];

    static Control = this.availableOptions[0];
    static Tumour = this.availableOptions[1];

    constructor(value) {
        var option = TissueType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default TissueType;