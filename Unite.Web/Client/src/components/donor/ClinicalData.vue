<template>
    <div class="col" v-if="donor">
        <div class="row">
            <span class="text-h5 u-text-title">Clinical Data</span>
        </div>

        <div class="row q-col-gutter-x-sm q-mt-xs" v-if="donor.clinicalData">
            <div class="col-12 col-md-6">
                <q-markup-table class="table-strip" dense flat bordered separator="cell">
                    <colgroup>
                        <col span="1" style="width: 50%" />
                        <col span="1" style="width: 50%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="u-text-key">Gender</td>
                            <td>{{donor.clinicalData.gender}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Age</td>
                            <td>{{donor.clinicalData.age}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Age Category</td>
                            <td>{{donor.clinicalData.ageCategory}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Localization</td>
                            <td>{{donor.clinicalData.localization}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">KPS Baseline</td>
                            <td>{{donor.clinicalData.kpsBaseline}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Steroids Baseline</td>
                            <td>{{donor.clinicalData.steroidsBaseline ? 'Yes' : 'No'}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </div>
            <div class="col-12 col-md-6">
                <q-markup-table class="table-strip" dense flat bordered separator="cell">
                    <colgroup>
                        <col span="1" style="width: 50%" />
                        <col span="1" style="width: 50%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="u-text-key">Vital Status</td>
                            <td>{{donor.clinicalData.vitalStatus}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Vital Status Change Date</td>
                            <td>{{getDate(donor.clinicalData.vitalStatusChangeDate)}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Survival Days</td>
                            <td>{{donor.clinicalData.survivalDays}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Progression Date</td>
                            <td>{{getDate(donor.clinicalData.progressionDate)}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Progression Free Days</td>
                            <td>{{donor.clinicalData.progressionFreeDays}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Relapse Date</td>
                            <td>{{getDate(donor.clinicalData.relapseDate)}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Relapse Free Days</td>
                            <td>{{donor.clinicalData.relapseFreeDays}}</td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-6">
                <div class="row">
                    <u-treatment :treatments="donor.treatments" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UTreatment from '@/components/donor/Treatment.vue';

export default {
    props: ["donor"],

    methods:{
        getDate(jsonDate){
            if(!jsonDate){
                return null;
            }

            var date = new Date(jsonDate);
            return date.toLocaleDateString();
        }
    },

    components: {
        UTreatment: UTreatment
    }
}
</script>