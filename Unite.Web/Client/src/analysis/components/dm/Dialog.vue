<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 420px;">
      <q-card-section>
        <div class="text-h6">Differential Methylation Analysis</div>
      </q-card-section>

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
        <div class="col">
          <template v-for="(dataset, index) in datasetsOrdered" :key="index">
            <div class="row items-center q-gutter-xs q-mb-xs">
              <q-icon :name="Settings[dataset.domain]?.icon" size="sm" />
              <div>{{ dataset.name }}</div>
            </div>
            <div v-if="index < datasetsOrdered.length - 1" class="row text-hint text-grey-7 q-mb-xs">
              vs
            </div>
          </template>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="col q-gutter-sm">
          <div class="row text-subtitle1">Options</div>
          <!-- PP -->
          <div class="row">
            <div class="col">
              <q-select
                v-model="options.pp.value"
                label="Preprocessing method"
                class="row"
                dense options-dense square outlined
                map-options emit-value
                :options="options.pp.options"
              />
            </div>
          </div>
      </div>
      </q-card-section>

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
      },options: {
        model: {
          value: null,
          options: [],
        },
        pp: {
          value: "Illumina",
          options: [
            { label: "Illumina", value: "Illumina" },
            { label: "SWAN", value: "SWAN" },
            { label: "Quantile", value: "Quantile" },
            { label: "Noob", value: "Noob" },
            { label: "Raw", value: "Raw" }
          ]
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

      const data = {
        type: "dm",
        name: this.name.value,
        description: this.description.value,
        status: null,
        date: new Date(),
        data: 
        {
          datasets: datasets,
          options: { pp: this.options.pp.value } 
        }
      };

      const id = await this.$store.dispatch("analysis/runDmAnalysis", data);
      await this.$router.push({ name: "analysis", params: { id: id } });
    },

    async onReset() {
      this.name.value = null;
      this.description.value = null
      this.options.pp.value = "Illumina";
    },

    async onClose() {
      this.name.value = null;
      this.description.value = null;
      this.options.pp.value = "Illumina";
      this.dialog = false;
    }
  }
}
</script>
