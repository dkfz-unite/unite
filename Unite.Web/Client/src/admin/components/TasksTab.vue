<template>
  <div class="col">
    <q-markup-table v-if="general" separator="cell" dense bordered>
      <colgroup>
        <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '20%' }" />
        <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '80%' }" />
      </colgroup>
      <tbody>
        <tr>
          <td class="u-text-key">Submission ({{ general.submission }})</td>
          <td>
            <div class="row items-center q-gutter-x-sm">
              <template v-if="submission">
                <template v-for="type in Object.keys(submission)">
                  <div v-if="submission[type] > 0">
                    <q-badge :label="type" :title="type" color="grey-3" text-color="black">: {{ submission[type] }}</q-badge>
                  </div>
                </template>
              </template>
            </div>
          </td>
        </tr>
        <tr>
          <td class="u-text-key">Annotation ({{ general.annotation }})</td>
          <td>
            <div class="row items-center q-gutter-x-sm">
              <template v-if="annotation">
                <template v-for="type in Object.keys(annotation)">
                  <div v-if="annotation[type] > 0">
                    <q-badge :label="type" :title="type" color="grey-3" text-color="black">: {{ annotation[type] }}</q-badge>
                  </div>
                </template>
              </template>
            </div>
          </td>
        </tr>
        <tr>
          <td class="u-text-key">Indexing ({{ general.indexing }})</td>
          <td>
            <div class="row items-center q-gutter-x-sm">
              <template v-if="indexing">
                <template v-for="type in Object.keys(indexing)">
                  <div v-if="indexing[type] > 0">
                    <q-badge :label="type" :title="type" color="grey-3" text-color="black">: {{ indexing[type] }}</q-badge>
                  </div>
                </template>
              </template>
            </div>
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
