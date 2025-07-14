<template>
  <u-add-token-dialog ref="addTokenDialog" :value="row?.id" @confirm="onAddedToken" />
      
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
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <template v-if = "props.row.token !== undefined">
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-copy"
                  @click= copyToClipboard(props.row.token)
                  label="Copy"
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
                  label="Add Token"
                  color="green"
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
  import UAddTokenDialog from "./workers/AddWorkerToken.vue";
  import * as dayjs from 'dayjs'
  // import relativeTime from 'dayjs/plugin/relativeTime'
  
  export default {
    components: {
      UAddTokenDialog
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
          // "Id", "Name", "Description", "Token", "TokenExpiryDate"
          { name: "id", label: "Id", align: "left", field: "id" },
          { name: "name", label: "Name", align: "left", field: "name" },
          { name: "description", label: "Description", align: "left", field: "description" },
          { name: "tokenExpiryDate", label: "TokenExpiryDate", align: "left", field: "tokenExpiryDate" },
          { name: "permissions", label: "Permissions", align: "left", field: "permissions" ,
            format: val => Array.isArray(val) ? val.map(access => access.replace("Data.","")).join(", ") : "" },
          { name: "actions", label: "Token", align: "left"},
          { name: "actions", label: "Edit Permissions", align: "left"},
          { name: "actions", label: "Extend Token", align: "left"},

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
        async addToken(expiry)
        {
          console.log("Token added", expiry);

          const id = this.row.id;
          console.log("Id", id);

          await api.addToken(id, expiry);
          await this.loadWorkers();
          this.notifySuccess(`Token '${id}' was added successfully.`);
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
  