<template>
  <div class="col">
    <q-markup-table v-if="general" separator="cell" dense bordered>
      <colgroup>
        <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '20%' }" />
        <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '80%' }" />
      </colgroup>
      <tbody>
        <tr>
          <td class="u-text-key">Submission</td>
          <td>
            <div class="row items-center q-gutter-x-sm">
              <div class="u-text-key">Total: {{ general.submission }}</div>
              <template v-if="submission">
                <div><q-badge title="DNA - Simple Somatic Mutations (SSM)" :color="getColor(submission['dna-ssm'])" text-color="black" label="DNA-SSM">: {{ submission["dna-ssm"] }}</q-badge></div>
                <div><q-badge title="DNA - Copy Number Variants (CNV)" :color="getColor(submission['dna-cnv'])" text-color="black" label="DNA-CNV">: {{ submission["dna-cnv"] }}</q-badge></div>
                <div><q-badge title="DNA - Structural Variants (SV)" :color="getColor(submission['dna-sv'])" text-color="black" label="DNA-SV">: {{ submission["dna-sv"] }}</q-badge></div>
                <div><q-badge title="RNA - Bulk gene expressions" :color="getColor(submission['rna-exp'])" text-color="black" label="RNA-EXP">: {{ submission["rna-exp"] }}</q-badge></div>
              </template>
            </div>
          </td>
        </tr>
        <tr>
          <td class="u-text-key">Annotation</td>
          <td>
            <template v-if="annotation">
              <div class="row items-center q-gutter-x-sm">
                <div class="u-text-key">Total: {{ general.annotation }}</div>
                <div><q-badge title="DNA - Simple Somatic Mutations (SSM)" :color="getColor(annotation['dna-ssm'])" text-color="black" label="DNA-SSM">: {{ annotation["dna-ssm"] }}</q-badge></div>
                <div><q-badge title="DNA - Copy Number Variants (CNV)" :color="getColor(annotation['dna-cnv'])" text-color="black" label="DNA-CNV">: {{ annotation["dna-cnv"] }}</q-badge></div>
                <div><q-badge title="DNA - Structural Variants (SV)" :color="getColor(annotation['dna-sv'])" text-color="black" label="DNA-SV">: {{ annotation["dna-sv"] }}</q-badge></div>
              </div>
            </template>
          </td>
        </tr>
        <tr>
          <td class="u-text-key">Indexing</td>
          <td>
            <template v-if="indexing">
              <div class="row items-center q-gutter-x-sm">
                <div class="u-text-key">Total: {{ general.indexing }}</div>
                <div><q-badge title="Donors index" :color="getColor(indexing.Donor)" text-color="black" label="Donor">: {{ indexing.Donor }}</q-badge></div>
                <div><q-badge title="Images index" :color="getColor(indexing.Image)" text-color="black" label="Image">: {{ indexing.Image }}</q-badge></div>
                <div><q-badge title="Specimens index" :color="getColor(indexing.Specimen)" text-color="black" label="Specimen">: {{ indexing.Specimen }}</q-badge></div>
                <div><q-badge title="Genes index" :color="getColor(indexing.Gene)" text-color="black" label="Gene">: {{ indexing.Gene }}</q-badge></div>
                <div><q-badge title="Variants index - Simple Somatic Mutations (SSM)" :color="getColor(indexing.SSM)" text-color="black" label="SSM">: {{ indexing.SSM }}</q-badge></div>
                <div><q-badge title="Variants index - Copy Number Variants (CNV)" :color="getColor(indexing.CNV)" text-color="black" label="CNV">: {{ indexing.CNV }}</q-badge></div>
                <div><q-badge title="Variants index - Structural Variants (SV)" :color="getColor(indexing.SV)" text-color="black" label="SV">: {{ indexing.SV }}</q-badge></div>
              </div>
            </template>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import api from "../api/api-tasks";

export default {
  name: "TasksTab",

  data() {
    return {
      token: null,
      general: null,
      submission: null,
      annotation: null,
      indexing: null
    }
  },

  async mounted() {
    await this.refresh();

    this.token = setInterval(async () => {
      await this.refresh();
    }, 5000);
  },

  unmounted() {
    clearInterval(this.token);
  },

  methods: {
    getColor(value) {
      return value === 0 ? "green-2" : "orange-2";
    },

    async refresh() {
      this.general = await api.getGeneralStats();
      this.submission = await api.getSubmissionStats();
      this.annotation = await api.getAnnotationStats();
      this.indexing = await api.getIndexingStats();      
    }
  },
}
</script>
