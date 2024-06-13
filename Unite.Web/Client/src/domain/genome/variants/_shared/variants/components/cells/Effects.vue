<template>
  <div v-if="effects?.length">
    <div v-for="(effect, i) in effects" :key="i" class="row q-gutter-xs">
      <div :class="getImpactColor(effect.impact)">
        {{ getConsequenceLabel(effect.term) }}:
      </div>
      <div v-for="(gene, j) in effect.genes" :key="j">
        <span>
          <u-link-gene class="text-italic" :id="gene.id">
            {{ gene.symbol }}
          </u-link-gene>
          <span v-if="gene.translations?.length">
            (<span v-for="(translation, k) in gene.translations" :key="k">
              <span>{{ translation }}</span>
              <span v-if="k < gene.translations.length - 1">, </span>
            </span>)
          </span>
        </span>
      </div>
      <div v-if="effect.genesNumber > 5">
        <span class="text-italic">... and {{ (effect.genesNumber - effect.genes.length).toLocaleString() }} other</span>
      </div>
    </div>
  </div>
</template>

<script>
import ImpactColor from "@/domain/genome/variants/_models/impact-color";
import EffectType from "../../models/enums/effect-type";

export default {
  props: {
    effects: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getImpactColor(impact) {
      return ImpactColor.Text[impact];
    },

    getConsequenceLabel(value){
      return this.$helpers.enum.getLabel(value, EffectType.values);
    }
  }
}
</script>