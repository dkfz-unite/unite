<template>
  <div class="col q-gutter-y-sm" v-if="treatments">
    <div class="row">
      <span class="text-h5 u-text-title">Treatment</span>
    </div>

    <div class="row">
      <div class="col">
        <q-list class="rounded-borders" bordered>
          <div v-for="(treatment, i) in treatments" :key="i">
            <q-expansion-item
              header-class="u-text-key"
              :label="treatment.therapy"
              :caption="toDataRangeString(treatment.startDate, treatment.endDate)">
              <q-item>
                <q-item-section>
                  <div>
                    <span class="text-bold">Details:</span>
                    <span v-if="treatment.details">{{ treatment.details }}</span>
                    <span v-else> No data</span>
                  </div>

                  <div class="q-mt-xs">
                    <span class="text-bold">Results:</span>
                    <span v-if="treatment.results">{{ treatment.results }}</span>
                    <span v-else> No data</span>
                  </div>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-separator />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["donor"],

  computed:{
    treatments(){
      return this.donor?.treatments;
    }
  },

  methods: {
    toDateString(jsonValue) {
      if (!jsonValue) {
        return null;
      }

      var date = new Date(jsonValue);
      return date.toLocaleDateString();
    },

    toDataRangeString(jsonValueStart, jsonValueEnd) {
      if(!jsonValueStart && !jsonValueEnd){
        return null;
      }
      else{
        var startDate = this.toDateString(jsonValueStart) ?? "...";
        var endDate = this.toDateString(jsonValueEnd) ?? "...";
        return startDate + " - " + endDate;
      }
    }
  },
};
</script>