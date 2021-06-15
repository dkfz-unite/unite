<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-ancestry v-if="donor && specimens" 
          title="Specimens"
          :donor="donor"
          :specimens="specimens"
          :current="donor.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UAncestry from "../../specimens/base/ancestry/Ancestry.vue";

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
        return data.rows.filter(row => !row.parent);
      } else {
        return null;
      }
    }
  },

  components: {
    UAncestry: UAncestry
  }
}
</script>