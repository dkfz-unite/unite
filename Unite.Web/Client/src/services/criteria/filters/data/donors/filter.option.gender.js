import FilterOption from '../filter.option.js';

class Gender extends FilterOption{
    static availableOptions = [
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
        { value: "Other", label: "Other" }
    ];

    constructor(value) {
        var option = Gender.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default Gender;