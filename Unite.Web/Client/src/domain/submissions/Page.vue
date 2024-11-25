<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.submissions.title" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col items-end">
        <div class="row">
          <span class="text-subtitle1">Check Submission Status</span>
        </div>

        <div class="row items-center q-gutter-x-sm">
          <q-input label="Submission Id" v-model="submission" style="width: 200px;" autofocus clearable dense @clear="onClear" />
          <q-btn label="Check" color="primary" :disable="!canCheck" dense flat no-caps @click="onCheck" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div v-if="status" class="row">
          <u-status-point title="Submitted" color="green" :line="false" />
          <u-status-point title="Review" color="green" />
          <u-status-point v-if="status == 'Preparing'" title="Processed" color="grey" />
          <u-status-point v-if="status == 'Prepared'" title="Approved" color="green" />
          <u-status-point v-if="status == 'Rejected'" title="Rejected" color="red" />
        </div>
      </div>
    </div>

    <div class="row" v-if="status == 'Rejected'">
      Reason: {{ task.comment }}
    </div>
  </div>
</template>

<script>
import UStatusPoint from "./components/StatusPoint.vue";

import Settings from "@/_settings/settings";
import api from "./api";

export default {
  components: {
    UStatusPoint
  },

  setup() {
    return {
      Settings
    }
  },

  data() {
    return {
      submission: null,
      status: null,
    }
  },

  computed: {
    canCheck() {
      return this.submission?.length > 0;
    }
  },

  methods: {
    async onCheck() {
      this.status = await api.getStatus(this.submission);
    },

    onClear() {
      this.status = null;
    }
  }
}
</script>
