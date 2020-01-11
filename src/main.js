import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import { routes } from './routes';
import store from './store/store';
Vue.use(Buefy)
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://stocky-trader.firebaseio.com/';

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
