import Vue from "vue";
import axios, { AxiosRequestConfig } from 'axios';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";


Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://127.0.0.1:5000/api/';
//axios.defaults.headers.common['Authorization'] = store.getters['auth/authHeader'];
axios.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    const token = store.getters['auth/authHeader'];

    if (token) {
      config.headers['Authorization'] = `${ token }`;
    }

    return config;
  }, 

  (error) => {
    console.log(error.response.status);
    return Promise.reject(error);
  }
);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
