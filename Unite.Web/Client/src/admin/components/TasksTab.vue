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
                <div><q-badge title="DNA - Simple Mutations (SM)" :color="getColor(submission['dna-sm'])" text-color="black" label="DNA-SM">: {{ submission["dna-sm"] }}</q-badge></div>
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
                <div><q-badge title="DNA - Simple Mutations (SM)" :color="getColor(annotation['dna-sm'])" text-color="black" label="DNA-SM">: {{ annotation["dna-sm"] }}</q-badge></div>
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
                <div><q-badge title="Donors index" :color="getColor(indexing.Project)" text-color="black" label="Project">: {{ indexing.Project }}</q-badge></div>
                <div><q-badge title="Donors index" :color="getColor(indexing.Donor)" text-color="black" label="Donor">: {{ indexing.Donor }}</q-badge></div>
                <div><q-badge title="Images index" :color="getColor(indexing.Image)" text-color="black" label="Image">: {{ indexing.Image }}</q-badge></div>
                <div><q-badge title="Specimens index" :color="getColor(indexing.Specimen)" text-color="black" label="Specimen">: {{ indexing.Specimen }}</q-badge></div>
                <div><q-badge title="Genes index" :color="getColor(indexing.Gene)" text-color="black" label="Gene">: {{ indexing.Gene }}</q-badge></div>
                <div><q-badge title="Variants index - Simple Mutations (SM)" :color="getColor(indexing.SM)" text-color="black" label="SM">: {{ indexing.SM }}</q-badge></div>
                <div><q-badge title="Variants index - Copy Number Variants (CNV)" :color="getColor(indexing.CNV)" text-color="black" label="CNV">: {{ indexing.CNV }}</q-badge></div>
                <div><q-badge title="Variants index - Structural Variants (SV)" :color="getColor(indexing.SV)" text-color="black" label="SV">: {{ indexing.SV }}</q-badge></div>
              </div>
            </template>
          </td>
        </tr>
        <tr>
          <td class="u-text-key">Reindexing</td>
          <td class="q-gutter-x-sm">
            <q-btn @click="indexAll" :loading="loadingAll" label="All" class="q-px-sm" dense no-caps />
            <q-btn @click="indexProjects" :loading="loading.projects" label="Projects" class="q-px-sm" dense no-caps />
            <q-btn @click="indexDonors" :loading="loading.donors" label="Donors" class="q-px-sm" dense no-caps />
            <q-btn @click="indexImages" :loading="loading.images" label="Images" class="q-px-sm" dense no-caps />
            <q-btn @click="indexSpecimens" :loading="loading.specimens" label="Specimens" class="q-px-sm" dense no-caps />
            <q-btn @click="indexGenes"  :loading="loading.genes" label="Genes" class="q-px-sm" dense no-caps />
            <q-btn @click="indexVariants" :loading="loading.variants" label="Variants" class="q-px-sm" dense no-caps />
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
      indexing: null,
      loading: {
        projects: false,
        donors: false,
        images: false,
        specimens: false,
        genes: false,
        variants: false
      }
    }
  },

  computed: {
    loadingAll() {
      return Object.values(this.loading).some(value => value);
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
    },

    async indexAll() {
      await api.indexProjects();
      await api.indexDonors();
      await api.indexImages();
      await api.indexSpecimens();
      await api.indexGenes();
      await api.indexVariants();
    },

    async indexProjects() {
      this.loading.projects = true;
      await api.indexProjects();
      this.loading.projects = false;
    },

    async indexDonors() {
      this.loading.donors = true;
      await api.indexDonors();
      this.loading.donors = false;
    },

    async indexImages() {
      this.loading.images = true;
      await api.indexImages();
      this.loading.images = false;
    },

    async indexSpecimens() {
      this.loading.specimens = true;
      await api.indexSpecimens();
      this.loading.specimens = false;
    },

    async indexGenes() {
      this.loading.genes = true;
      await api.indexGenes();
      this.loading.genes = false;
    },

    async indexVariants() {
      this.loading.variants = true;
      await api.indexVariants();
      this.loading.variants = false;
    }
  }
}
</script>
