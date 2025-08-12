<template>
  <u-reject-dialog ref="rejectDialog" :value="row?.id" @confirm="onRejected" />

  <div class="col">
    <div class="row q-col-gutter-xs">
      <!-- Left -->
      <div class="col-3">
        <q-table
          class="u-sticky-header-admin"
          separator="cell"
          row-key="id"
          :rows="rows"
          :columns="columns"
          :pagination="{ rowsPerPage: 20 }"
          :loading="loadingSubmissions"
          @row-click="onRowSelected"
          dense flat bordered>
          <template v-slot:body-cell="props">
            <q-td :props="props" :class="{ 'text-primary': props.row.id == row?.id }">
              {{ props.value }}
            </q-td>
          </template>
        </q-table>
        <div v-if="rows?.length">
          <q-btn label="Approve All" color="green" icon="las la-check-circle" dense flat no-caps @click="onApproveSubmissions" />
          <q-btn label="Reject All" color="red" icon="las la-times-circle" dense flat no-caps @click="onRejectSubmissions" />
        </div>
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
            <div class="col" style="height: 480px; overflow: auto;">
              <div v-if="isComplexType(row?.type)">  
                <u-json-viewer :value="submission"/>
              </div>
              <div v-else>
                <u-tsv-viewer :value="submission"/>
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
import UTsvViewer from '../components/submissions/TsvViewer.vue';
import UJsonViewer from '../components/submissions/JsonViewer.vue';

import api from "../api/api-submissions";
import DonorsApi from "@/domain/donors/api";
import ImagesApi from "@/domain/images/_shared/images/api";
import SpecimensApi from "@/domain/specimens/_shared/specimens/api";
import GenesApi from "@/domain/omics/genes/api";
import VariantsApi from "@/domain/omics/variants/_shared/variants/api";
import DonorsSubmissionType from "@/domain/donors/models/enums/submission-type";
import ImagesSubmissionType from "@/domain/images/_shared/images/models/enums/submission-type";
import SpecimensSubmissionType from "@/domain/specimens/_shared/specimens/models/enums/submission-type";
import GenesSubmissionType from "@/domain/omics/genes/models/enums/submission-type";
import VariantsSubmissionType from "@/domain/omics/variants/_shared/variants/models/enums/submission-type";

export default {
  components: {
    URejectDialog,
    UTsvViewer,
    UJsonViewer
   },

  setup() {
    return {
      donorsApi: new DonorsApi(),
      imagesApi: new ImagesApi(),
      specimensApi: new SpecimensApi(),
      genesApi: new GenesApi(),
      variantsApi: new VariantsApi(),
    };
  },

  data() {
    return {
      loadingSubmissions: false,
      loadingSubmission: false,
      submission: null,
      row: null,
      rows: [],
      columns: [
        { name: "id", label: "Id", align: "left", field: "id" },
        { name: "type", label: "Type", align: "left", field: row => this.getTypeLabel(row.type) },
        { name: "date", label: "Date", align: "right", field: row => this.getDateLabel(row.date) }
      ]
    };
  },

  mounted() {
    this.loadSubmissions();    
  },

  methods: {
    getTypeLabel(type) {
      if (DonorsSubmissionType.includes(type))
        return this.$helpers.enum.getLabel(type, DonorsSubmissionType.values);
      else if (ImagesSubmissionType.includes(type))
        return this.$helpers.enum.getLabel(type, ImagesSubmissionType.values);
      else if (SpecimensSubmissionType.includes(type))
        return this.$helpers.enum.getLabel(type, SpecimensSubmissionType.values);
      else if (GenesSubmissionType.includes(type))
        return this.$helpers.enum.getLabel(type, GenesSubmissionType.values);
      else if (VariantsSubmissionType.includes(type))
        return this.$helpers.enum.getLabel(type, VariantsSubmissionType.values);
      else
        return "Unknown";
    },

    getDateLabel(date) {
      return this.$helpers.content.toDateTimeString(date);
    },

    isComplexType(type) {
      return (GenesSubmissionType.includes(type) || VariantsSubmissionType.includes(type) || type == ImagesSubmissionType.Radiomics || type == SpecimensSubmissionType.SPE_DRG);
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

    async onRowSelected(event, row, index) {
      if (row == this.row)
        return;

      this.row = row;
      await this.loadSubmission(row.id, row.type);
    },

    async onApproveSubmission() {
      await this.approveSubmission();
    },

    async onApproveSubmissions() {
      await this.approveSubmissions();
    },

    async onRejectSubmission() {
      this.$refs.rejectDialog.show();
    },

    async onRejectSubmissions() {
      this.$refs.rejectDialog.show();
    },

    async onRejected(reason) {
      if (this.row != null)
        await this.rejectSubmission(reason);
      else 
        await this.rejectSubmissions();
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
      try {
        this.submission = null;
        this.loadingSubmission = true;

        if (DonorsSubmissionType.includes(type)) {
          this.submission = await this.donorsApi.getSubmission(id, type);
        } else if (ImagesSubmissionType.includes(type)) {
          this.submission = await this.imagesApi.getSubmission(id,type);
        } else if (SpecimensSubmissionType.includes(type)) {
          this.submission = await this.specimensApi.getSubmission(id,type);
        } else if (GenesSubmissionType.includes(type)) {
          this.submission = await this.genesApi.getSubmission(id,type);
        } else if (VariantsSubmissionType.includes(type)) {
          this.submission = await this.variantsApi.getSubmission(id,type);
        } else {
          console.error("Invalid submission type");
        }
      } finally {
        this.loadingSubmission = false;
      }
    },

    async approveSubmission() {
      const id = this.row.id;
      await api.approve(id);
      await this.loadSubmissions();
      this.notifySuccess(`Submission '${id}' was approved`);
    },

    async approveSubmissions() {
      await api.approveAll();
      await this.loadSubmissions();
      this.notifySuccess("All submissions were approved");
    },

    async rejectSubmission(reason) {
      const id = this.row.id;
      await api.reject(id, reason);
      await this.loadSubmissions();
      this.notifySuccess(`Submission '${id}' was rejected`);
    },

    async rejectSubmissions() {
      await api.rejectAll();
      await this.loadSubmissions();
      this.notifySuccess("All submissions were rejected");
    } 
  }
};
</script>
