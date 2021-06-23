import FilterOption from '../filter.option.js';

class IdhStatus extends FilterOption{
    static availableOptions = [
        { value: "Wild Type", label: "Wild Type" },
        { value: "Mutant", label: "Mutant" }
    ];

    static WildType = this.availableOptions[0];
    static Mutant = this.availableOptions[1];

    constructor(value) {
        var option = this.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default IdhStatus;