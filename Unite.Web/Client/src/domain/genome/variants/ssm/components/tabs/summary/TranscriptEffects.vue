<template>
  <div class="col q-gutter-y-sm" v-if="features">
    <div class="row">
      <span class="text-h5 u-text-title">Transcript Effects</span>
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
                <span class="u-text-key">Transcript</span>
              </th>
              <th>
                <span class="u-text-key">Strand</span>
              </th>
              <th>
                <span class="u-text-key">Effect</span>
              </th>
              <th>
                <span class="u-text-key">Codon Change</span>
              </th>
              <th>
                <span class="u-text-key">Protein Cahnge</span>
              </th>
              <th>
                <span class="u-text-key">Distance</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(affectedFeature, i) in orderedFeatures" :key="i">
              <td>
                <u-link :to="{ name: 'gene', params: { id: affectedFeature.gene.id }}">
                  {{ affectedFeature.gene.symbol }}
                </u-link>
              </td>
              <td>
                <div class="row">
                  <u-link-external :to="getTranscriptLink(affectedFeature.transcript.feature.stableId)">
                    {{ affectedFeature.transcript.feature.symbol }}
                  </u-link-external>
                  <div v-if="affectedFeature.transcript.feature.isCanonical" title="Canonical" style="cursor:default ; padding-left: 2px; font-size: 8px;">C</div>
                </div>
              </td>
              <td>
                <span>{{affectedFeature.transcript.feature.strand ? '+' : '-'}}</span>
              </td>
              <td>
                <div v-for="(effect, i) in affectedFeature.effects" :key="i">
                  <span :class="getImpactColor(effect.impact)">{{getConsequenceLabel(effect.type)}}</span>
                </div>
              </td>
              <td>
                <span>{{affectedFeature.transcript.codonChange}}</span>
              </td>
              <td>
                <span>{{affectedFeature.transcript.proteinChange}}</span>
              </td>
              <td>
                <span>{{affectedFeature.transcript.distance}}</span>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import ImpactColor from "../../../../_models/impact-color";
import EffectType from "@/domain/genome/variants/_shared/variants/models/enums/effect-type";

export default {
  props: {
    features: Array
  },

  computed: {
    orderedFeatures() {
      return this.features?.sort((a, b) => {
        var baseA = a.transcript?.feature || a.Regulation?.feature || a.motif?.feature || null;
        var baseB = b.transcript?.feature || b.Regulation?.feature || b.motif?.feature || null;
        return baseA.start - baseB.start;
      });
    }
  },

  methods: {
    getImpactColor(impact) {
      return ImpactColor.Text[impact];
    },

    getConsequenceLabel(value){
      return this.$helpers.enum.getLabel(value, EffectType.values);
    },

    getTranscriptLink(id) {
      return `http://feb2014.archive.ensembl.org/Homo_sapiens/Transcript/Summary?db=core;t=${id}`;
    }
  }
}
</script>