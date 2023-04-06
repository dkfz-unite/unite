<template>
  <div class="col">
    <q-table title="Users" :loading="loading" :rows="rows" :columns="columns" :pagination="{ rowsPerPage: 15 }" 
      row-key="id" separator="cell" class="u-sticky-header-admin" flat bordered dense>
      <template v-slot:body-cell-permissions="props">
        <q-td :props="props">
          <u-permissions-cell :permissions="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row items-center">
            <q-btn label="Delete" title="Delete" icon="las la-trash" color="orange" size="sm" align="left"
              class="q-pl-none" dense no-caps flat @click="deleteUser(props.value)" />
          </div>
        </q-td>
      </template>

      <template v-slot:top>
        <div class="col">
          <div class="row justify-between">
            <div class="col">
              <div class="q-pt-xs">
                <span class="text-h6 text-weight-regular">Users</span>
              </div>
            </div>
            <div class="col-auto">
              <u-user-add-form @submit="onAddUser" />
            </div>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import UUserAddForm from "./users/UserAddForm.vue";
import UPermissionsCell from "./users/PermissionsCell.vue";
import api from "../api/api-users";

export default {
  components: {
    UUserAddForm,
    UPermissionsCell
  },

  data() {
    return {
      loading: false,
      selected: [],
      rows: [],
      columns: [
        {
          name: "email",
          label: "Email",
          field: row => row.email,
          align: "left",
          sortable: true
        },
        {
          name: "registered",
          label: "Registered",
          field: row => this.$helpers.content.toBooleanString(row.isRegistered),
          align: "left",
          sortable: true
        },
        {
          name: "permissions",
          label: "Permissions",
          field: row => row.permissions,
          align: "left",
          sortable: false
        },
        {
          name: "actions",
          label: "Actions",
          field: row => row.id,
          align: "left",
          style: "width: 90px",
          sortable: false
        }
      ]
    }
  },

  async mounted() {
    await this.loadUsers();
  },

  methods: {
    async onAddUser() {
      await this.loadUsers();
    },

    async loadUsers() {
      try {
        this.loading = true;
        this.rows = [];
        this.rows = await api.search();
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id) {
      try {
        this.loading = true;
        await api.remove(id);
        await this.loadUsers();
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
