<template>
  <div class="col q-gutter-y-sm" v-if="info">

    <div class="row">
      <div class="col q-gutter-y-sm">
        <div class="row">
          <span class="text-h5 u-text-title">Public Information</span>
        </div>

        <div class="row">
          <div class="col">
            <q-markup-table
              class="table-strip" 
              separator="cell" 
              dense flat bordered
            >
              <colgroup>
                <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '50%' }" />
                <col span="1" :style="{ width: $q.screen.lt.md ? '50%' : '50%' }" />
              </colgroup>

              <tbody>
                <tr>
                  <td class="u-text-key">Name</td>
                  <td>{{ info.name }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Depositor Name</td>
                  <td>{{ info.depositorName }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Depositor Establishment</td>
                  <td>{{ info.depositorEstablishment }}</td>
                </tr>
                <tr>
                  <td class="u-text-key">Establishment Date</td>
                  <td>{{ contentHelpers.toDateString(info.establishmentDate) }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="hasLinks">
      <div class="col q-gutter-y-sm">
        <div class="row">
          <span class="text-h5 u-text-title">Public References</span>
        </div>

        <div class="row">
          <div class="col">
            <q-markup-table
              class="table-strip" separator="cell"
              dense flat bordered
            >
              <colgroup>
                <col span="1" style="width: 100%" />
              </colgroup>

              <tbody>
                <tr v-if="info.pubMedLink">
                  <td>
                    <a :href="info.pubMedLink" target="blank" class="u-link">
                      <q-icon name="las la-external-link-alt" />
                      PubMed
                    </a>
                  </td>
                </tr>
                <tr v-if="info.atccLink">
                  <td>
                    <a :href="info.atccLink" target="blank" class="u-link">
                      <q-icon name="las la-external-link-alt" />
                      ATCC
                    </a>
                  </td>
                </tr>
                <tr v-if="info.exPasyLink">
                  <td>
                    <a :href="info.exPasyLink" target="blank" class="u-link">
                      <q-icon name="las la-external-link-alt" />
                      ExPasy
                    </a>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import contentHelpers from "@/services/helpers/helpers.content.js";

export default {
  props: ["specimen"],

  data() {
    return {
      contentHelpers: contentHelpers,
    };
  },

  computed: {
    info() {
      return this.specimen?.cellLine;
    },

    hasLinks() {
      return this.info.pubMedLink 
          || this.info.atccLink 
          || this.info.exPasyLink;
    }
  },
};
</script>