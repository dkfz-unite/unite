<template>
  <u-reject-dialog ref="rejectDialog" @confirm="onRejected" />

  <div class="col">
    <div class="row q-col-gutter-xs">
      <!-- Left -->
      <div class="col-3">
        <q-table
          class="u-sticky-header-admin"
          title="Submissions"
          separator="cell"
          selection="multiple"
          row-key="id"
          :rows="rows"
          :columns="columns"
          v-model:selected="rowsSelected"
          :pagination="{ rowsPerPage: 50 }"
          :loading="loadingSubmissions"
          @row-click="onRowClick"
          @selection="onRowSelect"
          dense flat bordered>
          <template v-slot:body-cell="props">
            <q-td :props="props" :class="{ 'text-primary': props.row.id == row?.id }">
              {{ props.value }}
            </q-td>
          </template>
          <template v-slot:top-right="props">
            <div  class="row items-center q-gutter-x-sm" style="height: 34px;">
              <div v-if="rowsSelected?.length">
                <q-btn label="Approve" color="green" icon="las la-check-circle" dense flat no-caps @click="onApproveSubmissions" />
                <q-btn label="Reject" color="red" icon="las la-times-circle" dense flat no-caps @click="onRejectSubmissions" />
                <span class="q-ml-sm text-weight-medium">{{ rowsSelected.length }} Selected</span>
              </div>
            </div>
          </template>
        </q-table>
      </div>

      <!-- Right -->
      <div class="col-9" v-if="submission">
        <q-card flat bordered>
          <div class="row q-py-xs q-px-md justify-between items-center">
            <div>
              Id: <b>{{ row?.id }}</b>, Type: <b>{{ getTypeLabel(row?.type) }}</b>, Date: <b>{{ getDateLabel(row?.date) }}</b> 
            </div>
            <div>
              <q-btn label="Approve" color="green" icon="las la-chevron-circle-down" dense flat no-caps @click="onApproveSubmission"/>
              <q-btn label="Reject" color="red" icon="las la-times-circle" dense flat no-caps @click="onRejectSubmission"/>
            </div>
          </div>

          <q-separator />

          <div class="row q-py-xs q-px-md">
            <div class="col adaptive-height">
              <div class="row" v-if="SubmissionType.isDonorsType(row?.type)">
                <!-- <u-donors-viewer :data="submission" :type="row.type" /> -->
                 <u-donor-entries v-if="SubmissionType.Donors.isEntryType(row.type)" :data="submission" :type="row.type" />
                 <u-donor-records v-else-if="SubmissionType.Donors.isListType(row.type)" :data="submission" :type="row.type" />
              </div>
              <div class="row" v-else-if="SubmissionType.isImagesType(row?.type)">
                <u-images-viewer :data="submission" :type="row.type" />
              </div>
              <div class="row" v-else-if="SubmissionType.isSpecimensType(row?.type)">
                <u-specimen-entries v-if="SubmissionType.Specimens.isEntryType(row.type)" :data="submission" :type="row.type" />
                <u-specimen-records v-else-if="SubmissionType.Specimens.isListType(row.type)" :data="submission" :type="row.type" />
                <u-specimen-analysis v-else-if="SubmissionType.Specimens.isAnalysisType(row.type)" :data="submission" :type="row.type" />
              </div>
              <div class="row" v-else-if="SubmissionType.isOmicsType(row?.type)">
                <u-omics-viewer :data="submission" :type="row.type" />
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-9" v-else>
        <div class="q-mt-lg text-center">No submission selected</div>
      </div>
    </div>
  </div>
</template>

<script>
import URejectDialog from "../components/submissions/RejectDialog.vue";
import UDonorsViewer from "../components/submissions/DonorsViewer.vue";
import UImagesViewer from "../components/submissions/ImagesViewer.vue";
import USpecimensViewer from "../components/submissions/SpecimensViewer.vue";
import USpecimenViewer from "../components/submissions/SpecimenViewer.vue";
import UOmicsViewer from "../components/submissions/OmicsViewer.vue";

import UDonorEntries from "./submissions/donors/Entries.vue";
import UDonorRecords from "./submissions/donors/Records.vue";
import USpecimenEntries from "./submissions/specimens/Entries.vue";
import USpecimenRecords from "./submissions/specimens/Records.vue";
import USpecimenAnalysis from "./submissions/specimens/Analysis.vue";

import api from "../api/api-submissions";
import DonorsFeedApi from "@/domain/submissions/api/api-feed-donors";
import ImagesFeedApi from "@/domain/submissions/api/api-feed-images";
import SpecimensFeedApi from "@/domain/submissions/api/api-feed-specimens";
import OmicsFeedApi from "@/domain/submissions/api/api-feed-omics";

import SubmissionType from "@/domain/submissions/models/enums/submission-type";

