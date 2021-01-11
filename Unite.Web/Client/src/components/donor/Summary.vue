<template>
    <div class="col" v-if="donor">
        <div class="row">
            <span class="text-h5">Summary</span>
        </div>

        <div class="row q-mt-xs">
            <div class="col-12 col-md-6">
                <q-markup-table class="table-strip" dense flat bordered separator="cell">
                    <colgroup>
                        <col span="1" style="width: 50%">
                        <col span="1" style="width: 50%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td class="text-bold">PID</td>
                            <td class="text-bold">{{donor.id}}</td>
                        </tr>
                        <tr>
                            <td>Diagnosis</td>
                            <td>{{donor.diagnosis}}</td>
                        </tr>
                        <tr>
                            <td>Diagnosis Date</td>
                            <td>{{this.getDate(donor.diagnosisDate)}}</td>
                        </tr>
                        <tr>
                            <td>Primary Site</td>
                            <td>{{donor.primarySite}}</td>
                        </tr>
                        <tr>
                            <td>Origin</td>
                            <td>{{donor.origin}}</td>
                        </tr>
                        <tr>
                            <td>MTA Protected</td>
                            <td>{{donor.mtaProtected}}</td>
                        </tr>
                        <tr>
                            <td>Work Packages</td>
                            <td>
                                <span v-for="workPackage in donor.workPackages" :key="workPackage.id">
                                    <router-link class="u-link" :to="'/package/' + workPackage.id">{{workPackage.name}}</router-link>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Studies</td>
                            <td>
                                <span v-for="study in donor.studies" :key="study.id">
                                    <router-link class="u-link" :to="'/study/' + study.id">{{study.name}}</router-link>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </q-markup-table>
            </div>
        </div>

        <div class="row q-mt-xs">
            <span class="text-h5">Available Data</span>
        </div>

        <div class="row q-mt-xs">
            <div class="col-12 col-md-6">
                <q-markup-table class="table-strip" dense flat bordered separator="cell">
                    <colgroup>
                        <col span="1" style="width: 50%">
                        <col span="1" style="width: 50%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>Clinical Data</td>
                            <td>
                                <q-icon v-if="donor.clinicalData" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
                            </td>
                        </tr>
                        <tr>
                            <td>Treatment</td>
                            <td>
                                <q-icon v-if="donor.treatments" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
                            </td>
                        </tr>
                        <tr>
                            <td>Mutations</td>
                            <td>
                                <q-icon v-if="donor.samples && donor.samples[0].mutations" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
                            </td>
                        </tr>
                        <tr>
                            <td>Cells</td>
                            <td>
                                <q-icon v-if="donor.cellLines" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
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

    methods:{
        getDate(jsonDate){
            if(!jsonDate){
                return null;
            }

            var date = new Date(jsonDate);
            return date.toLocaleDateString();
        }
    }
}
</script>