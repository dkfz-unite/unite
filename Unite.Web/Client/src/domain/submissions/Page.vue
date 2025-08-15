<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.submissions.title" />
      </q-breadcrumbs>
    </div>

    <div v-if="$q.screen.gt.md" class="row justify-center">
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>

    <div class="row justify-center">
      <div class="col-4">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">Track submission</div>
          </q-card-section>

          <template v-if="!error&&!status">
            <q-card-section>
              <div class="col">
                <div class="row">
                  <div class="col">
                    <q-input label="Submission Id" v-model="submission" autofocus clearable dense outlined @clear="onClear" />
                    <br />
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
              <q-btn label="Check" color="primary" :disable="!canCheck" flat no-caps @click="onCheck" />
            </q-card-actions>
          </template>

          <template v-else>
            <q-card-selection v-if="error">
              <div style="color: red;" align="center">Submission {{submission}} not found</div>
            </q-card-selection>
            <q-card-section v-else>
              <div class="col q-gutter-sm">
                <div class="row">
                  <span>
                    <span class="text-grey-8">Submission: </span>
                    <span class="text-bold">{{ submission }}</span>
                  </span>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="row">
                      <u-status-point title="Submitted" color="blue" :line="false" />
                      <u-status-point title="In Review" color="blue" />
                      <u-status-point v-if="status == 'Preparing'" title="Processed" color="blue" />
                      <u-status-point v-else-if="status == 'Prepared'" title="Approved" color="blue" />
                      <u-status-point v-else-if="status == 'Rejected'" title="Rejected" color="red" />
                      <u-status-point v-else title="Completed" color="grey" />
                    </div>
                  </div>
                </div>

                <div v-if="comment" class="row">
                  <span>
                    <span class="text-grey-8">Reason: </span>
                    <span>{{ comment }}</span>
                  </span>
                </div>
              </div>
            </q-card-section>

            <q-separator/>

            <q-card-actions align="right">
              <q-btn label="Refresh" color="primary" flat no-caps @click="onClear" />
            </q-card-actions>
          </template>
        </q-card>
      </div>
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
      comment: null,
      error: null
    }
  },

  computed: {
    canCheck() {
      return this.submission?.length > 0;
    }
  },

  methods: {
    async onCheck() {
      const response = await api.getStatus(this.submission);
      if (response) {
        this.status = response.status;
        this.comment = response.comment;
      } 
      else {
        this.error = true;
      }
    },

    async onClear() {
      this.submission = null;
      this.status = null;
      this.comment = null;
      this.error = null;
    }
  }
}
</script>
