<template>
  <u-add-worker-token-dialog ref="addTokenDialog" :value="row??row" @confirm="onAddedToken" />
  <u-update-worker-permission-dialog ref="updateWorkerPermissionDialog" :value="row??row" @confirm="onUpdatedToken" />
  <u-extend-worker-token ref="extendWorkerTokenDialog" :value="row??row" @confirm="onExtendedWorkerToken" />
      
  <div>

  </div>
      <div class="row q-col-gutter-xs">
        <div >
          <q-table
            class="u-sticky-header-admin"
            separator="cell"
            row-key="id"
            :rows="rows"
            :columns="columns"
            :pagination="{ rowsPerPage: 20 }"
            :loading="loadingWorkers"
            @row-click="onRowSelected"
            dense flat bordered
          >
          <template v-slot:body-cell-tokenActions="props">
            <q-td :props="props">
              <template v-if = "props.row.token !== undefined">
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-copy"
                  @click= copyToClipboard(props.row.token)
                  color="primary"
                />
              </template>
              <template v-else>
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-plus"
                  @click= onAddToken
                  color="green"
                  />
              </template>
            </q-td>
          </template>
          <template v-slot:body-cell-addPermission="props">
            <q-td :props="props">
              <template v-if = "props.row.permissions !== undefined">
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-edit"
                  @click= onUpdateToken(props.row)
                  align="right"
                  color="primary"
                />
              </template>
            </q-td>
          </template>
          <template v-slot:body-cell-extendToken="props">
            <q-td :props="props">
              <template v-if = "props.row.token !== undefined">
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-calendar-plus"
                  @click= onExtendWorkerToken(props.row)
                  align="right"
                  color="primary"
                />
              </template>
              <template v-else>
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-calendar-plus"
                  @click= onAddToken
                  color="grey"
                  disable
                  />
              </template>
            </q-td>
          </template>
          </q-table>
        </div>
      </div>
  </template>
  
  <script>
  
  
  import api from "../api/api-workers";
  // import UAddWorker from "./workers/AddWorker.vue";
  import UAddWorkerTokenDialog from "./workers/AddWorkerToken.vue";
  import UUpdateWorkerPermissionDialog from "./workers/UpdateWorkerPermission.vue";
  import UExtendWorkerToken from "./workers/ExtendWorkerToken.vue";
  // import dayjs from "dayjs";
  
  export default {
    components: {
      UAddWorkerTokenDialog,
      UUpdateWorkerPermissionDialog,
      UExtendWorkerToken
     },
  
    setup() {
      return {
    
      };
    },
  
    data() {
      return {
        loadingWorkers: false,
        loadingSubmission: false,
        worker: null,
        row: null,
        rows: [],
        columns: [
          // { name: "id", label: "Id", align: "left", field: "id" },
          { name: "name", label: "Name", align: "left", field: "name" },
          { name: "description", label: "Description", align: "left", field: "description" },
          { name: "tokenExpiryDate", label: "TokenExpiryDate", align: "left", field: "tokenExpiryDate" },
          { name: "permissions", label: "Permissions", align: "left", field: "permissions" ,
            format: val => Array.isArray(val) ? val.map(access => access.replace("Data.","")).join(", ") : "" },
          { name: "tokenActions", label: "Token", align: "left"},
          { name: "addPermission", label: "Edit Permission", align: "left"},
          { name: "extendToken", label: "Extend Token", align: "left"}

        ]
      };
    },
  
    mounted() {
      this.loadWorkers();    
    },
  
    methods: {
      async loadWorkers() 
      {
        try {
          this.loadingWorkers = true;
          this.rows = await api.get();
          this.worker = null;
        } finally {
          this.loadingWorkers = false;
        }
      },
      copyToClipboard(value) 
      {
        // const expiryDate = "2025-07-30T12:47:32.308458Z"
        // const daysLeft = dayjs(expiryDate).diff(dayjs(), 'day')
        // alert(`Token expires in ${daysLeft} days`);
        navigator.clipboard.writeText(value)
          .then(() => {
            this.$q.notify({ type: 'positive', message: 'Token copied to clipboard!' })
          })
          .catch(() => {
            this.$q.notify({ type: 'negative', message: 'Failed to copy token.' })
          })
        },
        async onAddToken()
        {
          this.$refs.addTokenDialog.show();
        },
        async onUpdateToken(row)
        {
          this.$refs.updateWorkerPermissionDialog.show();
        },
        async onExtendWorkerToken(row)
        {
          this.$refs.extendWorkerTokenDialog.show();
        },
        async onRowSelected(event, row, index)
        {
          if (row == this.row)
            return;
          this.row = row;
          await this.loadWorkers();
        },
        async onAddedToken(expiry)
        {
          await this.addToken(expiry);
        },
        async onUpdatedToken(permissions)
        {
          const worker = {
            name: this.row.name ? this.row.name : null,
            description: this.row.description ? this.row.description : null,
            permissions: permissions ? permissions : null,
          };
          await api.updateWorkerPermissions(this.row.id, worker);
          await this.loadWorkers();
          this.notifySuccess(`Permissions for '${this.row.name}' were updated successfully.`);
        },
        async addToken(expiry)
        {
          console.log("row", this.row);

          await api.addWorkerToken(this.row.id, expiry);
          await this.loadWorkers();
          this.notifySuccess(`Token for '${this.row.name}' was added successfully.`);
        },
        notifySuccess(message, caption = undefined)
        {
          this.$q.notify({
          type: "positive",
          position: "bottom-right",
          timeout: 3000,
          message: message,
          caption: caption
        });
      },
    }
  };
  </script>
  