import FilterOption from '../filter.option.js';

class IDHMutation extends FilterOption{
    static availableOptions = [
        { value: "IDH1 R132H", label: "IDH1 R132H" },
        { value: "IDH1 R132C", label: "IDH1 R132C" },
        { value: "IDH1 R132G", label: "IDH1 R132G" },
        { value: "IDH1 R132L", label: "IDH1 R132L" },
        { value: "IDH1 R132S", label: "IDH1 R132S" },
        { value: "IDH2 R172G", label: "IDH2 R172G" },
        { value: "IDH2 R172W", label: "IDH2 R172W" },
        { value: "IDH2 R172K", label: "IDH2 R172K" },
        { value: "IDH2 R172T", label: "IDH2 R172T" },
        { value: "IDH2 R172M", label: "IDH2 R172M" },
        { value: "IDH2 R172S", label: "IDH2 R172S" }
    ];

    constructor(value) {
        var option = IDHMutation.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default IDHMutation;