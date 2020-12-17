import FilterOption from '../filter.option.js';

class AgeCategory extends FilterOption{
    static availableOptions = [
        { value: "Pediatric", label: "Pediatric" },
        { value: "Adult", label: "Adult" }
    ];

    constructor(value) {
        var option = AgeCategory.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default AgeCategory;