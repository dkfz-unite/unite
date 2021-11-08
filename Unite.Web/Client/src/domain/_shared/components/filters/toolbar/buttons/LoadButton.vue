<template>
  <q-btn
    v-if="options?.length"
    label="Load"
    title="Load filters"
    icon="las la-archive"
    color="primary"
    dense flat no-caps>
    <q-menu 
      max-height="200px">
      <q-list style="width: 250px">
        <q-item :to="{ name: 'filters' }" clickable v-close-popup>
          <q-item-section>
            Show saved filters
          </q-item-section>
        </q-item>

        <q-separator />

        <template v-for="(cohort, i) in options" :key="i">
          <q-item @click="showCohort(cohort)" clickable v-close-popup>
          <q-item-section>
            <q-item-label lines="1">{{cohort.name}}</q-item-label>
            <q-item-label lines="1" caption>{{$helpers.content.toDateTimeString(cohort.date)}}</q-item-label>
          </q-item-section>
        </q-item>
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import FiltersCriteria from "../../../../../../_shared/components/filters/filters-criteria";
import cohortsStorage from "../../../../../../filters/services/cohorts-storage";

export default {
  inject: ["domain", "identity"],

  data() {
    return {
      cohorts: null
    };
  },

  computed: {
    options() {
      return this.cohorts?.map(cohort => {
        return {
          id: cohort.id,
          name: cohort.name,
          date: cohort.date
        };
      });
    }
  },

  mounted() {
    this.loadCohorts();
  },

  methods: {
    showCohort(option) {
      const cohort = this.cohorts.find(cohort => cohort.id == option.id);
      this.$store.state[this.domain].filtersCriteria = new FiltersCriteria(cohort.criteria);
    },

    loadCohorts() {
      const domains = cohortsStorage.loadCohorts(this.identity);
      const domain = domains?.find(domain => domain.name == this.domain);
      const cohorts = domain?.cohorts?.sort(this.compareDates);

      this.cohorts = cohorts;
    },

    compareDates(a, b) {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);

      return aDate < bDate ? -1
           : aDate > bDate ? 1
           : 0;
    }
  }
}
</script>