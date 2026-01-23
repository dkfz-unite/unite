<template>
  <div class="col q-gutter-y-sm" v-if="specimen">
    <div class="row">
      <span class="text-h5 u-text-title">Summary</span>
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
              <td class="u-text-key">ID</td>
              <td class="text-bold">{{ specimen.id }}</td>
            </tr>
            <tr>
              <td class="u-text-key">External ID</td>
              <td class="text-bold">{{ specimen.xenograft.referenceId }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Creation Day</td>
              <td>{{ specimen.xenograft.creationDay }}</td>
            </tr>
            <tr v-if="!!specimen.xenograft.condition">
              <td class="u-text-key">Category</td>
              <td>{{ specimen.xenograft.condition }}</td>
            </tr>
            <tr v-if="!!specimen.xenograft.tumorType">
              <td class="u-text-key">Tumor Type</td>
              <td>{{ specimen.xenograft.tumorType }}</td>
            </tr>
            <tr v-if="!!specimen.xenograft.tumorGrade">
              <td class="u-text-key">Tumor Grade</td>
              <td>{{ specimen.xenograft.tumorGrade }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Mouse Strain</td>
              <td>{{ specimen.xenograft.mouseStrain }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Group Size</td>
              <td>{{ specimen.xenograft.groupSize }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Implant Type</td>
              <td>{{ specimen.xenograft.implantType }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Implant Location</td>
              <td>{{ specimen.xenograft.implantLocation }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Implanted Cells Number</td>
              <td>{{ specimen.xenograft.implantedCellsNumber }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tumorigenicity</td>
              <td>{{ $helpers.content.toBooleanString(specimen.xenograft.tumorigenicity) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tumor Growth Form</td>
              <td>{{ specimen.xenograft.tumorGrowthForm }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Survival Days (Average)</td>
              <td>{{ specimen.xenograft.survivalDays }}</td>
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
    specimen: {
      type: Object,
      required: true
    }
  }
}
</script>