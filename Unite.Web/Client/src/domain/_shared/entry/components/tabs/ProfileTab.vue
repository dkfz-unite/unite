<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genomic Profile</span>
    </div>

    <div class="row">
      <u-profile v-if="profile" :profile="profile" :density="density" @fetch="fetchData">
        <template v-slot:header-before>
          <u-samples
            v-if="showSamples"
            v-model="sample"
            :options="samples"
            @update:modelValue="fetchData"
            style="min-width: 200px;"
          />
        </template>
      </u-profile>
    </div>
  </div>
</template>

<script>
import USamples from "@/domain/_shared/entry/components/filters/samples/Samples.vue";
import UProfile from "@/visualization/profile/components/Profile.vue";
import cacheDataService from "@/visualization/profile/components/data-service-cache";
import tabSamplesMixin from "@/domain/_shared/entry/components/filters/samples/mixin";
import api from "@/domain/specimens/_shared/specimen/api";


export default {
  components: 
  { 
    USamples, 
    UProfile 
  },

  mixins: [tabSamplesMixin],


  data() {
    return {
      profile: null,
      density: 512
    }
  },

  async mounted() {
    await this.fetchData();
  },

  methods: {
    async fetchData(payload) {
      if (!this.sample) return;
      try {
        let criteria = payload || { chrStart: 0, start: 0, chrEnd: 0, end: 0 };
        let data = cacheDataService.read(this.sample.id, criteria);
        if (data) {
          this.profile = data;
        } else {
          data = await api.getProfile(this.sample.id, criteria);
          cacheDataService.write(this.sample.id, criteria, data);
          this.profile = data;
        }
      } catch {
      }
    }
  }
}
</script>