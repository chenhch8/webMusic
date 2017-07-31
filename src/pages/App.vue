<template lang="jade">
.app
    transition(:name="transitionName" mode="out-in")
        keep-alive
            // router-view.child-view(v-if="$route.meta.keepAlive")
            router-view.child-view
    // transition(:name="transitionName" mode="out-in")
    //     router-view(v-if="!$route.meta.keepAlive")
    m-audio
</template>

<script>
import MAudio from '@/components/Audio.vue';

export default {
    components: {
        MAudio
    },
    data() {
        return {
            transitionName: '',
            // isFirstIn: true
        }
    },
    created() {
        this.$store.commit('init');
    },
    // beforeRouteEnter (to, from, next) {
    //     // 在渲染该组件的对应路由被 confirm 前调用
    //     // 不！能！获取组件实例 `this`
    //     // 因为当钩子执行前，组件实例还没被创建
    // },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是改组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        this.transitionName = `slide-${this.$router.mode}`;
        next();
    },
    // beforeRouteLeave (to, from, next) {
    //     // 导航离开该组件的对应路由时调用
    //     // 可以访问组件实例 `this`
    // }
}
</script>

<style lang="scss">
.child-view {
    position: absolute;
    width: 100%;
    transition: all .3s cubic-bezier(.55, 0, .1, 1);
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(30%, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-30%, 0);
}
.slide-up-enter, .slide-down-leave-active {
    opacity: 0;
    transform: translate(0, 20%);
}
.slide-up-leave-active, .slide-down-enter {
    opacity: 0;
    transform: translate(0, -20%);
}
.app {
    position: relative;
    height: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
}
</style>