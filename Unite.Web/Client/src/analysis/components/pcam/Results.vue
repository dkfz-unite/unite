<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col">
        <q-tabs v-model="tab" dense align="left">
          <q-tab label="PCA" name="default" />
          <q-tab label="Scree" name="scree" />
        </q-tabs>
        <q-separator />
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="default" class="q-ma-none q-pa-none">
            <u-pca-tab :id="id" :title="title" :data="data" :meta="meta"/>
          </q-tab-panel>
          <q-tab-panel name="scree" class="q-ma-none q-pa-none">
            <u-scree-tab :id="id" :title="title" :data="data" :meta="meta"/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import UPcaTab from "./PcaTab.vue";
import UScreeTab from "./ScreeTab.vue";
import tabPageMixin from "./../../../admin/tab-page-mixin";

export default {
  components: {
    UPcaTab,
    UScreeTab
  },
  props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      meta:{
        type: Array,
        required: true,
      }
    },

  mixins: [tabPageMixin],
}
</script>