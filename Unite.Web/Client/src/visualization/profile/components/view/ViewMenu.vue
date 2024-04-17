<template>
  <q-menu style="width: 270px;">
    <q-list dense class="q-my-sm">
      <q-item>
        <u-ssm-options v-model="ssms" @update:model-value="update"/>
      </q-item>
      
      <q-separator class="q-my-xs" />
      <q-item>
        <u-cnv-options v-model="cnvs" @update:model-value="update" />
      </q-item>

      <q-separator class="q-my-xs" />
      <q-item>
        <u-sv-options v-model="svs" @update:model-value="update" />
      </q-item>

      <q-separator class="q-my-xs" />
      <q-item>
        <u-exp-options v-model="exps" @update:model-value="update" />
      </q-item>

      <q-separator class="q-my-xs" />
      <q-item>
        <q-item-section>
          <q-btn text-color="red" dense flat no-caps @click="$emit('clear-cache')">Clear cache</q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import UViewFigure from "./ViewFigure.vue";
import USsmOptions from "./SsmOptions.vue";
import UCnvOptions from "./CnvOptions.vue";
import USvOptions from "./SvOptions.vue";
import UExpOptions from "./ExpOptions.vue";

export default {
  components: { UViewFigure, USsmOptions, UCnvOptions, USvOptions, UExpOptions },

  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  emits: ["update:modelValue", "clear-cache"],

  data() {
    return {
      ssms: {
        category: "Impact",
        high: this.modelValue.ssms?.high || false,
        moderate: this.modelValue.ssms?.moderate || false,
        low: this.modelValue.ssms?.low || false,
        unknown: this.modelValue.ssms?.unknown || false
      },
      cnvs: {
        type: this.modelValue.cnvs?.type || false
      },
      svs: {
        type: this.modelValue.svs?.type || false
      },
      exps: {
        reads: this.modelValue.exps?.reads || false,
        pkm: this.modelValue.exps?.tpm || false,
        fpkm: this.modelValue.exps?.fpkm || false
      }
    }
  },

  watch: {
    modelValue(value) {
      this.ssms = {
        category: value.ssms?.category || "Impact",
        high: value.ssms?.high || false,
        moderate: value.ssms?.moderate || false,
        low: value.ssms?.low || false,
        unknown: value.ssms?.unknown || false
      };
      this.cnvs = {
        type: value.cnvs?.type || false
      };
      this.svs = {
        type: value.svs?.type || false
      };
      this.exps = {
        reads: value.exps?.reads || false,
        pkm: value.exps?.tpm || false,
        fpkm: value.exps?.fpkm || false
      }
    }
  },

  methods: {
    update() {
      let options = {};

      const ssms = this.ssms.high || this.ssms.moderate || this.ssms.low || this.ssms.unknown;
      if (ssms) {
        options.ssms = this.ssms;
      }

      const cnvs = this.cnvs.type;
      if (cnvs) {
        options.cnvs = this.cnvs;
      }

      const svs = this.svs.type;
      if (svs) {
        options.svs = this.svs;
      }

      const exps = this.exps.reads || this.exps.pkm || this.exps.fpkm;
      if (exps) {
        options.exps = this.exps;
      }

      this.$emit('update:modelValue', options);
    }
  }
}
</script>
