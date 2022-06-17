<template>
  <div class="row">
    <div class="col-12 col-md-1 col-sm-2">
      <q-tabs vertical dense v-model="tab" indicator-color="transparent" active-color="primary" no-caps>
        <q-tab label="Users" name="users" />
        <q-tab label="Other" name="roles" />
      </q-tabs>
    </div>
    <div class="col-12 col-md-11 col-sm-10">
      <q-tab-panels v-model="tab">
        <q-tab-panel class="q-py-xs" name="users">
          <div class="col">
            <u-users-tab />
          </div>
        </q-tab-panel>
        <q-tab-panel class="q-py-xs" name="roles">
          <div class="col">
           <u-roles-tab />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import UUsersTab from "./components/UsersTab.vue";
import URolesTab from "./components/RolesTab.vue";
import tabPageMixin from "./tab-page-mixin";

export default {
  components: {
    UUsersTab,
    URolesTab
  },

  mixins: [tabPageMixin]
}
</script>

<style lang="scss">
@import '../styles/quasar.variables.scss';

.u-sticky-header-admin{
  @media screen and (min-width: $breakpoint-sm){
    height: 610px;
  }

  @media screen and (min-width: $breakpoint-md){
    height: 610px;
  }

  @media screen and (min-width: $breakpoint-lg){
    height: 790px;
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    background-color: #ffff;
  }

  thead tr th{
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th{
    top: 0;
  }
}
</style>