<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">{{title}}</span>
    </div>

    <div class="row">
      <div class="col-12 col-md-6">
        <u-specimens-tree
          :donor="donor" 
          :specimens="orderedSpecimens"
          :currentId="currentId"
          :currentType="currentType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import USpecimensTree from "./SpecimensTree.vue";
import MaterialType from "@/domain/specimens/materials/models/enums/material-type";
import TumorType from "@/domain/specimens/materials/models/enums/tumor-type";

export default {
  components: {
    USpecimensTree
  },

  props: {
    title: {
      type: String,
      default: "Ancestry",
      required: false
    },
    donor: {
      type: Object,
      required: true
    },
    specimens: {
      type: Array,
      required: true
    },
    currentId: {
      type: [Number, null],
      default: null
    },
    currentType: {
      type: [String, null],
      default: null,
      validator: (value) => ["donor", "specimen"].includes(value)
    },
  },

  computed: {
    orderedSpecimens() {
      return this.sortSpecimens(this.specimens);
    }
  },

  methods: {
    sortSpecimens(specimens) {
      if (!specimens?.length) {
        return specimens;
      } else {
        var sorted = specimens.sort(this.compareSpecimens);
        for (let i = 0; i < sorted.length; i++) {
          sorted[i].children = this.sortSpecimens(sorted[i].children);
        }
        return sorted;
      }
    },

    compareSpecimens(left, right) {
      if (left.creationDay != null && right.creationDay != null) {
        return right.creationDay > left.creationDay ? 1
             : right.creationDay < left.creationDay ? -1
             : 0;
      } else if (left.creationDay != null && right.creationDay == null) {
        return -1;
      } else if (left.creationDay == null && right.creationDay != null) {
        return 1;
      } else {
        var leftRank = this.getSpecimenRank(left);
        var rightRank = this.getSpecimenRank(right);
        return leftRank > rightRank ? 1
             : leftRank < rightRank ? -1
             : 0;
      }
    },

    getSpecimenRank(specimen) {
      if (specimen.material) {
        return specimen.material.type === MaterialType.Normal ? 1
             : specimen.material.tumorType === TumorType.Primary ? 2
             : specimen.material.tumorType === TumorType.Metastasis ? 3
             : specimen.material.tumorType === TumorType.Recurrent ? 4
             : 5;
      } else if (specimen.line) {
        return 11;
      } else if (specimen.organoid) {
        return 21;
      } else if (specimen.xenograft) {
        return 31;
      } else {
        return 41;
      }
    }
  }
}
</script>