<template>
  <q-drawer :model-value="true" bordered elevated>
    <div class="col-12 col-md-1 col-sm-2">
      <q-tabs vertical dense v-model="tab" indicator-color="transparent" active-color="primary" no-caps>
        <q-tab label="Users" name="users" />
        <q-tab label="Tasks" name="tasks" />
      </q-tabs>
    </div>
  </q-drawer>

  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Admin" />
        <q-breadcrumbs-el :label="tabLabel" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <q-tab-panels v-model="tab">
          <q-tab-panel name="users" class="q-ma-none q-pa-none">
            <u-users-tab />
          </q-tab-panel>
          <q-tab-panel name="tasks" class="q-ma-none q-pa-none">
            <u-tasks-tab />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import UUsersTab from "./components/UsersTab.vue";
import UTasksTab from "./components/TasksTab.vue";
import tabPageMixin from "./tab-page-mixin";

export default {
  components: {
    UUsersTab,
    UTasksTab
  },

  mixins: [tabPageMixin],

  computed: {
    tabLabel() {
      return this.tab == "users" ? "Users"
           : this.tab == "tasks" ? "Tasks"
           : this.tab;
    }
  }
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