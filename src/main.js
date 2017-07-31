import scss from '@/assets/scss/app.scss';

import Vue from 'vue';
import VueLazyload from 'vue-lazyload'

import store from '@/store';
import MuseUI from 'muse-ui';
import '@/../lib/muse-ui/dist/muse-ui.css';
import router from './router';

Vue.config.productionTip = false;
Vue.use(MuseUI);
Vue.use(VueLazyload, {
    error: require('@/assets/images/loading.svg'),
    loading: require('@/assets/images/loading.svg'),
    attempt: 1
});

new Vue({
    router,
    store,
    // render: h => h(App)
}).$mount('#app');