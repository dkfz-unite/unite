<template>
  <div v-if="consequences?.length">
    <div v-for="(consequence, i) in consequences" :key="i" class="row q-gutter-xs">
      <div :class="getImpactColor(consequence.impact)">
        {{ getConsequenceLabel(consequence.term) }}:
      </div>
      <div v-for="(gene, j) in consequence.genes" :key="j">
        <span>
          <u-gene-link class="text-italic" :id="gene.id">
            {{ gene.symbol }}
          </u-gene-link>
          <span v-if="gene.translations?.length">
            (<span v-for="(translation, k) in gene.translations" :key="k">
              <span>{{ translation }}</span>
              <span v-if="k < gene.translations.length - 1">, </span>
            </span>)
          </span>
        </span>
      </div>
      <div v-if="consequence.genesNumber > 5">
        <span class="text-italic">... and {{ (consequence.genesNumber - consequence.genes.length).toLocaleString() }} other</span>
      </div>
    </div>
  </div>
</template>

<script>
import UGeneLink from "@/_shared/components/GeneLink.vue";
import ConsequenceType from "@/_models/domain/genome/variants/enums/consequence-type";

export default {
  components: { UGeneLink },
  props: {
    consequences: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getImpactColor(impact) {
      switch(impact){
        case "High": return "text-red-8";
        case "Moderate": return "text-orange-8";
        case "Low": return "text-green-8";
        default: return "text-grey-8";
      }
    },

    getConsequenceLabel(value){
      return this.$helpers.enum.getLabel(value, ConsequenceType.values);
    }
  }
}
</script>