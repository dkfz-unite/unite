<template>
  <q-btn-dropdown :label="`Permissions (${permissionsSelected}/${permissionsTotal})`" no-caps>
    <q-list dense>
      <q-item v-for="permission in Object.keys(permissions)" :key="permission" dense>
        <q-item-section>
          <q-checkbox
            v-model="permissions[permission]"
            :label="permission"
            :disable="permission == 'Data.Read'"
            @click="onUpdate"
            dense />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      default: null
    }
  },

  emits: ["update:modelValue"],

  data() {
    return {
      permissions: this.mapPermissionsFromArray(this.modelValue),
    }
  },

  watch: {
    modelValue(value) {
      this.permissions = this.mapPermissionsFromArray(value);
    }
  },

  computed: {
    permissionsSelected() {
      return Object.keys(this.permissions)
        .filter(key => this.permissions[key]).length;
    },

    permissionsTotal() {
      return Object.keys(this.permissions).length;
    }
  },

  methods: {
    mapPermissionsFromArray(permissionsArray) {
      return {
        "Data.Read": true,
        "Data.Write": permissionsArray?.includes("Data.Write") == true
      }
    },

    mapPermissionsToArray(permissions) {
      return Object.keys(permissions)
        .filter(key => permissions[key])
        .map(key => key);
    },
    
    onUpdate(value) {
      this.$emit("update:modelValue", this.mapPermissionsToArray(this.permissions));
    }
  }
}
</script>