<template>
  <q-dialog 
    v-model="showDialog" 
    @keyup.esc="showDialog = false" 
    @hide="onClose"
    persistent>

    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Save as dataset</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <q-input 
          label="Name"
          placeholder="Enter dataset name"
          type="text" 
          v-model="name.value" 
          :rules="name.rules" 
          square outlined dense
        />

        <q-input 
          label="Description (optional)"
          placeholder="Enter dataset description"
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
    title="Save as dataset" 
    icon="las la-save"
    color="secondary"
    @click="showDialog=true"
    dense flat no-caps 
  />
</template>

<script>
import Settings from "@/_settings/settings";

export default {
  inject: ["domain"],

  data() {
    return {
      showDialog: false,

      name: {
        value: null,
        rules: [
          (val) => this.nameIsNotEmpty(val) || "Please, enter dataset name",
          (val) => this.nameIsNotReserved(val) || "Dataset with given name already exists"
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
      const datasetData = {
        name: this.name.value,
        date: new Date(),
        description: this.description.value,
        criteria: this.mergeCriteriaWithSelection(this.criteria, this.selected),
      };

      console.log(datasetData.criteria);
      
      this.$store.dispatch(`${domainName}/addDataset`, datasetData);
    },

    onClose() {
      this.name.value = null;
      this.description.value = null;
    },

    nameIsNotEmpty(name) {
      return name?.length > 0;
    },

    nameIsNotReserved(name) {
      const existing = this.$store.state[this.domain].datasets?.some(dataset => dataset.name == name);
      return existing == false;
    },

    mergeCriteriaWithSelection(criteria, selected) {
      var clone = criteria.clone();

      if (!selected?.length) {
        return clone;
      } else {
        if (this.domain == Settings.donors.domain) {
          clone.donor.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.mris.domain) {
          clone.mri.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.materials.domain) {
          clone.material.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.lines.domain) {
          clone.line.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.organoids.domain) {
          clone.organoid.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.xenografts.domain) {
          clone.xenograft.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.genes.domain) {
          clone.gene.symbol = selected.map(item => item.symbol);
        } else if (this.domain == Settings.ssms.domain) {
          clone.ssm.id = selected.map(item => item.id);
        } else if (this.domain == Settings.cnvs.domain) {
          clone.cnv.id = selected.map(item => item.id);
        } else if (this.domain == Settings.svs.domain) {
          clone.sv.id = selected.map(item => item.id);
        }

        return clone;
      }
    }
  }
}
</script>