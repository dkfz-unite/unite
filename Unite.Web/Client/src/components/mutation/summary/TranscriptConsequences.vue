<template>
  <div class="col q-gutter-y-sm" v-if="features">
    <div class="row">
      <span class="text-h5 u-text-title">Transcript Consequences</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip text-left" separator="cell" dense flat bordered>
          <thead>
            <tr>
              <th>
                <span class="u-text-key">Gene</span>
              </th>
              <th>
                <span class="u-text-key">Consequences</span>
              </th>
              <th>
                <span class="u-text-key">Amino Acid Cahnge</span>
              </th>
              <th>
                <span class="u-text-key">Coding DNA Change</span>
              </th>
              <th>
                <span class="u-text-key">Strand</span>
              </th>
              <th>
                <span class="u-text-key">Transcript</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(feature, i) in features" :key="i">
              <td>
                <router-link class="u-link" :to="{ name: 'gene', params: { id: feature.transcript.gene.id }}">
                  {{feature.transcript.gene.symbol}}
                </router-link>
                <!-- <a class="u-link" :href="'http://feb2014.archive.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=' + feature.transcript.gene.ensemblId" target="blank">
                  {{feature.transcript.gene.symbol}}
                </a> -->
              </td>
              <td>
                <div v-for="(consequence, i) in feature.consequences" :key="i">
                  <span :class="getImpactColor(consequence.impact)">{{getConsequenceLabel(consequence.type)}}</span>
                </div>
              </td>
              <td>
                <span>{{feature.aminoAcidChange}}</span>
              </td>
              <td>
                <span>{{feature.codonChange}}</span>
              </td>
              <td>
                <span>{{feature.transcript.strand ? '+' : '-'}}</span>
              </td>
              <td>
                <a class="u-link" :href="'http://feb2014.archive.ensembl.org/Homo_sapiens/Transcript/Summary?db=core;t=' + feature.transcript.ensemblId" target="blank">
                  <div class="row">
                    <q-icon name="las la-external-link-alt" size="xs"/> 
                    {{feature.transcript.symbol}}
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import ConsequenceType from '../../../services/criteria/filters/data/mutations/filter.option.consequence.type.js';

export default {
  props: ["features"],

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
      var option = new ConsequenceType(value);

      return option.label;
    }
  }
};
</script>