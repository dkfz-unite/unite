<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 350px;">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator />

      <q-card-section>
        <u-general :analysis="analysis" />
      </q-card-section>
      <q-separator />

      <q-card-section>
        <u-datasets :datasets="analysis.datasets" />
      </q-card-section>
       <q-separator />

      <q-card-section>
        <u-options :options="analysis.options" />
      </q-card-section>
      <q-separator />

      <q-card-actions align="right" class="text-primary">
        <q-btn
          label="Reset"
          @click="onReset"
          dense flat no-caps
        />
        <q-btn
          label="Cancel"
          @click="onClose"
          dense flat no-caps 
          v-close-popup 
        />
        <q-btn 
          label="Start"
          :disable="!canSubmit"
          @click="onSubmit" 
          dense flat no-caps 
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UGeneral from "./General.vue";
import UDatasets from "./Datasets.vue";
import UOptions from "./Options.vue";
import Analysis from '../analysis';

export default {
  components: {
    UGeneral,
    UDatasets,
    UOptions
  },

  props: {
    title: {
      type: String,
      default: 'Analysis'
    },
    analysis: {
      type: Analysis,
      required: true,
    }
  },

  emits: ['submit'],

  data() {
    return {
      dialog: false,
      canSubmit: true
    }
  },

  methods: {
    show() {
      this.dialog = true;
      this.analysis.name = this.analysis.datasets.map(d => d.name).join(" vs ");
    },

    onClose() {
      this.dialog = false;
      this.analysis.reset();
    },

    onReset() {
      this.analysis.resetOptions();
    },

    onSubmit() {
      this.$emit('submit', this.analysis.toPayload());
    }
  }
}
</script>