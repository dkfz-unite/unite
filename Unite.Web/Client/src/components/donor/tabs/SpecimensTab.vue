<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-specimens v-if="donor && specimens"
          :donor="donor" 
          :specimens="specimens" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import USpecimens from "../specimens/Specimens.vue";

import SearchCriteria from "../../../services/criteria/criteria.search.js";
import specimensApiClient from "../../../services/api/api.client.specimens.js";

export default {
  props: ["donor"],

  data() {
    return {
      specimens: null,
    };
  },

  async mounted() {
    this.specimens = await this.fetchSpecimens(this.donor.id);
  },

  methods: {
    async fetchSpecimens(donorId) {
      let criteria = new SearchCriteria();
      criteria.from = 0;
      criteria.size = 1000;
      criteria.donorFilters.id.push(donorId);

      let data = await specimensApiClient.search(criteria);

      if (data) {
        let filtered = data.rows
          .filter(row => !row.parent)
          .sort(this.compareSpecimens);
        return filtered;
      } else {
        return null;
      }
    },

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
    USpecimens: USpecimens
  }
}
</script>