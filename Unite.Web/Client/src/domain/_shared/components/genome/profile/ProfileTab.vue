<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genomic Profile</span>
    </div>

    <div class="row">
      <u-samples
        v-model="sample"
        :options="samples"
        @update:modelValue="fetchData"
        style="min-width: 200px;"
      />
    </div>
    <div class="row">
      <u-profile v-if="profile" :profile="profile" :density="density" @fetch="fetchData" />
    </div>
  </div>
</template>

<script>
import USamples from "@/domain/_shared/components/genome/Samples.vue";
import UProfile from "@/visualization/profile/components/Profile.vue";
import profileCacheService from "@/visualization/profile/components/profile-data-service-cache";
import pageSamplesMixin from "@/domain/_shared/entry/components/page-samples-mixin";
import api from "@/domain/specimens/_shared/specimen/api";


export default {
  components: 
  { 
    USamples, 
    UProfile 
  },

  mixins: [pageSamplesMixin],


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
        let data = profileCacheService.read(this.sample.id, criteria);
        if (data) {
          this.profile = data;
        } else {
          data = await api.getProfile(this.sample.id, criteria);
          profileCacheService.write(this.sample.id, criteria, data);
          this.profile = data;
        }
      } catch {
      }
    }
  }
}
</script>