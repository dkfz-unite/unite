import FilterOption from '../filter.option.js';

class MgmtStatus extends FilterOption{
    static availableOptions = [
        { value: "Unmethylated", label: "Unmethylated" },
        { value: "Methylated", label: "Methylated" }
    ];

    static Unmethylated = this.availableOptions[0];
    static Methylated = this.availableOptions[1];

    constructor(value) {
        var option = this.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default MgmtStatus;