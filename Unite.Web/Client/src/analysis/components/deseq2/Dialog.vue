<template>
  <q-dialog
    v-model="dialog" 
    @keyup.esc="onClose"
    @keyup.enter="onSubmit"
    persistent>

    <q-card style="min-width: 300px;">
      <q-card-section>
        <div class="text-h6">Differential expression analysis</div>
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
          <div class="row items-center q-gutter-xs">
            <q-icon :name="DomainIcons.get(cohortsOrdered[0].domain)" size="sm"/>
            <div>{{ cohortsOrdered[0].name }}</div>
          </div>
          <div class="row text-hint text-grey-7">vs</div>
          <div class="row items-center q-gutter-xs">
            <q-icon :name="DomainIcons.get(cohortsOrdered[1].domain)" size="sm"/>
            <div>{{ cohortsOrdered[1].name }}</div>
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
import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import DomainIcons from "@/_settings/domain-icons";

export default {
  props: {
    cohorts: {
      type: [Array, null],
      default: () => [],
    },
  },

  setup() {
    return {
      DomainIcons
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
    };
  },

  computed: {
    canSubmit() {
      return true;
    },

    cohortsOrdered() {
      return this.cohorts.sort((a, b) => a.order - b.order);
    }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    async onSubmit() {
      const cohorts = this.cohortsOrdered.map(cohort => ({
        key: cohort.key,
        name: cohort.name,
        order: cohort.order, 
        domain: cohort.domain,
        criteria: new FiltersCriteria(cohort.criteria).toSearchCriteria() 
      }));

      const data = {
        type: "dexp",
        name: this.name.value,
        description: this.description.value,
        status: null,
        date: new Date(),
        cohorts: cohorts,
      };

      await this.$store.dispatch("analysis/runDExpAnalysis", data);
      await this.$router.push({ name: "analysis" });
    },

    async onClose() {
      this.name.value = null;
      this.description.value = null;
      this.dialog = false;
    },
  }
}
</script>