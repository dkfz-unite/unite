<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 420px;">
      <q-card-section>
        <div class="text-h6">Gene Alteration Frequency</div>
      </q-card-section>
      
      <q-separator />

      <q-card-section>
        <div class="col q-gutter-sm">
          <div class="row">
            <div class="col">
              <q-input
                label="Name (Optional)"
                placeholder="Enter name"
                type="text"
                v-model="name.value"
                autofocus
                clearable outlined square dense
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                label="Description (Optional)"
                placeholder="Enter description"
                type="text"
                lines="3"
                v-model="description.value"
                clearable outlined square dense
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="col q-gutter-sm">
          <div class="row text-subtitle1">Options</div>

          <!-- Donors -->
          <!-- <div class="row">
            <div class="col">
              <q-input
                v-model="options.donors.value"
                label="Number of donors"
                type="number" :min="1" :max="options.donors.max"
                dense square outlined
              />
            </div>
          </div> -->

          <!-- Genes -->
          <div class="row">
            <div class="col">
              <q-input
                v-model="options.genes.value"
                label="Number of genes"
                type="number" :min="1" :max="options.genes.max"
                dense square outlined
              />
            </div>
          </div>

          <!-- SM -->
           <div class="row">
            <div class="col">
              <q-select
                v-model="options.sm.value"
                :options="options.sm.options"
                label="Mutation impact"
                clear-icon="las la-times-circle"
                @clear="options.sm.value = options.sm.default"
                multiple clearable use-chips
                dense options-dense square outlined
              />
            </div>
          </div>
      </div>
      </q-card-section>

      <q-separator />

      <q-card-actions  align="right" class="text-primary">
        <q-btn
          label="Reset"
          @click="onReset"
          dense flat no-caps
        />
        <q-btn
          label="Cancel"
          @click="onClose"
          dense flat no-caps 
          v-close-popup 
        />
        <q-btn 
          label="Start"
          :disable="!canSubmit"
          @click="onSubmit" 
          dense flat no-caps 
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Settings from "@/_settings/settings";
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";

export default {
  props: {
    datasets: {
      type: [Array, null],
      default: () => [],
    },
  },

  setup() {
    return {
      Settings
    }
  },

  data() { 
    return {
      dialog: false,
      name: {
        value: null
      },
      description: {
        value: null
      },
      options: {
        donors: {
          value: 50,
          max: 200
        },
        genes: {
          value: 20,
          min: 50
        },
        sm: {
          value: ["High", "Moderate"],
          options: ["High", "Moderate", "Low"],
          default: ["High", "Moderate"]
        }
      }
    };
  },

  computed: {
    canSubmit() {
      return true;
    },

    datasetsOrdered() {
      return this.datasets.sort((a, b) => a.order - b.order);
    }
  },

  mounted() {
  },

  methods: {
    show() {
      this.dialog = true;
    },

    async onSubmit() {
      const datasets = this.datasetsOrdered.map(dataset => ({
        id: dataset.id,
        name: dataset.name,
        order: dataset.order, 
        domain: dataset.domain,
        criteria: new FiltersCriteria(dataset.criteria).toSearchCriteria() 
      }));

      const options = {
        donors: this.options.donors.value,
        genes: this.options.genes.value,
        sm: this.options.sm.value
      };

      const data = {
        type: "gaf",
        name: this.name.value,
        description: this.description.value,
        status: null,
        date: new Date(),
        data: 
        {
          datasets: datasets,
          options: options
        }
      };

      const id = await this.$store.dispatch("analysis/runGafAnalysis", data);
      await this.$router.push({ name: "analysis", params: { id: id } });
    },

    async onReset() {
      this.options.donors.value = null;
      this.options.genes.value = false;
      this.options.sm.value = this.options.sm.default;
    },

    async onClose() {
      this.name.value = null;
      this.description.value = null;
      this.options.donors.value = null;
      this.options.genes.value = false;
      this.options.sm.value = this.options.sm.default;
      this.dialog = false;
    }
  }
}
</script>
