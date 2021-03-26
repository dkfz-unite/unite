import FilterOption from '../filter.option.js';

class Impact extends FilterOption{
    static availableOptions = [
        { value: "High", label: "High" },
        { value: "Moderate", label: "Moderate" },
        { value: "Low", label: "Low" },
        { value: "Unknown", label: "Unknown" }
    ];

    constructor(value) {
        super();

        var option = Impact.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default Impact;