export default class Biotype {
    static values = {
        // Protein coding
        "Protein coding": "protein_coding",

        // Processed transcripts
        "Processed transcript": "processed_transcript",
        "3 Prime overlapping ncRNA": "3prime_overlapping_ncRNA",
        "Antisense": "antisense",
        "lincRNA": "lincRNA",
        "Sense intronic": "sense_intronic",
        "Sense overlapping": "sense_overlapping",

        // ncRNA
        "miRNA": "miRNA",
        "rRNA": "rRNA",
        "snRNA": "snRNA",
        "snoRNA": "snoRNA",

        // Pseudogene
        "Pseudogene": "pseudogene",
        "Polymorphic pseudogene": "polymorphic_pseudogene",
        "IG C pseudogene": "IG_C_pseudogene",
        "IG J pseudogene": "IG_J_pseudogene",
        "IG V pseudogene": "IG_V_pseudogene",
        
        //IG gene
        "IG C gene": "IG_C_gene",
        "IG D gene": "IG_D_gene",
        "IG J gene": "IG_J_gene",
        "IG V gene": "IG_V_gene",

        //TR gene
        "TR V gene": "TR_V_gene",
        
        // No category
        "Misc RNA": "misc_RNA"
    };
}