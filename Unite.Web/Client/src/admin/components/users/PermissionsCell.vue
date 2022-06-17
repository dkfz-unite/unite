<template>
  <span v-for="group in permissionGroups" :key="group.name" class="text-weight-medium">
    {{group.name}} <span class="text-weight-regular text-italic">({{group.values.join(', ')}}) </span>
  </span>
</template>

<script>
export default {
  props: {
    permissions: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    permissionGroups() {
      return this.getPermissionGroups(this.permissions);
    }
  },

  methods: {
    getPermissionGroups(permissions) {
      return permissions?.reduce((groups, permission) => {
        var blocks = permission.split(".");
        var group = groups.find(grp => grp.name == blocks[0]);
        if (!group) {
          group = { name: blocks[0], values: [] };
          groups.push(group);
        }
        group.values.push(blocks[1]);
        return groups;
      }, []);
    }
  }
}
</script>