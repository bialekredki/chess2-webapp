<template>
    <v-container>   
        <v-row>
            <v-col>
            <v-slider
            ticks="always"
            tick-size="3"
            step="1"
            v-model="sliderValue"
            :max="timeSliderLabels.length-1"
            :tick-labels="timeSliderLabels"
            @change="getData"
            >
            </v-slider>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-card :loading="loading">
                    <v-card-title>
                        Users
                    </v-card-title>
                <v-container fluid>
                    <v-row dense>
                        <v-col cols="6">
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
                        <v-col cols="6">
                            <v-progress-circular
                            :size=100
                            :rotate="90"
                            :value="activeUsers"
                            color="primary"
                            >{{activeUsers}}
                            </v-progress-circular>
                            <br>
                            Active users
                        </v-col>
                    <v-row>
                        <LineChart
                        :chartData="chartData"
                        />
                    </v-row>
                    </v-row>
                </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from 'axios';
import LineChart from './Charts/LineChart.vue';

@Component({
    components: {
        LineChart
    }
})
export default class AdminPanelReports extends Vue {
    private registrations = 0;

    private registrationsByDate: {[key: string]: string} = {};

    private sliderValue = 0;

    private activeUsers = 0;

    private loading = true;
    
    private timeSlider = {
        'One year':  1*54*4*7,
        '9 months':  9*4*7,
        '6 months':  6*4*7,
        '3 months':  3*4*7,
        '2 months':  2*4*7,
        '1 months':  4*7,
        '3 weeks':  3*7,
        '2 weeks':  2*7,
        '1 weeks':  7,
        'today':  1,
    }

    get registrationsDivided(): number {
        return this.registrations % 100;
    }

    get registrationsByDateLabels(): Array<string> {
        return Object.keys(this.registrationsByDate);
    }

    get registrationsByDateValues(): Array<string> {
        return Object.values(this.registrationsByDate);
    }

    get timeSliderLabels(): Array<string> {
        return Object.keys(this.timeSlider);
    }

    get chartData(): any {
        return { 
            datasets: [
                {
                    data: this.registrationsByDateValues, 
                    backgroundColor: this.$vuetify.theme.currentTheme.primary,
                    label: 'Registrations'
                }
                
            ],
            labels: this.registrationsByDateLabels 
            }
    }

    mounted() {
        this.getData();
    }

    public getData(): void {
        this.loading = true;
        axios.get('/admin/stats', { params: { types: ['registrations', 'active_users', 'registrations_by_date'], time: Object.values(this.timeSlider)[this.sliderValue] }}).then((response:AxiosResponse) => {
            this.registrations = response.data.registrations;
            this.activeUsers = response.data.activeUsers;
            this.registrationsByDate = response.data.registrationsByDate;
            this.loading = false;
        });
    }
}
</script>
