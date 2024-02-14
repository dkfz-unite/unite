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
import UGeneLink from "@/domain/genome/gene/components/Link.vue";
import ImpactColor from "@/domain/genome/variants/_models/impact-color";
import ConsequenceType from "@/domain/genome/variants/_models/enums/consequence-type";

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
      return ImpactColor.Text[impact];
    },

    getConsequenceLabel(value){
      return this.$helpers.enum.getLabel(value, ConsequenceType.values);
    }
  }
}
</script>