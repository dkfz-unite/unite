<template>
  <u-users-import-dialog ref="importDialog" @imported="loadUsers" />

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
            <div class="col-auto q-ml-lg u-pt-1">
              <div class="row items-start q-gutter-x-xs">
                <q-btn label="Import" title="Import users from TSV or CSV file" icon="las la-file-import"
                  no-caps @click="$refs.importDialog.show()" />
                <q-btn label="Export" title="Export users to TSV or CSV file" icon="las la-file-export"
                  :disable="!rows.length" no-caps>
                  <q-menu>
                    <q-list>
                      <q-item @click="exportUsers('tsv')" clickable v-close-popup dense>
                        <q-item-section>TSV</q-item-section>
                      </q-item>
                      <q-item @click="exportUsers('csv')" clickable v-close-popup dense>
                        <q-item-section>CSV</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile } from "quasar";
import UUserAddForm from "./users/UserAddForm.vue";
import UUsersImportDialog from "./users/UsersImportDialog.vue";
import UPermissionsCell from "./users/PermissionsCell.vue";
import { getMimeType, writeUsers } from "./users/users-file";
import api from "../api/api-users";
import { mapState } from "vuex";

export default {
  components: {
    UUserAddForm,
    UUsersImportDialog,
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
          name: "active",
          label: "Active",
          field: row => this.$helpers.content.toBooleanString(row.isActive),
          align: "left",
          sortable: true
        },
        {
          name: 'provider',
          label: 'Provider',
          field: row => row.provider,
          align: 'left',
          sortable: false
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

  computed: {
    ...mapState("identity", ["providers"]),
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

    exportUsers(format) {
      const content = writeUsers(this.rows, format, this.providers);
      exportFile(`users.${format}`, content, { mimeType: getMimeType(format) });
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

<style lang="scss" scoped>
.u-pt-1 {
  padding-top: 1px;
}
</style>
