<template>
  <q-menu>
    <q-list dense class="q-my-sm">
      <!-- SSM Group -->
      <q-item>
        <q-item-section>Simple Somatic Mutations (SSM)</q-item-section>
      </q-item>

      <!-- SSM Category -->
      <q-item>
        <q-item-section>Impact</q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="square" color="red-4" :active="ssmHigh">High</u-view-figure>
        </q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="ssmHigh" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="square" color="orange-4" :active="ssmModerate">Moderate</u-view-figure>
        </q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="ssmModerate" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="square" color="green-4" :active="ssmLow">Low</u-view-figure>
        </q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="ssmLow" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="square" color="grey-4" :active="ssmUnknown">Unknown</u-view-figure>
        </q-item-section>
        <q-item-section side>
          <q-toggle dense v-model="ssmUnknown" @update:model-value="update" />
        </q-item-section>
      </q-item>


      <!-- CNV Group -->
      <q-separator class="q-my-xs" />

      <q-item>
        <q-item-section>Copy Number Variants (CNV)</q-item-section>
      </q-item>

      <!-- CNV Category -->
      <q-item>
        <q-item-section>Type</q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="cnvType" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <div class="row q-gutter-x-sm">
            <u-view-figure type="square" color="green-4" :active="cnvType">Gain</u-view-figure>
            <u-view-figure type="square" color="grey-4" :active="cnvType">Neutral</u-view-figure>
            <u-view-figure type="square" color="red-4" :active="cnvType">Loss</u-view-figure>
          </div>
        </q-item-section>
      </q-item>


      <!-- SV Group -->
      <q-separator class="q-my-xs" />

      <q-item>
        <q-item-section>Structural Variants (SV)</q-item-section>
      </q-item>

      <!-- SV Category -->
      <q-item>
        <q-item-section>Type</q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="svType" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <div class="row q-gutter-x-sm">
            <u-view-figure type="square" color="green-4" :active="svType">DUP</u-view-figure>
            <u-view-figure type="square" color="red-4" :active="svType">DEL</u-view-figure>
            <u-view-figure type="square" color="orange-5" :active="svType">INS</u-view-figure>
            <u-view-figure type="square" color="grey-4" :active="svType">INV</u-view-figure>
          </div>
        </q-item-section>
      </q-item>
        


      <!-- Expressions Group -->
      <q-separator class="q-my-xs" />

      <q-item>
        <q-item-section>Gene Expressions</q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="line" color="grey-9" :active="expReads">Reads</u-view-figure>
        </q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="expReads" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="line" color="teal-4" :active="expTpm">TPM</u-view-figure>
        </q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="expTpm" @update:model-value="update" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <u-view-figure type="line" color="purple-4" :active="expFpkm">FPKM</u-view-figure>
        </q-item-section>
        <q-item-section side> 
          <q-toggle dense v-model="expFpkm" @update:model-value="update" />
        </q-item-section>
      </q-item>


      <!-- Cache Group-->
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

export default {
  components: { UViewFigure },

  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  emits: ["update:modelValue", "clear-cache"],

  data() {
    return {
      ssmHigh: this.modelValue.ssms?.high || false,
      ssmModerate: this.modelValue.ssms?.moderate || false,
      ssmLow: this.modelValue.ssms?.low || false,
      ssmUnknown: this.modelValue.ssms?.unknown || false,
      cnvType: this.modelValue.cnvs?.type || false,
      svType: this.modelValue.svs?.type || false,
      expReads: this.modelValue.exps?.reads || false,
      expTpm: this.modelValue.exps?.tpm || false,
      expFpkm: this.modelValue.exps?.fpkm || false
    }
  },

  watch: {
    modelValue(value) {
      this.ssmHigh = value.ssms?.high || false;
      this.ssmModerate = value.ssms?.moderate || false;
      this.ssmLow = value.ssms?.low || false;
      this.ssmUnknown = value.ssms?.unknown || false;
      this.cnvType = value.cnvs?.type || false;
      this.svType = value.svs?.type || false;
      this.expReads = value.exps?.reads || false;
      this.expTpm = value.exps?.tpm || false;
      this.expFpkm = value.exps?.fpkm || false;
    }
  },

  methods: {
    update() {
      let options = {};

      const ssms = this.ssmHigh || this.ssmModerate || this.ssmLow || this.ssmUnknown;
      if (ssms) {
        options.ssms = {
          high: this.ssmHigh,
          moderate: this.ssmModerate,
          low: this.ssmLow,
          unknown: this.ssmUnknown
        }
      }

      const cnvs = this.cnvType;
      if (cnvs) {
        options.cnvs = {
          type: this.cnvType
        }
      }

      const svs = this.svType;
      if (svs) {
        options.svs = {
          type: this.svType
        }
      }

      const exps = this.expReads || this.expTpm || this.expFpkm;
      if (exps) {
        options.exps = {
          reads: this.expReads,
          tpm: this.expTpm,
          fpkm: this.expFpkm
        }
      }


      this.$emit('update:modelValue', options);
    }
  }
}
</script>
