<template>
  <div class="col q-gutter-y-sm" v-if="variant">
    <div class="row">
      <span class="text-h5 u-text-title">{{ Tabs.summary.domain }}</span>
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
              <td class="u-text-key">1st Breakpoint - Chromosome</td>
              <td>{{ variant.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - Start</td>
              <td>{{ variant.start.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - End</td>
              <td>{{ variant.end.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">1st Breakpoint - Flanking Sequences</td>
              <td>{{ variant.flankingSequenceFrom }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Chromosome</td>
              <td>{{ variant.otherChromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Start</td>
              <td>{{ variant.otherStart.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - End</td>
              <td>{{ variant.otherEnd.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">2nd Breakpoint - Flanking Sequences</td>
              <td>{{ variant.flankingSequenceTo }}</td>
            </tr>
            <tr v-if="!!variant.length">
              <td class="u-text-key">Length</td>
              <td>{{ variant.length?.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ variant.type }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "../../../settings";

export default {
  props: {
    variant: Object,
    default: () => null
  },

  data() {
    return {
      Tabs
    };
  }
}
</script>