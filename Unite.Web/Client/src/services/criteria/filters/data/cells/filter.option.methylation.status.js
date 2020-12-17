import FilterOption from '../filter.option.js';

class MethylationStatus extends FilterOption{
    static availableOptions = [
        { value: "Unmethylated", label: "Unmethylated" },
        { value: "Methylated", label: "Methylated" }
    ];

    constructor(value) {
        var option = MethylationStatus.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default MethylationStatus;