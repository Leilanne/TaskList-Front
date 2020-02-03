import Vue from 'vue';
import * as moment from 'moment';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;
Vue.use(require('moment'));

new Vue({
  router,
  methods: {
    moment(date) {
      return moment(date);
    },
    date(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
  filters: {
    moment(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
  render: h => h(App),
}).$mount('#app');
