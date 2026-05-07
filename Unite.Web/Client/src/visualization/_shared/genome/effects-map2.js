import { colors } from "quasar";

/*
  Color strategy: maximum visual distinguishability regardless of impact group.
  Each effect gets a unique hue+shade combination, spread across all 19 Quasar
  hue families and three lightness rounds:
    Round 1 (shade -9)  – 19 effects – saturated/vibrant
    Round 2 (shade -4)  – 19 effects – lighter, clearly distinct from round 1
    Round 3 (shade -12) –  3 effects – very dark
  Within each round, warm and cool hues are interleaved so adjacent entries
  in the legend also look different from one another.
*/

const map = new Map();

// ── Round 1: shade -9 (saturated) ────────────────────────────────────────────
map.set("transcript_ablation",               { name: "Transcript ablation",              color: colors.getPaletteColor("red-9") });
map.set("splice_acceptor_variant",           { name: "Splice acceptor",                  color: colors.getPaletteColor("blue-9") });
map.set("splice_donor_variant",              { name: "Splice donor",                     color: colors.getPaletteColor("green-9") });
map.set("stop_gained",                       { name: "Stop gained",                      color: colors.getPaletteColor("orange-9") });
map.set("frameshift_variant",                { name: "Frameshift",                       color: colors.getPaletteColor("purple-9") });
map.set("stop_lost",                         { name: "Stop lost",                        color: colors.getPaletteColor("teal-9") });
map.set("start_lost",                        { name: "Start lost",                       color: colors.getPaletteColor("deep-orange-9") });
map.set("transcript_amplification",          { name: "Transcript amplification",         color: colors.getPaletteColor("indigo-9") });
map.set("feature_elongation",               { name: "Feature elongation",               color: colors.getPaletteColor("lime-9") });
map.set("feature_truncation",               { name: "Feature truncation",               color: colors.getPaletteColor("pink-9") });
map.set("inframe_insertion",                { name: "Inframe insertion",                color: colors.getPaletteColor("cyan-9") });
map.set("inframe_deletion",                 { name: "Inframe deletion",                 color: colors.getPaletteColor("yellow-9") });
map.set("missense_variant",                 { name: "Missense",                         color: colors.getPaletteColor("deep-purple-9") });
map.set("protein_altering_variant",         { name: "Protein altering",                 color: colors.getPaletteColor("light-green-9") });
map.set("splice_donor_5th_base_variant",    { name: "Splice donor 5th base",            color: colors.getPaletteColor("amber-9") });
map.set("splice_region_variant",            { name: "Splice region",                    color: colors.getPaletteColor("light-blue-9") });
map.set("splice_donor_region_variant",      { name: "Splice donor region",              color: colors.getPaletteColor("brown-9") });
map.set("splice_polypyrimidine_tract_variant", { name: "Splice polypyrimidine tract",   color: colors.getPaletteColor("blue-grey-8") });
map.set("incomplete_terminal_codon_variant",{ name: "Incomplete terminal codon",        color: colors.getPaletteColor("grey-8") });

// ── Round 2: shade -4 (lighter) ──────────────────────────────────────────────
map.set("start_retained_variant",           { name: "Start retained",                   color: colors.getPaletteColor("red-4") });
map.set("stop_retained_variant",            { name: "Stop retained",                    color: colors.getPaletteColor("blue-4") });
map.set("synonymous_variant",               { name: "Synonymous",                       color: colors.getPaletteColor("green-4") });
map.set("coding_sequence_variant",          { name: "Coding sequence",                  color: colors.getPaletteColor("orange-4") });
map.set("mature_miRNA_variant",             { name: "Mature miRNA",                     color: colors.getPaletteColor("purple-4") });
map.set("5_prime_UTR_variant",              { name: "UTR 5",                            color: colors.getPaletteColor("teal-4") });
map.set("3_prime_UTR_variant",              { name: "UTR 3",                            color: colors.getPaletteColor("deep-orange-4") });
map.set("non_coding_transcript_exon_variant",{ name: "Non coding transcript exon",      color: colors.getPaletteColor("indigo-4") });
map.set("intron_variant",                   { name: "Intron",                           color: colors.getPaletteColor("lime-4") });
map.set("NMD_transcript_variant",           { name: "NMD transcript",                   color: colors.getPaletteColor("pink-4") });
map.set("non_coding_transcript_variant",    { name: "Non coding transcript",            color: colors.getPaletteColor("cyan-4") });
map.set("coding_transcript_variant",        { name: "Coding transcript",                color: colors.getPaletteColor("yellow-6") });
map.set("upstream_gene_variant",            { name: "Upstream gene",                    color: colors.getPaletteColor("deep-purple-4") });
map.set("downstream_gene_variant",          { name: "Downstream gene",                  color: colors.getPaletteColor("light-green-4") });
map.set("TFBS_ablation",                    { name: "TFBS ablation",                    color: colors.getPaletteColor("amber-5") });
map.set("TFBS_amplification",               { name: "TFBS amplification",               color: colors.getPaletteColor("light-blue-4") });
map.set("TF_binding_site_variant",          { name: "TF binding site",                  color: colors.getPaletteColor("brown-4") });
map.set("regulatory_region_ablation",       { name: "Regulatory region ablation",       color: colors.getPaletteColor("blue-grey-3") });
map.set("regulatory_region_amplification",  { name: "Regulatory region amplification",  color: colors.getPaletteColor("grey-5") });

// ── Round 3: shade -12 (very dark) ───────────────────────────────────────────
map.set("regulatory_region_variant",        { name: "Regulatory region",                color: colors.getPaletteColor("red-12") });
map.set("intergenic_variant",               { name: "Intergenic",                       color: colors.getPaletteColor("teal-12") });
map.set("sequence_variant",                 { name: "Sequence variant",                 color: colors.getPaletteColor("purple-12") });

export default map;
