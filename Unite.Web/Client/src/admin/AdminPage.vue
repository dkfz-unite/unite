<template>
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
        <q-separator />
        <q-tabs v-model="tab" dense align="left">
          <q-tab label="Users" icon="las la-user" name="users" />
          <q-tab label="Tasks" icon="las la-tasks" name="tasks" />
          <q-tab label="Workers" icon="las la-key" name="workers" />
          <q-tab label="Submissions" icon="las la-file-alt" name="submissions" />
        </q-tabs>
        <q-separator />
      </div>
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
          <q-tab-panel name="workers" class="q-ma-none q-pa-none">
            <u-workers-tab />
          </q-tab-panel>
          <q-tab-panel name="submissions" class="q-ma-none q-pa-none">
            <u-submissions-tab />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import UUsersTab from "./components/UsersTab.vue";
import UTasksTab from "./components/TasksTab.vue";
import USubmissionsTab from "./components/SubmissionsTab.vue";
import UWorkersTab from "./components/WorkersTab.vue";
import tabPageMixin from "./tab-page-mixin";

export default {
  components: {
    UUsersTab,
    UTasksTab,
    USubmissionsTab,
    UWorkersTab
  },

  mixins: [tabPageMixin],

  computed: {
    tabLabel() {
      return this.tab == "users" ? "Users"
           : this.tab == "tasks" ? "Tasks"
           : this.tab == "submissions" ? "Submissions"
           :this.tab == "workers" ? "Workers"
           : this.tab;
    }
  }
}
</script>

<style lang="scss">
@import '../styles/quasar.variables.scss';

.u-sticky-header-admin{
  @media screen and (min-width: $breakpoint-sm){
    height: 530px;
  }

  @media screen and (min-width: $breakpoint-md){
    height: 530px;
  }

  @media screen and (min-width: $breakpoint-lg){
    height: 710px;
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