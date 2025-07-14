<template>
    <q-dialog
      v-model="dialog"
      @keyup.esc="onClose"
      @keyup.enter="canConfirm && onConfirm()">
      <q-card>
        <q-card-section style="width: 500px;">
          <div class="text-h5">Extend token for {{ value?.name }}</div>
        </q-card-section>

        <q-card-section style="width: 500px;">
          <div class="text-h7">Description : {{ value?.name }}</div>
          <div class="text-h7">TokenExpiryDate : {{ value?.tokenExpiryDate?.slice(0,10) }}</div>
          <div class="text-h7">Permissions : {{ displayPermissions }}</div>
        </q-card-section>
  
        <q-card-section class="q-gutter-y-sm">
          <div>
            <q-input v-model="permissions" label="Enter date" autofocus dense />
          </div>
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn label="Cancel" @click="onClose" dense flat no-caps />
          <q-btn label="Confirm" :disable="!canConfirm" @click="onConfirm" dense flat no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

<script>
export default {
  props: {
    value: Object,
  },

  data() {
    return {
      dialog: false,
      permissions : null
    }
  },

  computed: {
    canConfirm() {
      return (this.permissions?.length >  0);
    },
    displayPermissions(){
      console.log("permissions", this.value?.permissions);
        const permissions = this.value?.permissions;
        
        if (Array.isArray(permissions)) {
          return permissions.map(access => access.replace("Data.", "")).join(", ");
        }
        return "";
      }
  },

  methods: {
    show() {
      this.dialog = true;
    },

    hide() {
      this.onClose();
    },

    onClose() {
      this.reason = null;
      this.dialog = false;
    },

    onConfirm() {
      const formattedPermissions = this.formatPermissions(this.permissions);
      const addedPermissions =  this.formattedPermissions ? this.formattedPermissions : null;

      this.$emit("confirm", addedPermissions);
      this.expiry = null;
      this.dialog = false;
    },
    formatPermissions(permissions)
    {
        if (permissions != null && permissions.length > 0) {
          return permissions.map(access => "Data." + access);
        }
        return "";
      }
  }
}
</script>