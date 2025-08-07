<template>
  <q-dialog
    v-model="dialog"
    @keyup.esc="onClose"
    @keyup.enter="canConfirm && onConfirm()">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">Extend Token</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!-- Token extension -->
        <template v-if="!value">
          <u-token-form v-model="model" :extend="true" />
        </template>

        <!-- Token extended -->
        <template v-else>
          <u-token-view :value="value" message="Token extended successfully!" />
        </template>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <!-- Token extension -->
        <template v-if="!value">
          <q-btn label="Cancel" @click="onClose" dense flat no-caps />
          <q-btn label="Confirm" @click="onConfirm" :disable="!canConfirm" dense flat no-caps />
        </template>
        
        <!-- Token extended -->
        <template v-else>
          <q-btn label="Close" @click="onClose" dense flat no-caps/>
        </template>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import UTokenForm from "./TokenForm.vue";
import UTokenView from "./TokenView.vue";
import api from "../../api/api-tokens";

export default {
  components: {
    UTokenForm,
    UTokenView
  },

  emits: ["updated"],

  data() {
    return {
      dialog: false,
      
      id: null,
      model: null,
      value : null
    }
  },

  computed: {
    canConfirm() {
      return this.model?.name?.length > 0 && 
             (this.model?.expiryDate?.expiryDays > 0 || 
              this.model?.expiryDate?.expiryHours > 0 || 
              this.model?.expiryDate?.expiryMinutes > 0);
    }
  },

  methods: {
    show(id, model) {
      this.id = id;
      this.model = model;

      this.dialog = true;
    },

    async onConfirm() {
      this.value = await api.extendToken(this.id, this.model);
      this.clear();
      this.$emit("updated");
    },

    onClose() {
      this.dialog = false;
      this.value = null;
      this.clear();
    },

    clear() {
      this.id = null;
      this.model = null;
    }
  }
}
</script>