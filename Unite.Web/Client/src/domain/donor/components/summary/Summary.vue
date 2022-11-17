<template>
  <div class="col q-gutter-y-sm" v-if="donor">
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
              <td class="text-bold">{{ donor.id }}</td>
            </tr>
            <tr>
              <td class="u-text-key">External ID</td>
              <td class="text-bold">{{ donor.referenceId }}</td>
            </tr>
            <tr>
              <td class="u-text-key">MTA Protected</td>
              <td>{{ $helpers.content.toBooleanString(donor.mtaProtected) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Projects</td>
              <td>
                <span v-for="(project, i) in donor.projects" :key="project.id">
                  <router-link class="u-link" :to="{ name: 'project', params: { id: project.id.toString() } }">
                    {{ project.name }}
                  </router-link>
                  <span v-if="i < donor.projects.length - 1">/</span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="u-text-key">Studies</td>
              <td>
                <span v-for="(study, i) in donor.studies" :key="study.id">
                  {{ study.name }}
                  <span v-if="i < donor.studies.length - 1">/</span>
                </span>
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
    donor: {
      type: Object,
      default() {
        return null;
      }
    }
  }
}
</script>