<template>
  <u-viewer :analysis="analysis" :dialog="dialog" :loader="onLoad" @delete="$emit('delete')">
    <template #dialog>
      <u-dialog ref="dialog" />
    </template>

    <template #results>
      <div class="col q-gutter-y-sm">
        <div class="row">
          <div class="col">
            <q-tabs v-model="tab" no-caps dense align="left">
              <q-tab label="Distribution" name="default" />
              <q-tab label="Contrasts" name="contrasts" />
            </q-tabs>
            <q-separator />
          </div>
        </div>
        
        <div class="row">
          <div class="col">
            <q-tab-panels v-model="tab">
              <q-tab-panel name="default" class="q-ma-none q-pa-none">
                <u-results :id="analysis.id" :title="analysis.name" :data="analysis.results" :meta="analysis.meta" />
              </q-tab-panel>
              <q-tab-panel name="contrasts" class="q-ma-none q-pa-none">
                <u-contrasts :data="analysis.meta.contrasts" />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </template>
  </u-viewer>
</template>

<script>
import UViewer from "../_shared/componets/Viewer.vue";
import UDialog from "./Dialog.vue";
import UResults from "./viewer/Results.vue";
import UContrasts from "./viewer/Contrasts.vue";
import Analysis from "./analysis.ts";

export default {
  components: {
    UViewer,
    UDialog,
    UResults,
    UContrasts
  },

  props: {
    analysis: {
      type: Analysis,
      required: true
    }
  },

  emits: ["delete"],

  data() {
    return {
      dialog: null,
      tab: "default"
    }
  },

  mounted() {
    this.dialog = this.$refs.dialog;
  },

  methods: {
    async onLoad() {
      if (!this.analysis.meta) {
        const samples = await this.loadFile("input/samples.tsv");
        const contrasts = await this.loadFile("output/contrasts.tsv");
        this.analysis.meta = { samples, contrasts };
      }
    },

    async loadFile(name) {
      const payload = { id: this.analysis.id, file: name };
      const content = await this.$store.dispatch("analysis/loadAnalysisMeta", payload);
      return content;
    }
  }
}
</script>
