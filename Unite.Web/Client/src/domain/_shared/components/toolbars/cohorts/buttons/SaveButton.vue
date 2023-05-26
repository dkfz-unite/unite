<template>
  <q-dialog 
    v-model="showDialog" 
    @keyup.esc="showDialog = false" 
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Save as Cohort</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <q-input 
          label="Name"
          placeholder="Enter cohort name"
          type="text" 
          v-model="name.value" 
          :rules="name.rules" 
          square outlined dense
        />

        <q-input 
          label="Description (optional)"
          placeholder="Enter cohort description"
          type="text" 
          v-model="description.value" 
          autogrow square outlined dense 
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn 
          label="Cancel" 
          dense flat no-caps v-close-popup 
        />

        <q-btn 
          label="Save" 
          :disable="!canSave" 
          @click="onSave" 
          dense flat no-caps v-close-popup 
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-btn 
    v-if="criteria?.numberOfFilters || selected?.length" 
    label="Save" 
    title="Save as cohort" 
    icon="las la-save"
    color="secondary"
    @click="showDialog=true"
    dense flat no-caps 
  />
</template>

<script>
export default {
  inject: ["domain"],

  data() {
    return {
      showDialog: false,

      name: {
        value: null,
        rules: [
          (val) => this.nameIsNotEmpty(val) || "Please, enter cohort name",
          (val) => this.nameIsNotReserved(val) || "Cohort with given name already exists"
        ]
      },

      description: {
        value: null
      }
    };
  },

  computed: {
    selected: {
      get() { return this.$store.state[this.domain].rowsSelected; },
      set(value) { this.$store.state[this.domain].rowsSelected = value }
    },

    criteria: {
      get() { return this.$store.state[this.domain].filtersCriteria; },
      set(value) { this.$store.state[this.domain].filtersCriteria = value }
    },

    canSave() {
      let nameIsValid = this.name.rules.every(
        (rule) => rule(this.name.value) === true
      );

      return nameIsValid;
    }
  },

  methods: {
    onSave() {
      const domainName = this.domain;
      const cohortData = {
        name: this.name.value,
        description: this.description.value,
        criteria: this.mergeCriteriaWithSelection(this.criteria.clone(), this.selected),
      };
      this.$store.dispatch("filters/addCohort", { domainName, cohortData });
    },

    onClose() {
      this.name.value = null;
      this.description.value = null;
    },

    nameIsNotEmpty(cohortName) {
      return !!cohortName?.length;
    },

    nameIsNotReserved(cohortName) {
      const domainName = this.domain;
      const existing = this.$store.getters["filters/cohort"](domainName, cohortName);
      return existing == null;
    },

    mergeCriteriaWithSelection(criteria, selected) {
      if (!selected?.length) {
        return criteria;
      } else {
        if (this.domain == "donors") {
          criteria.donor.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == "mris") {
          criteria.mri.referenceId = selected.map(item => item.mriImage.referenceId);
        } else if (this.domain == "tissues") {
          criteria.tissue.referenceId = selected.map(item => item.tissue.referenceId);
        } else if (this.domain == "cells") {
          criteria.cell.referenceId = selected.map(item => item.cellLine.referenceId);
        } else if (this.domain == "organoids") {
          criteria.organoid.referenceId = selected.map(item => item.organoid.referenceId);
        } else if (this.domain == "xenografts") {
          criteria.xenograft.referenceId = selected.map(item => item.xenograft.referenceId);
        } else if (this.domain == "genes") {
          criteria.gene.symbol = selected.map(item => item.symbol);
        } else if (this.domain == "ssms") {
          criteria.ssm.id = selected.map(item => item.id);
        } else if (this.domain == "cnvs") {
          criteria.cnv.id = selected.map(item => item.id);
        } else if (this.domain == "svs") {
          criteria.sv.id = selected.map(item => item.id);
        }
        return criteria;
      }
    }
  }
}
</script>