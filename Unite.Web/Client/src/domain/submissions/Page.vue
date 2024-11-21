<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain }" />
        <q-breadcrumbs-el :label="Settings.submissions.title" />
      </q-breadcrumbs>
    </div>
    <q-tabs vertical dense  indicator-color="transparent"  no-caps  align="left">
      <div>
            <label>Check Submission Status</label>
            <br>
            <br>
      </div>
      <table>
        <tr>
          <label>Enter Submission Id:</label>
        </tr>
        <tr>
          <td>
            <q-input v-model="inputText" label="Submission Id" />
          </td>
          <td>
              <q-btn label="Check" color="primary" dense flat no-caps @click="confirmTaskSearch" />
          </td>
        </tr>
      </table>
      <br>
      <br>
      <q-tab>
        <div v-if="taskStatus">
          <div class="status-progress row items-center justify-around q-gutter-sm">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step col-auto flex flex-column items-center">
                <div
                class="step-icon flex items-center justify-center"
                :class="{ active: index <= currentStatus }">
                </div>
                <span
              class="step-label q-mt-sm"
                :class="{ active: index <= currentStatus }">
                  {{ step.label }}
                </span>
                <div
                v-if="index < steps.length - 1"
                class="progress-line q-mt-sm"
                :class="{ active: index < currentStatus }">
                </div>
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
        <div v-if="taskStatusName"> 
          <label> <b>Submission Id : </b> {{ this.inputId }}, <b> Status : </b> {{ this.taskStatusName }} </label><br/>
          <label v-if="this.taskStatus.comment"><b>Reason: </b>{{ this.taskStatus.comment }}</label><br/>
          <label v-if="this.taskStatus.comment">{{ this.reviewNotes }}</label>
        </div>
      </q-tab>
    </q-tabs>
  </div>
</template>

<script>
import Settings from "@/_settings/settings";
import api from "./api";
export default {
  setup() {
    return {
      Settings
    }
  },
  data() {
    return {
      isDialogOpen: false,
      taskStatus: null,
      taskStatusName: null,
      inputId: null,
      inputText: null,
      currentStatus: null,
      steps: null,
      reviewNotes: null,

      successSteps: [
        { label: "Submitted" },
        { label: "Under Review" },
        { label: "Approved" },
        { label: "Processed" }
        ],
      rejectedSteps: [
        { label: "Submitted" },
        { label: "Admin Review" },
        { label: "Rejected" },
        { label: "User Review" }
        ],
    }
  },
  methods: {
    async confirmTaskSearch() {
        this.inputId = this.inputText;
        this.steps = this.successSteps;
        this.currentStatus = 1;
        this.taskStatus = await api.findTaskStatus(this.inputText);
        this.taskStatusName = this.taskStatus == "" ? "No valid data" : this.taskStatus.statusTypeId;
        if(this.taskStatusName  == "Preparing")
        {
          this.taskStatusName  =  "Under review";
        }
        else if(this.taskStatusName  == "Rejected")
        {
          this.steps = this.rejectedSteps;
          this.reviewNotes = "Please check the submitted data, and try again";
          this.currentStatus = 2;
        }
        this.inputText = null;
      }
  }
}
</script>
<style scoped>
.status-progress {
  display: flex;
  align-items: flex-start;
}
.step {
  text-align: center;
}
.step-icon {
  width: 15px;
  height: 15px;
  border: 2px solid grey;
  border-radius: 50%;
  transition: 0.3s;
}
.step-icon.active {
  border-color: green;
  background-color: green;
}
.icon {
  width: 15px;
  height: 15px;
  fill: green;
  transition: 0.3s;
}
.step-icon.active .icon {
  fill: green;
}
.step-label {
  font-size: 14px;
  color: grey;
  transition: 0.3s;
  padding-left: 1px;
}
.step-label.active {
  color: green;
}
.progress-line {
  width: 50px;
  height: 2px;
  background-color: grey;
  transition: 0.3s;
  margin-top: 10px;
}
.progress-line.active {
  background-color: green;
}
</style>