export default {
  components: {
    URejectDialog,
    UDonorsViewer,
    UImagesViewer,
    USpecimensViewer,
    USpecimenViewer,
    UOmicsViewer,

    UDonorEntries,
    UDonorRecords,
    USpecimenEntries,
    USpecimenRecords,
    USpecimenAnalysis
   },

  setup() {
    return {
      donorsFeedApi: new DonorsFeedApi(),
      imagesFeedApi: new ImagesFeedApi(),
      specimensApi: new SpecimensFeedApi(),
      omicsFeedApi: new OmicsFeedApi(),
      SubmissionType: SubmissionType
    };
  },

  data() {
    return {
      loadingSubmissions: false,
      loadingSubmission: false,
      submission: null,
      row: null,
      rows: [],
      rowsSelected: [],
      columns: [
        { name: "id", label: "Id", align: "left", field: "id", sortable: true },
        { name: "type", label: "Type", align: "left", sortable: true, field: row => this.getTypeLabel(row.type) },
        { name: "date", label: "Date", align: "right", sortable: true, field: row => this.getDateLabel(row.date) }
      ]
    };
  },

  mounted() {
    this.loadSubmissions();    
  },

  methods: {
    getTypeLabel(type) {
      return SubmissionType.getLabel(type);
    },

    getDateLabel(date) {
      return this.$helpers.content.toDateTimeString(date);
    },

    notifySuccess(message, caption = undefined) {
      this.$q.notify({
        type: "positive",
        position: "bottom-right",
        timeout: 3000,
        message: message,
        caption: caption
      });
    },

    async onRowClick(event, row, index) {      
      if (row == this.row)
        return;

      this.row = row;
      await this.loadSubmission(row.id, row.type);
    },

    async onRowSelect(event) {
      if (event.keys.length != 1)
        return;

      const row = this.rows.find(row => row.id == event.keys[0]);
      if (row == this.row)
        return;
      
      this.row = row;      
      await this.loadSubmission(row.id, row.type);
    },

    async onApproveSubmission() {
      const id = this.row.id;      
      await this.approveSubmission(id);
    },

    async onApproveSubmissions() {
      const ids = this.rowsSelected.map(row => row.id);      
      await this.approveSubmissions(ids);
    },

    async onRejectSubmission() {
      const id = this.row.id;
      this.$refs.rejectDialog.show([id]);
    },

    async onRejectSubmissions() {
      const ids = this.rowsSelected.map(row => row.id);
      this.$refs.rejectDialog.show(ids);
    },

    async onRejected(ids, reason) {
      if (ids.length > 1)
        await this.rejectSubmissions(ids, reason);
      else
        await this.rejectSubmission(id, reason);
    },

    async loadSubmissions() {
      try {
        this.loadingSubmissions = true;
        this.rows = await api.get();
        this.row = null;
        this.submission = null;
      } finally {
        this.loadingSubmissions = false;
      }
    },

    async loadSubmission(id, type) {
      // TODO: Chache submissions to avoid multiple server calls for the same data
      try {
        this.submission = null;
        this.loadingSubmission = true;

        if (SubmissionType.isDonorsType(type)) {
          this.submission = await this.donorsFeedApi.getSubmission(id, type);
        } else if (SubmissionType.isImagesType(type)) {
          this.submission = await this.imagesFeedApi.getSubmission(id,type);
        } else if (SubmissionType.isSpecimensType(type)) {
          this.submission = await this.specimensApi.getSubmission(id,type);
        } else if (SubmissionType.isOmicsType(type)) {
          this.submission = await this.omicsFeedApi.getSubmission(id,type);
        } else {
          console.error("Invalid submission type");
        }
      } finally {
        this.loadingSubmission = false;
      }
    },

    async approveSubmission(id) {
      await api.approve(id);
      await this.loadSubmissions();
      this.notifySuccess(`Submission '${id}' was approved`);
      this.row = null;
    },

    async approveSubmissions(ids) {
      await api.approveAll(ids);
      await this.loadSubmissions();
      this.notifySuccess("Selected submissions were approved");
      this.rowsSelected = [];
    },

    async rejectSubmission(id, reason) {
      await api.reject(id, reason);
      await this.loadSubmissions();
      this.notifySuccess(`Submission '${id}' was rejected`);
      this.row = null;
    },

    async rejectSubmissions(ids, reason) {
      await api.rejectAll(ids, reason);
      await this.loadSubmissions();
      this.notifySuccess("Selected submissions were rejected");
      this.rowsSelected = [];
    } 
  }
};
</script>

<style lang="scss" scoped>
.adaptive-height {
  overflow: auto;

  @media screen and (min-width: $breakpoint-xs){
    height: 530px;
  }

  @media screen and (min-width: $breakpoint-md){
    height: 530px;
  }

  @media screen and (min-width: $breakpoint-lg){
    height: 660px;
  }
}
</style>