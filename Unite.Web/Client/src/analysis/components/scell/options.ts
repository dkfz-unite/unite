import { BooleanOption, NumberOption, OptionsGroup, SelectOption, SelectManyOption, FileOption, SelectValue, SelectMethod, IOption } from "../_shared/options";

export const keys = {
  sparse: "sparse",
  pp: "pp",
  genes: "genes",
  cells: "cells",
  pca: "pca",
  neighbors: "neighbors",
  clustering: "clustering",
  embedding: "embedding",
  annotations: "annotations",
  model: "model"
}

const options = [
  // Preprocessing
  new OptionsGroup("Preprocessing", [
    new BooleanOption({
      key: keys.sparse,
      title: "Make the data sparse",
      default: true,
      hint: `<span>
              <span>It's <span class="text-orange-7">highly recommended</span> to make the data sparse.</span><br/>
              <span>It almost doesn't affect the result,</span><br/>
              <span>but makes the data significantly smaller.</span>
            </span>`
    }),

    new SelectOption({
      key: keys.pp,
      title: "Preprocessing method",
      default: "default",
      options: [
        new SelectValue("Default", "default"),
        new SelectValue("Seurat", "seurat"),
        new SelectValue("Zheng17", "zheng17")
      ]
    }),

    new NumberOption({
      key: keys.genes,
      title: "Min. expressed genes per cell",
      default: 5,
      min: 5,
      step: 1
    }),

    new NumberOption({
      key: keys.cells,
      title: "Min. expressing cells per gene",
      default: 25,
      min: 25,
      step: 5
    })
  ]),

  // Embedding
  new OptionsGroup("Embedding", [
    new BooleanOption({
      key: keys.pca,
      title: "Perform principal component analysis (PCA)",
      default: true,
      hint: `<span>
              <span>It's <span class="text-orange-7">highly recommended</span> to perform PCA before clustering.</span><br/>
            </span>`
    }),

    new BooleanOption({
      key: keys.neighbors,
      title: "Calculate neighbors",
      default: true,
      hint: `<span>
              <span>It's <span class="text-orange-7">highly recommended</span> to calculate neighbors</span><br/>
              <span>before calculating different embeddings.</span>
            </span>`
    }),

    new SelectOption({
      key: keys.clustering,
      title: "Clustering method",
      default: "louvain",
      options: [
        new SelectValue("Louvain", "louvain"),
        new SelectValue("Leiden", "leiden")
      ]
    }),

    new SelectManyOption({
      key: keys.embedding,
      title: "Embeddings",
      default: ["umap"],
      options: [
        new SelectValue("UMAP", "umap"),
        new SelectValue("t-SNE", "tsne")
      ]
    })
  ]),

  // Annotation
  new OptionsGroup("Annotation", [
    new FileOption({
      key: keys.annotations,
      title: "Cell level annotations (Optional; TSV; 25 MB max)",
      accept: ".tsv",
      size: 25 * 1024 * 1024, // 25 MB
      hint: `<div>A <b>TSV</b> file of maximum <b>25MB</b> size.</div>
             <div>First column is cell <b>barcode</b> <u>without</u> <u>suffixes</u> or <u>prefixes</u>.</div>
             <div>All other columns are considered cell level annotations.</div>`
    }),

    new SelectOption({
      key: keys.model,
      title: "Cell type predictions model (Optional)",
      hint: `<div>A model for automated cell type annotations using <b>CellTypist</b>.</div>`,
      default: null,
      options: [],
      lazy: SelectMethod.Once
    })
  ]),
];

export default options;