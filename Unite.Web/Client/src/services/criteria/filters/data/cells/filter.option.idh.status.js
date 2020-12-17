import FilterOption from '../filter.option.js';

class IDHStatus extends FilterOption{
    static availableOptions = [
        { value: "WildType", label: "WildType" },
        { value: "Mutant", label: "Mutant" }
    ];

    constructor(value) {
        var option = IDHStatus.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default IDHStatus;