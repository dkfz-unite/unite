<template>
  <div class="col q-gutter-y-sm" v-if="protein">
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
              <td class="u-text-key">Name</td>
              <td>{{ protein.symbol }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Accession</td>
              <td>{{ protein.accessionId }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Source</td>
              <td>{{ protein.database }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Description</td>
              <td>{{ getDescription(protein.description) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Canonical</td>
              <td>{{ protein.isCanonical ? "Yes" : "No" }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Chromosome (Transcript)</td>
              <td>{{ protein.chromosome }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Start (First exon)</td>
              <td>{{ protein.start.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">End (Last Exon)</td>
              <td>{{ protein.end.toLocaleString() }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Length</td>
              <td>{{ (protein.end - protein.start + 1).toLocaleString() }}</td>
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
    protein: Object
  },

  methods: {
    getDescription() {
      if (!this.protein.description) return null;

      return this.protein.description
        .replace(/\[.*\]/, "")
        .replace(/^[a-z]/, match => match.toUpperCase());
    },
  }
}
</script>