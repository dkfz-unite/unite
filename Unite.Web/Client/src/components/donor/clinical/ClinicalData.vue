<template>
  <div class="col q-gutter-y-sm" v-if="clinicalData">
    <div class="row">
      <span class="text-h5 u-text-title">Clinical Data</span>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-6">
            <q-markup-table class="table-strip" separator="cell" dense flat bordered>
              <colgroup>
                <col span="1" style="width: 50%" />
                <col span="1" style="width: 50%" />
              </colgroup>

              <tbody>
                <tr>
                  <td class="u-text-key">Gender</td>
                  <td>{{ clinicalData.gender }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Age</td>
                  <td>{{ clinicalData.age }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Age Category</td>
                  <td>{{ clinicalData.ageCategory }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Localization</td>
                  <td>{{ clinicalData.localization }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">KPS Baseline</td>
                  <td>{{ clinicalData.kpsBaseline }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Steroids Baseline</td>
                  <td>{{ clinicalData.steroidsBaseline ? "Yes" : "No" }}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>

          <div class="col-12 col-md-6">
            <q-markup-table class="table-strip" separator="cell" dense flat bordered>
              <colgroup>
                <col span="1" style="width: 50%" />
                <col span="1" style="width: 50%" />
              </colgroup>

              <tbody>
                <tr>
                  <td class="u-text-key">Vital Status</td>
                  <td>{{ clinicalData.vitalStatus }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Vital Status Change Date</td>
                  <td>{{ toDateString(clinicalData.vitalStatusChangeDate) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Survival Days</td>
                  <td>{{ clinicalData.survivalDays }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Progression Date</td>
                  <td>{{ toDateString(clinicalData.progressionDate) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Progression Free Days</td>
                  <td>{{ clinicalData.progressionFreeDays }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Relapse Date</td>
                  <td>{{ toDateString(clinicalData.relapseDate) }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Relapse Free Days</td>
                  <td>{{ clinicalData.relapseFreeDays }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["donor"],

  computed:{
    clinicalData(){
      return this.donor?.clinicalData;
    }
  },

  methods:{
    toDateString(jsonValue) {
      if (!jsonValue) {
        return null;
      }

      var date = new Date(jsonValue);
      return date.toLocaleDateString();
    },
  }
};
</script>