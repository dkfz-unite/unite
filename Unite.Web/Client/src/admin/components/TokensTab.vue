<template>
  <u-add-token-dialog ref="addTokenDialog" @confirm="onAddedToken"/>
  <!-- <u-extend-token ref="extendTokenDialog" :value="row??row" @confirm="onExtendedToken"/> -->
  <u-extend-token ref="extendTokenDialog" :value="row" @confirm="onExtendedToken"/>


  <div class="col">
    <q-table
            class="u-sticky-header-admin"
            separator="cell"
            row-key="id"
            :rows="rows"
            :columns="columns"
            :pagination="{ rowsPerPage: 20 }"
            @row-click="onRowSelected"
            dense flat bordered
          >
        <template v-slot:body-cell-tokenStatus="props">
            <q-td :props="props">
              <span v-if = "props.row.revokeStatus === 'Revoked'" :class="getExpiryClass(props.row.revokeStatus)">
                {{ props.row.revokeStatus }}
              </span>
              <span v-else = "props.row.tokenExpiryDateStatus === 'Expired'" :class="getExpiryClass(props.row.tokenExpiryDateStatus)">
                {{ props.row.tokenExpiryDateStatus }}
              </span>
            </q-td>
        </template>

        <template v-slot:body-cell-editPermission="props">
            <q-td :props="props">
              <template v-if="props.row.revokeStatus === 'Revoked'">
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-trash"
                  @click= onDeleteToken(props.row)
                  align="right"
                  color="primary"
                />
              </template>
              <template v-else-if = "props.row.tokenExpiryDateStatus === 'Expired'" >
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-calendar-plus"
                  @click= onExtendToken(props.row)
                  align="right"
                  color="primary"
                />
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-trash"
                  @click= onDeleteToken(props.row)
                  align="right"
                  color="primary"
                />
              </template>
              <template v-else>
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-redo-alt"
                  @click= onRevokeToken(props.row)
                  align="right"
                  color="primary"
                />
                <q-btn
                  flat
                  dense
                  size ="sm"
                  icon="las la-trash"
                  @click= onDeleteToken(props.row)
                  align="right"
                  color="primary"
                />
              </template>
            </q-td>
          </template>

          <template v-slot:top>
            <div class="col">
              <div class="row justify-between">
                <div class="col">
                  <div class="q-pt-xs">
                    <span class="text-h6 text-weight-regular">Tokens</span>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="row q-gutter-x-xs items-start">
                    <div class="q-pt-xs">
                      <span class="text-h6 text-weight-regular">Add Token : </span>
                    </div>
                    <div class="u-pt-1">
                      <q-btn
                        icon="las la-plus-circle"
                        @click=onAddToken
                        :loading="loading"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
    </q-table>
  </div>
</template>

<script>
import UPermissionsCell from "./users/PermissionsCell.vue";
import api from "../api/api-tokens";
import UAddTokenDialog from "./workers/AddToken.vue";
import UExtendToken from "./workers/ExtendToken.vue";
import dayjs from "dayjs";

export default {
  components: {
    UPermissionsCell,
    UAddTokenDialog,
    UExtendToken
  },

  // props:{
  //   row: {
  //     type: Object,
  //     default: null
  //   }
  // },

  data() {
    return {
      loading: false,
      selected: [],
      rows: [],
      tokens: [],
      value: null,
      columns: [
          { name: "name", label: "Name", align: "left", field: "name" },
          { name: "description", label: "Description", align: "left", field: "description" },
          { name: "tokenStatus", label: "Token Status", align: "left"},
          { name: "permissions", label: "Permissions", align: "left", field: "permissions" ,
          format: val => Array.isArray(val) ? val.map(access => access.replace("Data.","")).join(", ") : "" },
          { name: "editPermission", label: "Token Actions", align: "left"},
      ]
    }
  },

  computed: {
    canConfirm() {
      return (this.permissions?.length >  0);
    }
  },

  async mounted() {
    this.loadTokens();
  },

  methods: {
    async loadTokens() {
      try {
        this.loadingTokens = true;

        this.tokens = await api.get();
        this.rows = [];
        this.tokens.forEach(element => {
          this.rows.push({
            id: element.id,
            name: element.name,
            description: element.description,
            tokenExpiryDateStatus: element.tokenExpiryDate!==undefined ?
            this.formatExpiryDate(element.tokenExpiryDate) : null,
            tokenExpiryDate: element.tokenExpiryDate,
            permissions: element.permissions,
            revoked: element.revoked,
            revokeStatus: element.revoked ? "Revoked" : ""
          });
        });
      } finally {
        this.loadingTokens = false;
      }
    },

    formatExpiryDate(tokenExpiryDate) {
      const expiry = dayjs(tokenExpiryDate);
      const now = dayjs();
      const diffInMinutes = expiry.diff(now, 'minute');
      const diffInHours = expiry.diff(now, 'hour');
      const diffInDays = expiry.diff(now, 'day');
      
      if (diffInDays >= 1) {
        return `${diffInDays} day(s) remaining`;
      } 
      else if(diffInHours > 0) {
        return `${diffInHours} hour(s) remaining`;
      }
      else if (diffInMinutes > 0) {
        return `${diffInMinutes} min(s) remaining`;
      } 
      else {
        return `Expired`;
      }
    },

    getExpiryClass(value) {
      if (!value || value === 'Expired' || value === 'Revoked') {
        return 'text-negative'; 
      }
      return 'text-positive'; 
    },
  
    async onAddToken() {
      this.$refs.addTokenDialog.show();
    },

    async onAddedToken() {
      await this.loadTokens();
    },

    async onExtendedWorkerToken(expiry) {
      await api.extendToken(expiry);
    },

    async onExtendedToken() {
      await this.loadTokens();
    },

    async onExtendToken() {
      this.$refs.extendTokenDialog.show();
    },

    async onRevokeToken(row) {
      await api.revokeToken(row.id);
      await this.loadTokens();
    },

    async onDeleteToken(row) {
      await api.deleteToken(row.id);
      await this.loadTokens();
    },

    async onRowSelected(event, row, index) {
      if (row == this.row)
        return;
      this.row = row;
      await this.loadTokens();
    }
  }
}
</script>
