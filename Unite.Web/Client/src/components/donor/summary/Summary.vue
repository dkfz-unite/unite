<template>
  <div class="col q-gutter-y-sm" v-if="donor">
    <div class="row">
      <span class="text-h5 u-text-title">Summary</span>
    </div>

    <div class="row">
      <div class="col">
        <q-markup-table class="table-strip" separator="cell" dense flat bordered>
          <colgroup>
            <col span="1" style="width: 50%" />
            <col span="1" style="width: 50%" />
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
              <td>{{ this.toBooleanString(donor.mtaProtected) }}</td>
            </tr>
            <tr>
              <td class="u-text-key">Work Packages</td>
              <td>
                <span v-for="(workPackage, i) in donor.workPackages" :key="workPackage.id">
                  <router-link class="u-link" :to="'/package/' + workPackage.id">
                    {{ workPackage.name }}
                  </router-link>
                  <span v-if="i < donor.workPackages.length - 1">/</span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="u-text-key">Studies</td>
              <td>
                <span v-for="study in donor.studies" :key="study.id">
                  <router-link class="u-link" :to="'/study/' + study.id">
                    {{ study.name }}
                  </router-link>
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
  props: ["donor"],

  methods: {
    toDateString(jsonValue) {
      if (!jsonValue) {
        return null;
      }

      var date = new Date(jsonValue);
      return date.toLocaleDateString();
    },

    toBooleanString(jsonValue) {
      if (jsonValue == null || jsonValue == undefined) {
        return null;
      }

      return jsonValue ? "Yes" : "No";
    },
  },
};
</script>