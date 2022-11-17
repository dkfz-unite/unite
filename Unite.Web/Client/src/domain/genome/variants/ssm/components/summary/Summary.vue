<template>
  <div class="col q-gutter-y-sm" v-if="variant">
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
              <td class="u-text-key">Chromosome</td>
              <td>{{ variant.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Start</td>
              <td>{{ variant.start }}</td>
            </tr>
             <tr>
              <td class="u-text-key">End</td>
              <td>{{ variant.end }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Reference Base</td>
              <td>{{ variant.mutation.ref }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Alternate Base</td>
              <td>{{ variant.mutation.alt }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ variant.mutation.type }}</td>
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
    variant: Object
  }
}
</script>