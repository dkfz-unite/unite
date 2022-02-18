<template>
  <div class="col q-gutter-y-sm" v-if="specimen">
    <div class="row">
      <span class="text-h5 u-text-title">Summary</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table
          class="table-strip" separator="cell"
          dense flat bordered>
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
              <td class="text-bold">{{ specimen.organoid.referenceId }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Creation Day</td>
              <td>{{ specimen.creationDay }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Implanted Cells Number</td>
              <td>{{ specimen.organoid.implantedCellsNumber }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Medium</td>
              <td>{{ specimen.organoid.medium }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tumorigenicity</td>
              <td>
                {{ $helpers.content.toBooleanString(specimen.organoid.tumorigenicity) }}
              </td>
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