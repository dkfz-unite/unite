import FilterOption from '../../filter.option.js';

class TumorGrowthForm extends FilterOption{
    static availableOptions = [
        { value: "Encapsulated", label: "Encapsulated" },
        { value: "Invasive", label: "Invasive" }
    ];

    static Encapsulated = this.availableOptions[0];
    static Invasive = this.availableOptions[1];

    constructor(value) {
        var option = this.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default TumorGrowthForm;