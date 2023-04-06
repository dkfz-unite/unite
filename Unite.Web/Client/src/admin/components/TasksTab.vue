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
                <div><q-badge title="Simple Somatic Mutations (SSM)" :color="getColor(submission.SSM)" text-color="black" label="SSM">: {{ submission.SSM }}</q-badge></div>
                <div><q-badge title="Copy Number Variants (CNV)" :color="getColor(submission.CNV)" text-color="black" label="CNV">: {{ submission.CNV }}</q-badge></div>
                <div><q-badge title="Structural Variants (SV)" :color="getColor(submission.SV)" text-color="black" label="SV">: {{ submission.SV }}</q-badge></div>
                <div><q-badge title="Transcriptomics (TRA)" :color="getColor(submission.TEX)" text-color="black" label="TRA">: {{ submission.TEX }}</q-badge></div>
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
                <div><q-badge title="Simple Somatic Mutations (SSM)" :color="getColor(annotation.SSM)" text-color="black" label="SSM">: {{ annotation.SSM }}</q-badge></div>
                <div><q-badge title="Copy Number Variants (CNV)" :color="getColor(annotation.CNV)" text-color="black" label="CNV">: {{ annotation.CNV }}</q-badge></div>
                <div><q-badge title="Structural Variants (SV)" :color="getColor(annotation.SV)" text-color="black" label="SV">: {{ annotation.SV }}</q-badge></div>
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
                <div><q-badge title="Donors" :color="getColor(indexing.Donor)" text-color="black" label="Donor">: {{ indexing.Donor }}</q-badge></div>
                <div><q-badge title="Images" :color="getColor(indexing.Image)" text-color="black" label="Image">: {{ indexing.Image }}</q-badge></div>
                <div><q-badge title="Specimens" :color="getColor(indexing.Specimen)" text-color="black" label="Specimen">: {{ indexing.Specimen }}</q-badge></div>
                <div><q-badge title="Genes" :color="getColor(indexing.Gene)" text-color="black" label="Gene">: {{ indexing.Gene }}</q-badge></div>
                <div><q-badge title="Simple Somatic Mutations (SSM)" :color="getColor(indexing.SSM)" text-color="black" label="SSM">: {{ indexing.SSM }}</q-badge></div>
                <div><q-badge title="Copy Number Variants (CNV)" :color="getColor(indexing.CNV)" text-color="black" label="CNV">: {{ indexing.CNV }}</q-badge></div>
                <div><q-badge title="Structural Variants (SV)" :color="getColor(indexing.SV)" text-color="black" label="SV">: {{ indexing.SV }}</q-badge></div>
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
