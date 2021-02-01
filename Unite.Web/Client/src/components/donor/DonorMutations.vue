<template>
  <div class="col" v-if="mutations">
    <div class="row">
      <span class="text-h5 u-text-title">Mutations</span>
    </div>

    <!-- <div class="row">
      <div class="col-12 col-md-6">
        <q-select 
          label="Sample"
          emit-value
          map-options
          v-if="options"
          v-model="option" 
          :options="options">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents">
              
              <q-item-section>
                <q-item-label class="text-body1" v-html="scope.opt.label" />
                
                <q-item-label caption>
                  <span>
                    <span class="text-bold">
                      Date:
                    </span>
                    <span v-if="scope.opt.data.date">
                      {{scope.opt.data.date}}
                    </span>
                    <span v-else>
                      Unknown
                    </span>
                  </span>

                  <span>
                    <span class="text-bold">
                      Type:
                    </span>
                    <span v-if="scope.opt.data.type">
                      {{scope.opt.data.type}}
                      <span v-if="scope.opt.data.subtype">
                        ({{scope.opt.data.subtype}})
                      </span>
                    </span>
                    <span v-else>
                      Unknown
                    </span>
                  </span>
                </q-item-label>
              </q-item-section>

            </q-item>
          </template>
        </q-select>
      </div>
    </div> -->

    <div class="row">
      <div class="col-12 col-md-2">
        <u-mutation-filters />
      </div>
      <div class="col-12 col-md-10">
        <q-table v-if="mutations" :data="mutations" />
      </div>
    </div>
  </div>
</template>

<script>
import UMutationFilters from '@/components/search/common/filters/MutationFilters.vue';

export default {
  props: ["mutations"],

  // data() {
  //   return {
  //     option: null
  //   };
  // },

  // mounted(){
  //   this.option = this.options ? this.options[0].value : null;
  // },

  // computed:{
  //   options(){
  //     if(!this.samples){
  //       return null;
  //     }

  //     return this.samples.map(sample => {
  //       return {
  //         label: sample.name,
  //         value: sample.id,
  //         data: {
  //           type: sample.type,
  //           subtype: sample.subtype,
  //           date: sample.date
  //         }
  //       }
  //     });
  //   },

  //   mutations(){
  //     if(!this.samples || !this.option){
  //       return null;
  //     }

  //     return this.samples.find(item => item.id === this.option).mutations;
  //   }
  // },

  components:{
    UMutationFilters: UMutationFilters
  }
}
</script>