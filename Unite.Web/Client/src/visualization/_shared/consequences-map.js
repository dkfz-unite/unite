import { colors } from "quasar";

const map = new Map();
map.set("transcript_ablation", { name: "Transcript ablation", color: colors.getPaletteColor("red-10") });
map.set("splice_acceptor_variant", { name: "Splice acceptor", color: colors.getPaletteColor("red-9") });
map.set("splice_donor_variant", { name: "Splice donor", color: colors.getPaletteColor("red-8") });
map.set("stop_gained", { name: "Stop gained", color: colors.getPaletteColor("red-7") });
map.set("frameshift_variant", { name: "Frameshift", color: colors.getPaletteColor("red-6") });
map.set("stop_lost", { name: "Stop lost", color: colors.getPaletteColor("red-5") });
map.set("start_lost", { name: "Start lost", color: colors.getPaletteColor("red-4") });
map.set("transcript_amplification", { name: "Transcript amplification", color: colors.getPaletteColor("red-3") });

map.set("inframe_insertion", { name: "Inframe insertion", color: colors.getPaletteColor("orange-10") });
map.set("inframe_deletion", { name: "Inframe deletion", color: colors.getPaletteColor("orange-9") });
map.set("missense_variant", { name: "Missense", color: colors.getPaletteColor("orange-8") });
map.set("protein_altering_variant", { name: "Protein altering", color: colors.getPaletteColor("orange-7") });

map.set("splice_region_variant", { name: "Splice region", color: colors.getPaletteColor("green-10") });
map.set("incomplete_terminal_codon_variant", { name: "Incomplete terminal codon", color: colors.getPaletteColor("green-9") });
map.set("start_retained_variant", { name: "Start retained", color: colors.getPaletteColor("green-8") });
map.set("stop_retained_variant", { name: "Stop retained", color: colors.getPaletteColor("green-7") });
map.set("synonymous_variant", { name: "Synonymous", color: colors.getPaletteColor("green-6") });

map.set("coding_sequence_variant", { name: "Coding sequence", color: colors.getPaletteColor("blue-grey-7") });
map.set("mature_miRNA_variant", { name: "Mature miRNA", color: colors.getPaletteColor("blue-grey-7") });
map.set("5_prime_UTR_variant", { name: "UTR 5", color: colors.getPaletteColor("blue-grey-7") });
map.set("3_prime_UTR_variant", { name: "UTR 3", color: colors.getPaletteColor("blue-grey-6") });
map.set("non_coding_transcript_exon_variant", { name: "Non coding transcript exon", color: colors.getPaletteColor("blue-grey-6") });
map.set("intron_variant", { name: "Intron", color: colors.getPaletteColor("blue-grey-6") });
map.set("NMD_transcript_variant", { name: "NMD transcript", color: colors.getPaletteColor("blue-grey-5") });
map.set("non_coding_transcript_variant", { name: "Non coding transcript", color: colors.getPaletteColor("blue-grey-5") });
map.set("upstream_gene_variant", { name: "Upstream gene", color: colors.getPaletteColor("blue-grey-5") });
map.set("downstream_gene_variant", { name: "Downstream gene", color: colors.getPaletteColor("blue-grey-4") });
map.set("TFBS_ablation", { name: "TFBS ablation", color: colors.getPaletteColor("blue-grey-4") });
map.set("TFBS_amplification", { name: "TFBS amplification", color: colors.getPaletteColor("blue-grey-4") });
map.set("TF_binding_site_variant", { name: "TF binding site", color: colors.getPaletteColor("blue-grey-3") });
map.set("regulatory_region_ablation", { name: "Regulatory region ablation", color: colors.getPaletteColor("blue-grey-3") });
map.set("regulatory_region_amplification", { name: "Regulatory region amplification", color: colors.getPaletteColor("blue-grey-3") });
map.set("feature_elongation", { name: "Feature elongation", color: colors.getPaletteColor("blue-grey-3") });
map.set("regulatory_region_variant", { name: "Regulatory region", color: colors.getPaletteColor("blue-grey-2") });
map.set("feature_truncation", { name: "Feature truncation", color: colors.getPaletteColor("blue-grey-2") });
map.set("intergenic_variant", { name: "Intergenic", color: colors.getPaletteColor("blue-grey-2") });

export default map;