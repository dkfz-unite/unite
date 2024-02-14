<template>
  <div class="col q-gutter-y-sm" v-if="variant">
    <div class="row">
      <span class="text-h5 u-text-title">{{ Tabs.summary.title }}</span>
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
              <td>{{ variant.start.toLocaleString() }}</td>
            </tr>
             <tr>
              <td class="u-text-key">End</td>
              <td>{{ variant.end.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Reference Base</td>
              <!-- <td>{{ variant.ssm.ref }}</td> -->
              <td><u-dna-sequence :value="variant.ssm.ref"></u-dna-sequence></td>
            </tr>
            <tr>
              <td class="u-text-key">Alternate Base</td>
              <!-- <td>{{ variant.ssm.alt }}</td> -->
              <td><u-dna-sequence :value="variant.ssm.alt"></u-dna-sequence></td>
            </tr>
            <tr v-if="(variant.ssm.length > 1)">
              <td class="u-text-key">Length</td>
              <td>{{ variant.ssm.length.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Type</td>
              <td>{{ variant.ssm.type }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "../../../settings";
import UDnaSequence from "../../../../_shared/components/DnaSequence.vue";

export default {
  components: {
    UDnaSequence
  },

  props: {
    variant: Object
  },

  setup() {
    return {
      Tabs
    };
  }
}
</script>