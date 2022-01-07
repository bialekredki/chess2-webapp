import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#52b191',
                secondary: '#b16152',
                accent: '#8c9eff',
                error: '#b71c1c',
                text: '#000000',
            },
        },
    },
});
