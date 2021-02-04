import FilterOption from '../filter.option.js';

class MutationType extends FilterOption{
    static availableOptions = [
        { value: "SNV", label: "SNV" },
        { value: "INS", label: "INS" },
        { value: "DEL", label: "DEL" },
        { value: "MNV", label: "MNV" }
    ];

    constructor(value) {
        super();

        var option = MutationType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default MutationType;