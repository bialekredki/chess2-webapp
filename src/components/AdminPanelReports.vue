<template>
    <v-container>   
        <v-row>
            <v-col cols="2">
                <v-progress-circular
                :size=100
                :rotate="90"
                :value="registrationsDivided"
                color="primary"
                >{{registrations}}
                </v-progress-circular>
                <br>
                Registrations
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';

@Component
export default class AdminPanelReports extends Vue {
    private registrations = 192;

    get registrationsDivided(): number {
        return this.registrations % 100;
    }

    mounted() {
        this.getRegistrations();
    }

    public getRegistrations(): void {
        axios.get('/admin/stats', { params: { types: 'registrations', since: {days:2} }}).then((response:AxiosResponse) => {
            this.registrations = response.data.registrations;
        });
    }
}
</script>
