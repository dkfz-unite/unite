<template>
  <div v-if="consequences?.length" class="column">
    <div v-for="(consequence, i) in consequences" :key="i" class="row justify-left q-gutter-x-xs">
      <div>
        <span :class="getImpactColor(consequence.impact)">{{getConsequenceLabel(consequence.term)}}: </span>
      </div>
      <div v-for="(gene, j) in consequence.genes?.slice(0, 4)" :key="j">
        <span>
          <router-link 
            class="u-link text-italic" 
            :to="{ name: 'gene', params: { id: gene.id.toString() }}">
            {{gene.symbol}}
          </router-link>
          <span v-if="gene.transcripts?.length">
            (<span v-for="(transcript, k) in gene.transcripts" :key="k">
              <span>{{transcript}}</span>
              <span v-if="k < gene.transcripts.length - 1">, </span>
            </span>)
          </span>
        </span>
      </div>
      <div v-if="consequence.genes?.length > 4">
        <span class="text-italic">... and {{(consequence.genes.length - 4).toLocaleString()}} other</span>
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