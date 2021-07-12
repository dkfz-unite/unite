import { colors } from "quasar";

const consequences = [
    { type: "transcript_ablation", name: "Transcript ablation", impact: "High", color: colors.getPaletteColor("red-10")},
    { type: "splice_acceptor_variant", name: "Splice acceptor", impact: "High", color: colors.getPaletteColor("red-9") },
    { type: "splice_donor_variant", name: "Splice donor", impact: "High", color: colors.getPaletteColor("red-8") },
    { type: "stop_gained", name: "Stop gained", impact: "High", color: colors.getPaletteColor("red-7") },
    { type: "frameshift_variant", name: "Frameshift", impact: "High", color: colors.getPaletteColor("red-6") },
    { type: "stop_lost", name: "Stop lost", impact: "High", color: colors.getPaletteColor("red-5") },
    { type: "start_lost", name: "Start lost", impact: "High", color: colors.getPaletteColor("red-4") },
    { type: "transcript_amplification", impact: "High", name: "Transcript amplification", color: colors.getPaletteColor("red-3") },

    { type: "inframe_insertion", name: "Inframe insertion", impact: "Moderate", color: colors.getPaletteColor("orange-10") },
    { type: "inframe_deletion", name: "Inframe deletion", impact: "Moderate", color: colors.getPaletteColor("orange-9") },
    { type: "missense_variant", name: "Missense", impact: "Moderate", color: colors.getPaletteColor("orange-8") },
    { type: "protein_altering_variant", impact: "Moderate", name: "Protein altering", color: colors.getPaletteColor("orange-7") },

    { type: "splice_region_variant", name: "Splice region", impact: "Low", color: colors.getPaletteColor("green-10") },
    { type: "incomplete_terminal_codon_variant", impact: "Low", name: "Incomplete terminal codon", color: colors.getPaletteColor("green-9") },
    { type: "start_retained_variant", name: "Start retained", impact: "Low", color: colors.getPaletteColor("green-8") },
    { type: "stop_retained_variant", name: "Stop retained", impact: "Low", color: colors.getPaletteColor("green-7") },
    { type: "synonymous_variant", name: "Synonymous", impact: "Low", color: colors.getPaletteColor("green-6") },

    { type: "coding_sequence_variant", name: "Coding sequence", impact: "Unknown", color: colors.getPaletteColor("blue-grey-7") },
    { type: "mature_miRNA_variant", name: "Mature miRNA", impact: "Unknown", color: colors.getPaletteColor("blue-grey-7") },
    { type: "5_prime_UTR_variant", name: "UTR 5", impact: "Unknown", color: colors.getPaletteColor("blue-grey-7") },
    { type: "3_prime_UTR_variant", name: "UTR 3", impact: "Unknown", color: colors.getPaletteColor("blue-grey-6") },
    { type: "non_coding_transcript_exon_variant", name: "Non coding transcript exon", impact: "Unknown", color: colors.getPaletteColor("blue-grey-6") },
    { type: "intron_variant", name: "Intron", impact: "Unknown", color: colors.getPaletteColor("blue-grey-6") },
    { type: "NMD_transcript_variant", name: "NMD transcript", impact: "Unknown", color: colors.getPaletteColor("blue-grey-5") },
    { type: "non_coding_transcript_variant", name: "Non coding transcript", impact: "Unknown", color: colors.getPaletteColor("blue-grey-5") },
    { type: "upstream_gene_variant", name: "Upstream gene", impact: "Unknown", color: colors.getPaletteColor("blue-grey-5") },
    { type: "downstream_gene_variant", name: "Downstream gene", impact: "Unknown", color: colors.getPaletteColor("blue-grey-4") },
    { type: "TFBS_ablation", name: "TFBS ablation", impact: "Unknown", color: colors.getPaletteColor("blue-grey-4") },
    { type: "TFBS_amplification", name: "TFBS amplification", impact: "Unknown", color: colors.getPaletteColor("blue-grey-4") },
    { type: "TF_binding_site_variant", name: "TF binding site", impact: "Unknown", color: colors.getPaletteColor("blue-grey-3") },
    { type: "regulatory_region_ablation", name: "Regulatory region ablation", impact: "Moderate", color: colors.getPaletteColor("orange-6") },
    { type: "regulatory_region_amplification", name: "Regulatory region amplification", impact: "Unknown", color: colors.getPaletteColor("blue-grey-3") },
    { type: "feature_elongation", name: "Feature elongation", impact: "Unknown", color: colors.getPaletteColor("blue-grey-3") },
    { type: "regulatory_region_variant", name: "Regulatory region", impact: "Unknown", color: colors.getPaletteColor("blue-grey-2") },
    { type: "feature_truncation", name: "Feature truncation", impact: "Unknown", color: colors.getPaletteColor("blue-grey-2") },
    { type: "intergenic_variant", name: "Intergenic", impact: "Unknown", color: colors.getPaletteColor("blue-grey-2") },
];

export default consequences;