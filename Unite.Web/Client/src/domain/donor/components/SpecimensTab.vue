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
import UAncestry from "@/domain/_shared/components/specimens/Ancestry.vue";

import api from "../api";

export default {
  components: {
    UAncestry
  },

  props: {
    donor: Object
  },

  data() {
    return {
      loading: false,
      specimens: null
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        let data = await api.searchSpecimens(this.donor.id, { from: 0, size: 1000 });
        this.specimens = data.rows.filter(row => !row.parent);
      } catch(error) {
        this.specimens = null;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>