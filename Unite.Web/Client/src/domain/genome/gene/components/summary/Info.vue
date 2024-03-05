<template>
  <div class="col q-gutter-y-sm" v-if="gene">
    <div class="row" v-if="hasLinks">
      <div class="col q-gutter-y-sm">
        <div class="row">
          <span class="text-h5 u-text-title">Public References</span>
        </div>

        <div class="row">
          <div class="col">
            <q-markup-table class="table-strip" separator="cell" dense flat bordered>
              <colgroup>
                <col span="1" style="width: 100%" />
              </colgroup>

              <tbody>
                <tr v-if="hasEnsemblId(gene.stableId)">
                  <td><u-link-external :to="getEnsemblLink(gene.stableId)">Ensembl</u-link-external></td>
                </tr>
                <tr v-if="hasHgncId(gene.description)">
                  <td><u-link-external :to="getHgncLink(gene.description)">HGNC</u-link-external></td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gene: Object
  },

  computed: {
    hasLinks() {
      return !!this.gene.stableId
          || !!this.getHgncId(this.gene.description)
    }
  },

  methods: {
    hasEnsemblId(stableId) {
      return !!stableId;
    },

    getEnsemblLink(stableId) {
      if (!stableId) return null;
      else return "http://feb2014.archive.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=" + stableId;
    },

    hasHgncId(description) {
      return description?.includes("Source:HGNC");
    },

    getHgncId(description) {
      if (!this.hasHgncId(description)) return null;
      else return description.match(/Acc:(\d+)/)[1];
    },

    getHgncLink(description) {
      if (!this.hasHgncId(description)) return null;
      else return "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:" + this.getHgncId(description);
    }
  }
}
</script>