<template>
  <div class="col q-gutter-y-sm" v-if="clinicalData">
    <div class="row">
      <span class="text-h5 u-text-title">Clinical Data</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip" separator="cell" dense flat bordered>
          <colgroup>
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '30%' }" />
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '70%' }" />
          </colgroup>

          <tbody>
            <tr>
              <td class="u-text-key">Sex</td>
              <td>{{ clinicalData.sex }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Age</td>
              <td>{{ clinicalData.age }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Diagnosis</td>
              <td>{{ clinicalData.diagnosis }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Primary site</td>
              <td>{{ clinicalData.primarySite }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Localization</td>
              <td>{{ clinicalData.localization }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Vital Status</td>
              <td>{{ $helpers.content.toBooleanString(clinicalData.vitalStatus, false, "Living", "Deceased") }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Vital Status Changed After (Days)</td>
              <td>{{ clinicalData.vitalStatusChangeDay?.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Progression Status</td>
              <td>{{ $helpers.content.toBooleanString(clinicalData.progressionStatus, false, "Yes", "No") }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Progression Status Changed After (Days)</td>
              <td>{{ clinicalData.progressionStatusChangeDay?.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Steroids Reactive</td>
              <td>{{ $helpers.content.toBooleanString(clinicalData.steroidsReactive) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">KPS</td>
              <td>{{ clinicalData.kps }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    donor: {
      type: Object,
      default() {
        return null;
      }
    }
  },

  computed:{
    clinicalData(){
      return this.donor?.clinicalData;
    }
  }
}
</script>