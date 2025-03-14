<template>
  <div class="col q-gutter-y-sm" v-if="project">
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
              <td class="text-bold">{{ project.id }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Name</td>
              <td class="text-bold">{{ project.name }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Donors</td>
              <td>{{ project.stats.donors.number }}</td>
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
    project: {
      type: Object,
      default() {
        return null;
      }
    }
  }
}
</script>