<template>
  <u-add-token-dialog ref="addTokenDialog" @created="onAddedToken"/>
  <!-- <u-extend-token ref="extendTokenDialog" :value="row??row" @confirm="onExtendedToken"/> -->
  <u-extend-token ref="extendTokenDialog" :value="row" @confirm="onExtendedToken"/>


  <div class="col">
    <q-table
      class="u-sticky-header-admin"
      separator="cell"
      row-key="id"
      :rows="tokens"
      :columns="columns"
      :pagination="{ rowsPerPage: 20 }"
      dense flat bordered
    >
      <template v-slot:body-cell-tokenStatus="props">
        <q-td :props="props">
          <span v-if="props.row.revoked" class="text-negative">Revoked</span>
          <span v-else-if="isExpired(props.row.expiryDate)" class="text-negative">Expired</span>
          <span v-else class="text-positive">{{ formatExpiryDate(props.row.expiryDate) }}</span>
        </q-td>
      </template>

      <template v-slot:body-cell-editPermission="props">
        <q-td :props="props">
          <q-btn
            v-if="!(isExpired(props.row.expiryDate) || props.row.revoked)"
            align="right" icon="las la-redo-alt" color="primary" size ="sm" flat dense
            @click=onRevokeToken(props.row)
          />
          <q-btn
            v-else-if="isExpired(props.row.expiryDate)"
            align="right" icon="las la-calendar-plus" color="primary" size ="sm" flat dense
            @click=onExtendToken(props.row)
          />
          <q-btn
            align="right" icon="las la-trash" color="negative" size ="sm" flat dense
            @click=onDeleteToken(props.row)
          />
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
                  <span class="text-h6 text-weight-regular">Add</span>
                </div>
                <div class="u-pt-1">
                  <q-btn
                    title="Add Token"
                    icon="las la-plus-circle"
                    :loading="loading"
                    @click=onAddToken
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </q-table>
  </div>

  <!-- Copy pupup should be on the right -->
  <!-- If we start extend token, close the window and then open it again - all values are preserved -->
  <!-- If we have extended token, it's value is preserverd and next time we open the model, the value is shown -->
</template>

<script>
import UPermissionsCell from "./users/PermissionsCell.vue";
import UAddTokenDialog from "./tokens/AddTokenDialog.vue";
import UExtendToken from "./tokens/ExtendTokenDialog.vue";

import dayjs from "dayjs";
import api from "../api/api-tokens";

export default {
  components: {
    UPermissionsCell,
    UAddTokenDialog,
    UExtendToken
  },


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
        this.loading = true;
        this.tokens = await api.get();
      } finally {
        this.loading = false;
      }
    },

    formatExpiryDate(expiryDate) {
      const expiry = dayjs(expiryDate);
      const now = dayjs();
      const diffInMinutes = expiry.diff(now, "minute");
      const diffInHours = expiry.diff(now, "hour");
      const diffInDays = expiry.diff(now, "day");
      
      if (diffInDays >= 1) { // Why >= 1 not > 0?
        return `${diffInDays} day(s) remaining`;
      } 
      else if(diffInHours > 0) {
        return `${diffInHours} hour(s) remaining`;
      }
      else if (diffInMinutes > 0) {
        return `${diffInMinutes} min(s) remaining`;
      } 
      else {
        return null;
      }
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

    isExpired(date) {
      return dayjs(date).isBefore(dayjs());
    }
  }
}
</script>

<style lang="scss" scoped>
.u-pt-1 {
  padding-top: 1px;
}
</style>