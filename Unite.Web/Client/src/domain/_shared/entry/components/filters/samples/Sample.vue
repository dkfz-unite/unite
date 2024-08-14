<template>
  <div class="col">
    <div class="row items-center q-gutter-x-sm">
      <div>
        <q-icon :name="icon" size="xs" />
      </div>
      <div>
        <q-item-label>
          <div class="row justify-left">
            <div> {{ sample.referenceId }}</div>
          </div>
        </q-item-label>
        <q-item-label v-if="showAnalyses" caption>{{ analyses }}</q-item-label>
      </div>
    </div>
  </div>
</template>

<script>
import SpecimenType from "@/domain/specimens/_shared/specimens/models/enums/specimen-type";
import settings from "@/_settings/settings";

export default {
  props: {
    sample: {
      type: Object,
      required: true
    },
    showAnalyses: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    icon() {
      return this.sample.type == SpecimenType.Material ? settings.materials.icon
           : this.sample.type == SpecimenType.Line ? settings.lines.icon
           : this.sample.type == SpecimenType.Organoid ? settings.organoids.icon
           : this.sample.type == SpecimenType.Xenograft ? settings.xenografts.icon
           : null;
    },

    analyses() {
      const getAnalysisRank = analysis => {
        return analysis.type == "WES" ? 1
             : analysis.type == "WGS" ? 2
             : analysis.type == "RNASeq" ? 3
             : analysis.type == "RNASeqSc" ? 4
             : 5;
      };
      const analyses = this.sample.analyses
        .map(analysis => ({ name: analysis.type, rank: getAnalysisRank(analysis) }))
        .sort((a, b) => a.rank - b.rank)
        .map(analysis => analysis.name);
        
      return analyses.join(", ");
    }
  }
}
</script>