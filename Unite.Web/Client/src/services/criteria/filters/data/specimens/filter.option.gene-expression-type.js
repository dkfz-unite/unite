import FilterOption from '../filter.option.js';

class GeneExpressionType extends FilterOption{
    static availableOptions = [
        { value: "Classical", label: "Classical" },
        { value: "Mesenchymal", label: "Mesenchymal" },
        { value: "Proneural", label: "Proneural" }
    ];

    constructor(value) {
        var option = GeneExpressionType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default GeneExpressionType;