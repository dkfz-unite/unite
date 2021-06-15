<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">{{title}}</span>
    </div>

    <div class="row">
      <div class="col-12 col-md-7">
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
      if (left.children?.length > right.children?.length) {
        return 1;
      } else if (left.children?.length < right.children?.length) {
        return -1;
      } else {
        return 0;
      }
    }
  },

  components: {
    USpecimensTree: USpecimensTree
  }
}
</script>