<template>
  <q-btn 
    v-if="options?.length" 
    label="Load" 
    title="Load cohort" 
    icon="las la-archive" 
    color="secondary" 
    dense flat no-caps>
    
    <q-menu max-height="200px">
      <q-list style="width: 250px">
        <q-item :to="{ name: 'cohorts', params: { domain: domain} }" clickable v-close-popup>
          <q-item-section>
            Show saved cohorts
          </q-item-section>
        </q-item>

        <q-separator />

        <template v-for="cohort in options">
          <q-item @click="showCohort(cohort)" clickable v-close-popup>
            <q-item-section>
              <q-item-label lines="1">{{ cohort.name }}</q-item-label>
              <q-item-label lines="1" caption>{{ $helpers.content.toDateTimeString(cohort.date) }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import { mapGetters, mapState } from "vuex";

export default {
  inject: ["domain"],

  computed: {
    // ...mapGetters("filters", {
    //   getCohorts: "cohorts",
    //   getCohort: "cohort"
    // }),

    cohorts: {
      get() { return this.$store.state[this.domain].cohorts; },
      set(value) { this.$store.state[this.domain].cohorts = value }
    },

    criteria: {
      get() { return this.$store.state[this.domain].filtersCriteria; },
      set(value) { this.$store.state[this.domain].filtersCriteria = value }
    },

    selected: {
      get() { return this.$store.state[this.domain].rowsSelected; },
      set(value) { this.$store.state[this.domain].rowsSelected = value }
    },

    options() {
      // return this.getCohorts(this.domain)?.sort(this.compareDates)?.map(cohort => {
      return this.cohorts?.sort(this.compareDates)?.map(cohort => {
        return {
          name: cohort.name,
          date: cohort.date
        };
      });
    }
  },

  methods: {
    showCohort(option) {
      const cohort = this.cohorts.find(cohort => cohort.name === option.name);
      this.criteria = new FiltersCriteria(cohort.criteria);
      this.selected = [];
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