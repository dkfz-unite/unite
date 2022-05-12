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
          :current="current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import USpecimensTree from "./SpecimensTree.vue";

export default {
  components: {
    USpecimensTree
  },

  props: {
    donor: {
      type: Object,
      default: null,
      required: true
    },
    specimens: {
      type: Array,
      default: null,
      required: true
    },
    current: {
      type: Number,
      default: null,
      required: false
    },
    title: {
      type: String,
      default: "Ancestry",
      required: false
    }
  },

  computed: {
    orderedSpecimens() {
      return this.specimens?.sort(this.compareSpecimens);
    }
  },

  methods: {
    compareSpecimens(left, right) {
      var leftRank = this.getSpecimenRank(left);
      var rightRank = this.getSpecimenRank(right);

      if (leftRank > rightRank) {
        return 1;
      } else if (leftRank < rightRank) {
        return -1;
      } else {
        return 0;
      }
    },

    getSpecimenRank(specimen) {
      if (specimen.tissue) {
        if (specimen.tissue.type == "Control") {
          return 1;
        } else if (specimen.tissue.tumorType == "Primary") {
          return 2;
        } else {
          return 3;
        }
      } else {
        return 4;
      }
    }
  }
}
</script>