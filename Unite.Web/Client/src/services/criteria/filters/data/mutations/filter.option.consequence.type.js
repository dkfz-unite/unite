import FilterOption from '../filter.option.js';

class ConsequenceType extends FilterOption{
    static availableOptions = [
        { value: "transcript_ablation", label: "Transcript ablation" },
        { value: "splice_acceptor_variant", label: "Splice acceptor" },
        { value: "splice_donor_variant", label: "Splice donor" },
        { value: "stop_gained", label: "Stop gained" },
        { value: "frameshift_variant", label: "Frameshift" },
        { value: "stop_lost", label: "Stop lost" },
        { value: "start_lost", label: "Start lost" },
        { value: "transcript_amplification", label: "Transcript amplification" },
        { value: "inframe_insertion", label: "Inframe insertion" },
        { value: "inframe_deletion", label: "Inframe deletion" },
        { value: "missense_variant", label: "Missense" },
        { value: "protein_altering_variant", label: "Protein altering" },
        { value: "splice_region_variant", label: "Splice region" },
        { value: "incomplete_terminal_codon_variant", label: "Incomplete terminal codon" },
        { value: "start_retained_variant", label: "Start retained" },
        { value: "stop_retained_variant", label: "Stop retained" },
        { value: "synonymous_variant", label: "Synonymous" },
        { value: "coding_sequence_variant", label: "Coding sequence" },
        { value: "mature_miRNA_variant", label: "Mature miRNA" },
        { value: "5_prime_UTR_variant", label: "UTR 5" },
        { value: "3_prime_UTR_variant", label: "UTR 3" },
        { value: "non_coding_transcript_exon_variant", label: "Non coding transcript exon" },
        { value: "intron_variant", label: "Intron" },
        { value: "NMD_transcript_variant", label: "NMD transcript" },
        { value: "non_coding_transcript_variant", label: "Non coding transcript" },
        { value: "upstream_gene_variant", label: "Upstream gene" },
        { value: "downstream_gene_variant", label: "Downstream gene" },
        { value: "TFBS_ablation", label: "TFBS ablation" },
        { value: "TFBS_amplification", label: "TFBS amplification" },
        { value: "TF_binding_site_variant", label: "TF binding site" },
        { value: "regulatory_region_ablation", label: "Regulatory region ablation" },
        { value: "regulatory_region_amplification", label: "Regulatory region amplification" },
        { value: "feature_elongation", label: "Feature elongation" },
        { value: "regulatory_region_variant", label: "Regulatory region" },
        { value: "feature_truncation", label: "Feature truncation" },
        { value: "intergenic_variant", label: "Intergenic" }
    ];

    constructor(value) {
        super();

        var option = ConsequenceType.availableOptions.find(item => item.value == value);

        this.value = option?.value;
        this.label = option?.label;
    }
}

export default ConsequenceType;