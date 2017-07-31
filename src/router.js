import Vue from 'vue';
import VueRouter from 'vue-router';

// 改写路由原方法
const $go = VueRouter.prototype.go;
const $push = VueRouter.prototype.push;
VueRouter.prototype.go = function(n, mode = 'right') {
    this.mode = mode;
    $go.call(this, n);
};
VueRouter.prototype.push = function(location, mode = 'left', onComplete = null, onAbort = null) {
    /* mode支持四种类型：up/down/left/right */
    this.mode = mode;
    $push.call(this, location, onComplete, onAbort)
};

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'App',
        component: resolve => require(['@/pages/App'], resolve),
        // meta: {
        //     keepAlive: true
        // },
        children: [{
            path: '',
            name: 'Home',
            component: resolve => require(['@/pages/Home'], resolve),
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/musicplaying/:musicid',
            name: 'MusicPlaying',
            component: resolve => require(['@/pages/MusicPlaying'], resolve),
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/hotdiss/:dissid',
            name: 'HotDiss',
            component: resolve => require(['@/pages/HotDiss'], resolve),
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/mvplaying/:mvid',
            name: 'MvPlaying',
            component: resolve => require(['@/pages/MvPlaying'], resolve),
            meta: {
                keepAlive: false
            }
        }, {
            path: '/ranksongs/:rankid',
            name: 'RankSongs',
            component: resolve => require(['@/pages/RankSongs'], resolve),
            // meta: {
            //     keepAlive: false
            // }
        }, {
            path: '/playinglist',
            name: 'PlayingList',
            component: resolve => require(['@/pages/PlayingList'], resolve)
        }]
    },
    { path: '*', redirect: '/' }
];

export default new VueRouter({
    routes,
    // mode: 'history'
});