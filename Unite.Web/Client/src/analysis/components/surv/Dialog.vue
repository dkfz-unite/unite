<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 420px;">
      <q-card-section>
        <div class="text-h6">Survival Curve Estimation</div>
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
          <div class="row">
            <div class="col">
              <q-radio v-model="progression.value" :val="false" label="Survival" />
              <q-radio v-model="progression.value" :val="true" label="Progression" />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions  align="right" class="text-primary">
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
      progression: {
        value: false
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
        type: "surv",
        name: this.name.value,
        description: this.description.value,
        status: null,
        date: new Date(),
        data: 
        {
          datasets: datasets,
          options: { progression: this.progression.value }
        }
      };

      const id = await this.$store.dispatch("analysis/runSurvAnalysis", data);
      await this.$router.push({ name: "analysis", params: { id: id } });
    },

    async onClose() {
      this.name.value = null;
      this.description.value = null;
      this.progression.value = false;
      this.dialog = false;
    }
  }
}
</script>
