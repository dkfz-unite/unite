<template>
  <div class="col q-gutter-xs">
    <div class="row items-center q-gutter-xs">
      <span class="u-label">Name</span>
      <q-input v-if="!extend" v-model="name" @update:modelValue="onUpdate" debounce="500" class="col" label="Name" type="text" maxlength="100" autofocus outlined square dense />
      <span v-else>{{ name }}</span>
    </div>
    <div class="row items-center q-gutter-xs">
      <span class="u-label">Description</span>
      <q-input v-if="!extend" v-model="description" @update:modelValue="onUpdate" debounce="500" class="col" label="Description (optional)" type="text" maxlength="100" outlined square dense />
      <span v-else>{{ description }}</span>
    </div>
    <div class="row items-center q-gutter-xs">
      <span class="u-label">Expiry Time</span>
      <q-input v-model="expiryDays" @update:modelValue="onUpdate" class="col u-input-number" label="Days" type="number" min="1" max="365" outlined square dense />
      <q-input v-model="expiryHours" @update:modelValue="onUpdate" class="col u-input-number" label="Hours" type="number" min="1" max="23" outlined square dense />
      <q-input v-model="expiryMinutes" @update:modelValue="onUpdate" class="col u-input-number" label="Minutes" type="number" min="1" max="59" outlined square dense />
    </div>
    <div class="row items-center q-gutter-xs">
      <span class="u-label">Permissions</span>
      <q-checkbox @update:modelValue="onUpdate" v-model="permissions" val="Data.Read" label="Read" dense disable />
      <q-checkbox @update:modelValue="onUpdate" v-model="permissions" val="Data.Write" label="Write" dense />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Object, null],
      default: () => ({})
    },
    extend: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      name: this.modelValue?.name,
      description: this.modelValue?.description,
      expiryDays: this.modelValue?.expiryDate?.expiryDays || null,
      expiryHours: this.modelValue?.expiryDate?.expiryHours || null,
      expiryMinutes: this.modelValue?.expiryDate?.expiryMinutes || null,
      permissions: this.modelValue?.permissions || ["Data.Read"]
    };
  },

  methods: {
    onUpdate(value) {
      const model = {
        name: this.name,
        description: this.description,
        expiryDate: {
          expiryDays: parseInt(this.expiryDays) || null,
          expiryHours: parseInt(this.expiryHours) || null,
          expiryMinutes: parseInt(this.expiryMinutes) || null
        },
        permissions: this.permissions
      };
      
      this.$emit("update:modelValue", model);
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