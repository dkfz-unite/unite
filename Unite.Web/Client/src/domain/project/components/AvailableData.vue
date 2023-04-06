<template>
  <div class="col q-gutter-y-sm" v-if="project">
    <div class="row">
      <span class="text-h5 u-text-title">Available Data</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip" separator="cell" dense flat bordered>
          <colgroup>
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '80%' }" />
            <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '20%' }" />
          </colgroup>

          <thead>
            <th class="bg-grey-3" align="left"><span>Data type</span></th>
            <th class="bg-grey-3" align="left"><span>Available for N' donors</span></th>
          </thead>

          <tbody>
            <tr>
              <td class="u-text-key">MRI images</td>
              <td>{{ project.data?.mri || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">CT images</td>
              <td>{{ project.data?.ct || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Tissues</td>
              <td>{{ project.data?.tissues || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Cell lines</td>
              <td>{{ project.data?.cells || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Organoids</td>
              <td>{{ project.data?.organoids || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Xenografts</td>
              <td>{{ project.data?.xenografts || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Simple somatic mutations (SSM)</td>
              <td>{{ project.data?.ssm || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Copy number variants (CNV)</td>
              <td>{{ project.data?.cnv || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Structural variants (SV)</td>
              <td>{{ project.data?.sv || "-" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Gene expressions (Transcriptomics)</td>
              <td>{{ project.data?.tra || "-" }}</td>
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