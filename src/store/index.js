import Vue from 'vue';
// import Vuex from 'vuex';

import PlayingService from './playing_song';

// Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PlayingService
    }
});