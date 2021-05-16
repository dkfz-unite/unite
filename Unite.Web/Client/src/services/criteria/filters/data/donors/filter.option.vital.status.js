import FilterOption from '../filter.option.js';

class VitalStatus extends FilterOption{
    static availableOptions = [
        { value: true, label: "Living" },
        { value: false, label: "Deceased" }
    ];

    constructor(value) {
        var option = VitalStatus.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default VitalStatus;