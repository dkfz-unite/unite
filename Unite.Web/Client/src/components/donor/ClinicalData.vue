<template>
    <div class="col" v-if="donor">
        <div class="row">
            <span class="text-h5">Clinical Data</span>
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
                            <td>Gender</td>
                            <td>{{donor.clinicalData.gender}}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{{donor.clinicalData.age}}</td>
                        </tr>
                        <tr>
                            <td>Age Category</td>
                            <td>{{donor.clinicalData.ageCategory}}</td>
                        </tr>
                        <tr>
                            <td>Localization</td>
                            <td>{{donor.clinicalData.localization}}</td>
                        </tr>
                        <tr>
                            <td>KPS Baseline</td>
                            <td>{{donor.clinicalData.kpsBaseline}}</td>
                        </tr>
                        <tr>
                            <td>Steroids Baseline</td>
                            <td>{{donor.clinicalData.steroidsBaseline}}</td>
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
                            <td>Vital Status</td>
                            <td>{{donor.clinicalData.vitalStatus}}</td>
                        </tr>
                        <tr>
                            <td>Vital Status Change Date</td>
                            <td>{{getDate(donor.clinicalData.vitalStatusChangeDate)}}</td>
                        </tr>
                        <tr>
                            <td>Survival Days</td>
                            <td>{{donor.clinicalData.survivalDays}}</td>
                        </tr>
                        <tr>
                            <td>Progression Date</td>
                            <td>{{getDate(donor.clinicalData.progressionDate)}}</td>
                        </tr>
                        <tr>
                            <td>Progression Free Days</td>
                            <td>{{donor.clinicalData.progressionFreeDays}}</td>
                        </tr>
                        <tr>
                            <td>Relapse Date</td>
                            <td>{{getDate(donor.clinicalData.relapseDate)}}</td>
                        </tr>
                        <tr>
                            <td>Relapse Free Days</td>
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