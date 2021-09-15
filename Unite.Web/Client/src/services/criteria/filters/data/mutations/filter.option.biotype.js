import FilterOption from '../filter.option.js';

class Biotype extends FilterOption {
    static availableOptions = [
        // Protein coding
        { value: "protein_coding", label: "Protein coding" },

        // Processed transcripts
        { value: "processed_transcript", label: "Processed transcript" },
        { value: "3prime_overlapping_ncRNA", label: "3 Prime overlapping ncRNA" },
        { value: "antisense", label: "Antisense" },
        { value: "lincRNA", label: "lincRNA" },
        { value: "sense_intronic", label: "Sense intronic" },
        { value: "sense_overlapping", label: "Sense overlapping" },

        // ncRNA
        { value: "miRNA", label: "miRNA" },
        { value: "rRNA", label: "rRNA" },
        { value: "snRNA", label: "snRNA" },
        { value: "snoRNA", label: "snoRNA" },

        // Pseudogene
        { value: "pseudogene", label: "Pseudogene" },
        { value: "polymorphic_pseudogene", label: "Polymorphic pseudogene" },
        { value: "IG_C_pseudogene", label: "IG C pseudogene" },
        { value: "IG_J_pseudogene", label: "IG J pseudogene" },
        { value: "IG_V_pseudogene", label: "IG V pseudogene" },
        
        //IG gene
        { value: "IG_C_gene", label: "IG C gene" },
        { value: "IG_D_gene", label: "IG D gene" },
        { value: "IG_J_gene", label: "IG J gene" },
        { value: "IG_V_gene", label: "IG V gene" },

        //TR gene
        { value: "TR_V_gene", label: "TR V gene" },
        
        // No category
        { value: "misc_RNA", label: "Misc RNA" },
    ];

    constructor(value) {
        super();

        var option = Biotype.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default Biotype;