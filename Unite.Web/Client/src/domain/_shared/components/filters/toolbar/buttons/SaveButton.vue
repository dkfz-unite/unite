<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="dialog = false"
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Save filters</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <q-input
          label="Name"
          type="text"
          v-model="name.value"
          :rules="name.rules"
          lazy-rules
          square outlined dense
        />

        <q-input
          label="Description (optional)"
          type="text"
          v-model="description.value"
          autogrow
          square outlined dense
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          label="Cancel" 
          dense flat no-caps 
          v-close-popup 
        />

        <q-btn 
          label="Save" 
          :disable="!canSave" 
          @click="onSave" 
          dense flat no-caps 
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-btn
    v-if="criteria?.numberOfFilters || selected?.length"
    label="Save"
    title="Save filters"
    icon="las la-save"
    color="primary"
    dense flat no-caps 
    @click="dialog = true">
  </q-btn>
</template>

<script>
import cohortsStorage from "../../../../../../filters/services/cohorts-storage";

export default {
  emits: ["save"],

  inject: ["domain", "identity"],

  data() {
    return {
      dialog: false,

      name: {
        value: null,
        rules: [
          (val) => !!val || "Please, enter preset name",
          (val) => this.nameIsUnique(this.domain, val) || "Preset with given name already exists"
        ]
      },

      description: {
        value: null
      }
    };
  },

  computed: {
    criteria() {
      return this.$store.state[this.domain].filtersCriteria;
    },

    selected() {
      return this.$store.state[this.domain].selected;
    },

    mergedCriteria() {
      const criteria = this.criteria.clone();

      if (this.selected?.length) {
        if (this.domain == "donors") {
          criteria.donorFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "tissues") {
          criteria.tissueFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "cells") {
          criteria.cellFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "organoids") {
          criteria.organoidFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "xenografts") {
          criteria.xenograftFiltersCriteria.referenceId = this.selected.map(item => item.referenceId);
        } else if (this.domain == "genes") {
          criteria.geneFiltersCriteria.symbol = this.selected.map(item => item.symbol);
        } else if (this.domain == "ssms") {
          criteria.mutationFiltersCriteria.code = this.selected.map(item => item.id);
        } else if (this.domain == "cnvs") {
          criteria.copyNumberVariantFiltersCriteria.code = this.selected.map(item => item.id);
        } else if (this.domain == "svs") {
          criteria.structuralVariantFiltersCriteria.code = this.selected.map(item => item.id);
        }
      }

      return criteria;
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
      const cohort = {
        domain: this.domain,
        name: this.name.value,
        description: this.description.value,
        criteria: this.mergedCriteria
      };

      cohortsStorage.saveCohort(this.identity, cohort);
      
      this.$emit("save");
    },

    onClose() {
      this.name.value = null;
      this.description.value = null;
    },

    nameIsUnique(domain, cohort) {
      return cohortsStorage.canSaveCohort(this.identity, domain, cohort);
    }
  }
}
</script>