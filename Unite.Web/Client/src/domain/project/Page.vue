<template>
  <div class="col q-gutter-y-sm">
    <div class="row" v-if="project">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.projects.crumb" :to="{ name: Settings.projects.domain }" />
        <q-breadcrumbs-el :label="$route.params.id" />
        <q-breadcrumbs-el :label="Tabs[tab].crumb" />
      </q-breadcrumbs>

      <q-space />

      <u-download-button
        v-if="project"
        :id="project.id"
        :reference="project.name"
        :data="project.data"
        :domain="Settings.projects.domain">
      </u-download-button>

      <u-delete-button
        v-if="project && canWriteData"
        :id="project.id"
        :reference="project.name"
        @deleted="$router.replace({ name: Settings.projects.domain })">
      </u-delete-button>
    </div>

    <div class="row" v-if="project">
      <div class="col">
        <div class="row">
          <div class="col">
            <q-separator />
            <q-tabs v-model="tab" dense align="left">
              <q-tab 
                :name="Tabs.summary.domain" 
                :label="Tabs.summary.title" 
                :icon="Tabs.summary.icon" 
              />
              <q-tab 
                :name="Tabs.donors.domain" 
                :label="Tabs.donors.title" 
                :icon="Tabs.donors.icon"
                :disable="!showDonorsTab"
              />
              <q-tab
                :name="Tabs.images.domain" 
                :label="Tabs.images.title" 
                :icon="Tabs.images.icon"
                :disable="!showImagesTab"
              />
              <q-tab
                :name="Tabs.specimens.domain" 
                :label="Tabs.specimens.title" 
                :icon="Tabs.specimens.icon"
                :disable="!showSpecimensTab"
              />
              <q-tab 
                :name="Tabs.genes.domain" 
                :label="Tabs.genes.title" 
                :icon="Tabs.genes.icon"
                :disable="!showGenesTab"
              />
              <q-tab 
                :name="Tabs.variants.domain" 
                :label="Tabs.variants.title" 
                :icon="Tabs.variants.icon"
                :disable="!showVariantsTab"
              />
            </q-tabs>
            <q-separator />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab" class="fit">
              <q-tab-panel :name="Tabs.summary.domain" class="q-py-sm q-px-none">
                <u-summary-tab :project="project" />
              </q-tab-panel>
              <q-tab-panel v-if="showDonorsTab" :name="Tabs.donors.domain" class="q-py-sm q-px-none">
                <u-donors-tab :project="project" />
              </q-tab-panel>
              <q-tab-panel v-if="showImagesTab" :name="Tabs.images.domain" class="q-py-sm q-px-none">
                <u-images-tab :project="project" />
              </q-tab-panel>
              <q-tab-panel v-if="showSpecimensTab" :name="Tabs.specimens.domain" class="q-py-sm q-px-none">
                <u-specimens-tab :project="project" />
              </q-tab-panel>
              <q-tab-panel v-if="showGenesTab" :name="Tabs.genes.domain" class="q-py-sm q-px-none">
                <u-genes-tab :project="project" />
              </q-tab-panel>
              <q-tab-panel v-if="showVariantsTab" :name="Tabs.variants.domain" class="q-py-sm q-px-none">
                <u-variants-tab :project="project" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>

<script>
import UDownloadButton from "@/domain/_shared/entry/components/download/DownloadButton.vue";
import UDeleteButton from "./components/delete/DeleteButton.vue";
import USummaryTab from "./components/tabs/SummaryTab.vue";
import UDonorsTab from "./components/tabs/DonorsTab.vue";
import UImagesTab from "./components/tabs/ImagesTab.vue";
import USpecimensTab from "./components/tabs/SpecimensTab.vue";
import UGenesTab from "./components/tabs/GenesTab.vue";
import UVariantsTab from "./components/tabs/VariantsTab.vue";
import pageTabsMixin from "@/domain/_shared/entry/components/tabs/mixin";

import { mapGetters } from "vuex";
import Settings from "@/_settings/settings";
import api from "./api";

export default {
  components: {
    UDownloadButton,
    UDeleteButton,
    USummaryTab,
    UDonorsTab,
    UImagesTab,
    USpecimensTab,
    UGenesTab,
    UVariantsTab
  },

  mixins: [pageTabsMixin],

  setup() {
    return {
      Settings,
      Tabs: Settings.project.tabs
    };
  },

  data() {
    return {
      loading: false,
      project: null
    };
  },

  provide() {
    return {
      project: this.project,
    };
  },

  computed: {
    ...mapGetters("identity", ["canWriteData"]),

    showDonorsTab() {
      return this.project?.stats.donors.number > 0
          && this.project?.data.clinical
    },

    showImagesTab() {
      return this.project?.stats.images.mr?.number[0] > 0;
          // || this.project?.stats.images.ct?.number[0] > 0;
    },

    showSpecimensTab() {
      return this.project?.stats.specimens.material?.number[0] > 0
          || this.project?.stats.specimens.line?.number[0] > 0
          || this.project?.stats.specimens.organoid?.number[0] > 0
          || this.project?.stats.specimens.xenograft?.number[0] > 0;
    },

    showGenesTab() {
      return this.project?.stats.rna.number > 0
          || this.project?.stats.rnasc.number > 0;
    },

    showVariantsTab() {
      return this.project?.stats.dna.sm.number > 0
          || this.project?.stats.dna.cnv.number > 0
          || this.project?.stats.dna.sv.number > 0;
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.project = await api.get(this.$route.params.id);
      } catch (error) {
        this.project = null;
      } finally {
        this.loading = false;
      }
    },
  },

  async unmounted() {
    this.$store.dispatch(`${Settings.project.domain}/clearState`);
  }
}
</script>