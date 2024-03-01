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
        <q-item :to="{ name: 'datasets', params: { domain: domain } }" clickable v-close-popup>
          <q-item-section>
            Show saved datasets
          </q-item-section>
        </q-item>

        <q-separator />

        <template v-for="dataset in options">
          <q-item @click="showDataset(dataset)" clickable v-close-popup>
            <q-item-section>
              <q-item-label lines="1">{{ dataset.name }}</q-item-label>
              <q-item-label lines="1" caption>{{ $helpers.content.toDateTimeString(dataset.date) }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  inject: ["domain"],

  computed: {
    datasets: {
      get() { return this.$store.state[this.domain].datasets; },
      set(value) { this.$store.state[this.domain].datasets = value }
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
      return this.datasets?.sort(this.compareDates)?.map(dataset => {
        return {
          name: dataset.name,
          date: dataset.date
        };
      });
    }
  },

  methods: {
    showDataset(option) {
      const dataset = this.datasets.find(dataset => dataset.name === option.name);
      this.criteria = new FiltersCriteria(dataset.criteria);
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