<template>
  <div class="col q-gutter-y-sm" v-if="molecularData">
    <div class="row">
      <span class="text-h5 u-text-title">Molecular Data</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip" separator="cell" dense flat bordered>
          <colgroup>
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '30%' }" />
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '70%' }" />
          </colgroup>

          <tbody>
            <tr>
              <td class="u-text-key">MGMT Status</td>
              <td>{{ molecularData.mgmtStatus }}</td>
            </tr>
            <tr>
              <td class="u-text-key">IDH Status</td>
              <td>{{ molecularData.idhStatus }}</td>
            </tr>
            <tr>
              <td class="u-text-key">IDH Mutation</td>
              <td>{{ molecularData.idhMutation }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Gene Expression Subtype</td>
              <td>{{ molecularData.geneExpressionSubtype }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Methylation Subtype</td>
              <td>{{ molecularData.methylationSubtype }}</td>
            </tr>
            <tr>
              <td class="u-text-key">G-CIMP Methylation</td>
              <td>{{ contentHelpers.toBooleanString(molecularData.gcimpMethylation) }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import contentHelpers from "@/services/helpers/helpers.content.js";

export default {
  props: ["specimen"],

  data(){
    return{
      contentHelpers: contentHelpers
    }
  },

  computed:{
    molecularData(){
      return this.specimen?.molecularData;
    }
  },
}
</script>