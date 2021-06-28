import FilterOption from '../../filter.option.js';

class Species extends FilterOption{
    static availableOptions = [
        { value: "Human", label: "Human" },
        { value: "Mouse", label: "Mouse" }
    ];

    constructor(value) {
        var option = Species.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default Species;