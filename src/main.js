import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import vSelect from 'vue-select';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store/store';

library.add(faTimes);

Vue.component('fa', FontAwesomeIcon);
Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
