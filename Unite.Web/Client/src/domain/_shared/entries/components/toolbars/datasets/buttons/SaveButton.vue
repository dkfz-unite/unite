<template>
  <q-dialog 
    v-model="showDialog" 
    @keyup.esc="showDialog = false"
    @keyup.enter="canSave && onSave()"
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
          autofocus square outlined dense
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
          @click="onCancel" 
          dense flat no-caps
        />

        <q-btn 
          label="Save" 
          :disable="!canSave" 
          @click="onSave"
          dense flat no-caps
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
import Dataset from "@/datasets/store/models/dataset";
import { mapActions } from "vuex";

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
    ...mapActions("datasets", ["addOne"]),

    onSave() {
      const dataset = new Dataset();
      dataset.userId = this.$store.getters["identity/account"].email;
      dataset.name = this.name.value;
      dataset.description = this.description.value;
      dataset.domain = this.domain;
      dataset.date = new Date();
      dataset.criteria = this.mergeCriteriaWithSelection(this.criteria, this.selected).toSearchCriteria();
            
      this.addOne(dataset);
      this.showDialog = false;
    },

    onCancel() {
      this.showDialog = false;
    },

    onClose() {
      this.name.value = null;
      this.description.value = null;
    },

    nameIsNotEmpty(name) {
      return name?.length > 0;
    },

    nameIsNotReserved(name) {
      const existing = this.$store.getters[`${this.domain}/datasets`]?.some(dataset => dataset.name == name);
      return existing == false;
    },

    mergeCriteriaWithSelection(criteria, selected) {
      var clone = criteria.clone();

      if (!selected?.length) {
        return clone;
      } else {
        if (this.domain == Settings.donors.domain) {
          clone.donor.referenceId = selected.map(item => item.referenceId);
        } else if (this.domain == Settings.mrs.domain) {
          clone.mr.referenceId = selected.map(item => item.referenceId);
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
        } else if (this.domain == Settings.sms.domain) {
          clone.sm.id = selected.map(item => item.id);
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