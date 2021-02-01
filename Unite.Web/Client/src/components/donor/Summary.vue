<template>
    <div class="col" v-if="donor">
        <div class="row">
            <span class="text-h5 u-text-title">Summary</span>
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
                            <td class="u-text-key">PID</td>
                            <td class="text-bold">{{donor.id}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Diagnosis</td>
                            <td>{{donor.diagnosis}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Diagnosis Date</td>
                            <td>{{this.getDate(donor.diagnosisDate)}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Primary Site</td>
                            <td>{{donor.primarySite}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Origin</td>
                            <td>{{donor.origin}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">MTA Protected</td>
                            <td>{{donor.mtaProtected ? 'Yes' : 'No'}}</td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Work Packages</td>
                            <td>
                                <span v-for="workPackage in donor.workPackages" :key="workPackage.id">
                                    <router-link class="u-link" :to="'/package/' + workPackage.id">{{workPackage.name}}</router-link>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Studies</td>
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
            <span class="text-h5 u-text-title">Available Data</span>
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
                            <td class="u-text-key">Clinical Data</td>
                            <td>
                                <q-icon v-if="donor.clinicalData" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
                            </td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Treatment</td>
                            <td>
                                <q-icon v-if="donor.treatments" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
                            </td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Mutations</td>
                            <td>
                                <q-icon v-if="donor.mutations" color="green" size="sm" name="las la-check"  />
                                <q-icon v-else color="grey" size="sm" name="las la-minus" />
                            </td>
                        </tr>
                        <tr>
                            <td class="u-text-key">Cells</td>
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