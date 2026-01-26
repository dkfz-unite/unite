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
              <td class="text-bold">{{ specimen.referenceId }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Creation Day</td>
              <td>{{ specimen.line.creationDay }}</td>
            </tr>
            <tr v-if="!!specimen.line.category">
              <td class="u-text-key">Category</td>
              <td>{{ specimen.line.category }}</td>
            </tr>
            <tr v-if="!!specimen.line.tumorType">
              <td class="u-text-key">Tumor Type</td>
              <td>{{ specimen.line.tumorType }}</td>
            </tr>
            <tr v-if="!!specimen.line.tumorGrade">
              <td class="u-text-key">Tumor Grade</td>
              <td>{{ specimen.line.tumorGrade }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Species</td>
              <td>{{ specimen.line.cellsSpecies }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ specimen.line.cellsType }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Culture Type</td>
              <td>{{ specimen.line.cellsCultureType }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import { specimen } from '@/domain/specimens/_shared/specimens/models/filters/specimen-filters';

export default {
  props: {
    specimen: Object,
    required: true
  }
}
</script>