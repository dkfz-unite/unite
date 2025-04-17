<template>
  <q-menu style="width: 270px;">
    <q-list dense class="q-my-sm">
      <q-item>
        <u-sm-options v-model="sms" @update:model-value="update"/>
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
import USmOptions from "./SmOptions.vue";
import UCnvOptions from "./CnvOptions.vue";
import USvOptions from "./SvOptions.vue";
import UExpOptions from "./ExpOptions.vue";

export default {
  components: { UViewFigure, USmOptions, UCnvOptions, USvOptions, UExpOptions },

  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  emits: ["update:modelValue", "clear-cache"],

  data() {
    return {
      sms: {
        category: "Impact",
        high: this.modelValue.sms?.high || false,
        moderate: this.modelValue.sms?.moderate || false,
        low: this.modelValue.sms?.low || false,
        unknown: this.modelValue.sms?.unknown || false
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
      this.sms = {
        category: value.sms?.category || "Impact",
        high: value.sms?.high || false,
        moderate: value.sms?.moderate || false,
        low: value.sms?.low || false,
        unknown: value.sms?.unknown || false
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

      const sms = this.sms.high || this.sms.moderate || this.sms.low || this.sms.unknown;
      if (sms) {
        options.sms = this.sms;
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
