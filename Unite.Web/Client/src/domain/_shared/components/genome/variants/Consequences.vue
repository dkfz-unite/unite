<template>
  <div v-if="consequences?.length" class="column">
    <div v-for="(consequence, i) in consequences" :key="i" class="row justify-left q-gutter-x-xs">
      <div>
        <span :class="getImpactColor(consequence.impact)">{{ getConsequenceLabel(consequence.term) }}: </span>
      </div>
      <!-- <div v-for="(gene, j) in consequence.genes?.slice(0, 4)" :key="j"> -->
        <div v-for="(gene, j) in consequence.genes" :key="j">
        <span>
          <u-link class="text-italic" :to="{ name: 'gene', params: { id: gene.id.toString() }}">
            {{ gene.symbol }}
          </u-link>
          <!-- <router-link 
            class="u-link text-italic" 
            :to="{ name: 'gene', params: { id: gene.id.toString() }}">
            {{gene.symbol}}
          </router-link> -->
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
import ConsequenceType from "@/_models/domain/genome/variants/enums/consequence-type";

export default {
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