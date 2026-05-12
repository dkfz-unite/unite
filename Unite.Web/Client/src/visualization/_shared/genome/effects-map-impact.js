import { colors } from "quasar";

/*
SO term	Display term	IMPACT
transcript_ablation	Transcript ablation	HIGH
splice_acceptor_variant	Splice acceptor variant	HIGH
splice_donor_variant	Splice donor variant	HIGH
stop_gained	Stop gained	HIGH
frameshift_variant	Frameshift variant	HIGH
stop_lost	Stop lost	HIGH
start_lost	Start lost	HIGH
transcript_amplification	Transcript amplification	HIGH
feature_elongation	Feature elongation	HIGH
feature_truncation	Feature truncation	HIGH
inframe_insertion	Inframe insertion	MODERATE
inframe_deletion	Inframe deletion	MODERATE
missense_variant	Missense variant	MODERATE
protein_altering_variant	Protein altering variant	MODERATE
splice_donor_5th_base_variant	Splice donor 5th base variant	LOW
splice_region_variant	Splice region variant	LOW
splice_donor_region_variant	Splice donor region variant	LOW
splice_polypyrimidine_tract_variant	Splice polypyrimidine tract variant	LOW
incomplete_terminal_codon_variant	Incomplete terminal codon variant	LOW
start_retained_variant	Start retained variant	LOW
stop_retained_variant	Stop retained variant	LOW
synonymous_variant	Synonymous variant	LOW
coding_sequence_variant	Coding sequence variant	MODIFIER
mature_miRNA_variant	Mature miRNA variant	MODIFIER
5_prime_UTR_variant	5 prime UTR variant	MODIFIER
3_prime_UTR_variant	3 prime UTR variant	MODIFIER
non_coding_transcript_exon_variant	Non coding transcript exon variant	MODIFIER
intron_variant	Intron variant	MODIFIER
NMD_transcript_variant	NMD transcript variant	MODIFIER
non_coding_transcript_variant	Non coding transcript variant	MODIFIER
coding_transcript_variant	Coding transcript variant	MODIFIER
upstream_gene_variant	Upstream gene variant	MODIFIER
downstream_gene_variant	Downstream gene variant	MODIFIER
TFBS_ablation	TFBS ablation	MODIFIER
TFBS_amplification	TFBS amplification	MODIFIER
TF_binding_site_variant	TF binding site variant	MODIFIER
regulatory_region_ablation	Regulatory region ablation	MODIFIER
regulatory_region_amplification	Regulatory region amplification	MODIFIER
regulatory_region_variant	Regulatory region variant	MODIFIER
intergenic_variant	Intergenic variant	MODIFIER
sequence_variant	Sequence variant	MODIFIER
*/

const map = new Map();

// HIGH impact variants - red palette
map.set("transcript_ablation", { name: "Transcript ablation", color: colors.getPaletteColor("red-10") });
map.set("splice_acceptor_variant", { name: "Splice acceptor", color: colors.getPaletteColor("red-10") });
map.set("splice_donor_variant", { name: "Splice donor", color: colors.getPaletteColor("red-9") });
map.set("stop_gained", { name: "Stop gained", color: colors.getPaletteColor("red-8") });
map.set("frameshift_variant", { name: "Frameshift", color: colors.getPaletteColor("red-7") });
map.set("stop_lost", { name: "Stop lost", color: colors.getPaletteColor("red-6") });
map.set("start_lost", { name: "Start lost", color: colors.getPaletteColor("red-5") });
map.set("transcript_amplification", { name: "Transcript amplification", color: colors.getPaletteColor("red-5") });
map.set("feature_elongation", { name: "Feature elongation", color: colors.getPaletteColor("red-4") });
map.set("feature_truncation", { name: "Feature truncation", color: colors.getPaletteColor("red-4") });

// MODERATE impact variants - orange palette
map.set("inframe_insertion", { name: "Inframe insertion", color: colors.getPaletteColor("orange-8") });
map.set("inframe_deletion", { name: "Inframe deletion", color: colors.getPaletteColor("orange-7") });
map.set("missense_variant", { name: "Missense", color: colors.getPaletteColor("orange-6") });
map.set("protein_altering_variant", { name: "Protein altering", color: colors.getPaletteColor("orange-5") });

// LOW impact variants - green palette
map.set("splice_donor_5th_base_variant", { name: "Splice donor 5th base", color: colors.getPaletteColor("green-10") });
map.set("splice_region_variant", { name: "Splice region", color: colors.getPaletteColor("green-9") });
map.set("splice_donor_region_variant", { name: "Splice donor region", color: colors.getPaletteColor("green-8") });
map.set("splice_polypyrimidine_tract_variant", { name: "Splice polypyrimidine tract", color: colors.getPaletteColor("green-8") });
map.set("incomplete_terminal_codon_variant", { name: "Incomplete terminal codon", color: colors.getPaletteColor("green-7") });
map.set("start_retained_variant", { name: "Start retained", color: colors.getPaletteColor("green-7") });
map.set("stop_retained_variant", { name: "Stop retained", color: colors.getPaletteColor("green-6") });
map.set("synonymous_variant", { name: "Synonymous", color: colors.getPaletteColor("green-6") });

// MODIFIER/Unknown impact variants - blue-grey palette
map.set("coding_sequence_variant", { name: "Coding sequence", color: colors.getPaletteColor("blue-grey-8") });
map.set("mature_miRNA_variant", { name: "Mature miRNA", color: colors.getPaletteColor("blue-grey-8") });
map.set("5_prime_UTR_variant", { name: "UTR 5", color: colors.getPaletteColor("blue-grey-8") });
map.set("3_prime_UTR_variant", { name: "UTR 3", color: colors.getPaletteColor("blue-grey-7") });
map.set("non_coding_transcript_exon_variant", { name: "Non coding transcript exon", color: colors.getPaletteColor("blue-grey-7") });
map.set("intron_variant", { name: "Intron", color: colors.getPaletteColor("blue-grey-7") });
map.set("NMD_transcript_variant", { name: "NMD transcript", color: colors.getPaletteColor("blue-grey-6") });
map.set("non_coding_transcript_variant", { name: "Non coding transcript", color: colors.getPaletteColor("blue-grey-6") });
map.set("coding_transcript_variant", { name: "Coding transcript", color: colors.getPaletteColor("blue-grey-6") });
map.set("upstream_gene_variant", { name: "Upstream gene", color: colors.getPaletteColor("blue-grey-5") });
map.set("downstream_gene_variant", { name: "Downstream gene", color: colors.getPaletteColor("blue-grey-5") });
map.set("TFBS_ablation", { name: "TFBS ablation", color: colors.getPaletteColor("blue-grey-5") });
map.set("TFBS_amplification", { name: "TFBS amplification", color: colors.getPaletteColor("blue-grey-4") });
map.set("TF_binding_site_variant", { name: "TF binding site", color: colors.getPaletteColor("blue-grey-4") });
map.set("regulatory_region_ablation", { name: "Regulatory region ablation", color: colors.getPaletteColor("blue-grey-4") });
map.set("regulatory_region_amplification", { name: "Regulatory region amplification", color: colors.getPaletteColor("blue-grey-3") });
map.set("regulatory_region_variant", { name: "Regulatory region", color: colors.getPaletteColor("blue-grey-3") });
map.set("intergenic_variant", { name: "Intergenic", color: colors.getPaletteColor("blue-grey-3") });
map.set("sequence_variant", { name: "Sequence variant", color: colors.getPaletteColor("blue-grey-2") });

export default map;