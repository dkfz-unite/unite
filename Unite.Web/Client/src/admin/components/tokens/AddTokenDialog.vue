<template>
    <q-dialog
      v-model="dialog"
      @keyup.esc="onClose"
      @keyup.enter="canConfirm && onConfirm()">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Token</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- Token creation -->
          <template v-if="!value">
            <div class="col q-gutter-xs">
              <div class="row items-center q-gutter-xs">
                <span class="u-label">Name</span>
                <q-input v-model="name" class="col" label="Name" type="text" maxlength="100" autofocus outlined square dense />
              </div>
              <div class="row items-center q-gutter-xs">
                <span class="u-label">Description</span>
                <q-input v-model="description" class="col" label="Description (optional)" type="text" maxlength="100" outlined square dense />
              </div>
              <div class="row items-center q-gutter-xs">
                <span class="u-label">Expiry Time</span>
                <q-input v-model="exDays" class="col u-input-number" label="Days" type="number" min="1" max="365" outlined square dense />
                <q-input v-model="exHours" class="col u-input-number" label="Hours" type="number" min="1" max="23" outlined square dense />
                <q-input v-model="exMinutes" class="col u-input-number" label="Minutes" type="number" min="1" max="59" outlined square dense />
              </div>
              <div class="row items-center q-gutter-xs">
                <span class="u-label">Permissions</span>
                <q-checkbox v-model="permissions" val="Data.Read" label="Data.Read" dense disable />
                <q-checkbox v-model="permissions" val="Data.Write" label="Data.Write" dense />
              </div>
            </div>
          </template>

          <!-- Token created -->
          <template v-else>
            <u-token-view :value="value" message="Token created successfully!" />
          </template>
        </q-card-section>
  
        <q-separator />

        <q-card-actions align="right">
          <!-- Token creation -->
          <template v-if="!value">
            <q-btn label="Cancel" @click="onClose" dense flat no-caps />
            <q-btn label="Confirm" @click="onConfirm" :disable="!canConfirm" dense flat no-caps />
          </template>
          
          <!-- Token created -->
          <template v-else>
            <q-btn label="Close" @click="onClose" dense flat no-caps/>
          </template>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

<script>
import UTokenView from "./TokenView.vue";
import api from "../../api/api-tokens";

export default {
  components: {
    UTokenView
  },

  props: {
    value: Object
  },

  emits: ["created"],

  data() {
    return {
      dialog: false,

      name: null,
      description: null,
      exDays: null,
      exHours: null,
      exMinutes: null,
      permissions: ["Data.Read"],
      
      value : null
    }
  },

  computed: {
    canConfirm() {
      return this.name?.length > 0 && (this.exMinutes?.length > 0 || this.exHours?.length > 0 || this.exDays?.length > 0);
    }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    async onConfirm() {
      const expiryDate = {
        expiryDays: this.exDays ? parseInt(this.exDays) : null,
        expiryHours: this.exHours ? parseInt(this.exHours) : null,
        expiryMinutes: this.exMinutes ? parseInt(this.exMinutes) : null
      }

      const token = {
        name: this.name,
        description: this.description,
        permissions: this.permissions,
        expiryDate: expiryDate
      };

      this.value = await api.addToken(token);
      this.clear();
      this.$emit("created");
    },

    onClose() {
      this.dialog = false;
      this.value = null;
      this.clear();
    },

    clear() {
      this.name = null;
      this.description = null;
      this.exDays = null;
      this.exHours = null;
      this.exMinutes = null;
      this.permissions = ["Data.Read"];
    }
  }
}
</script>

<style lang="scss" scoped>
.u-label {
  width: 80px;
}

.u-input-number {
  width: 100px;
}
</style>