<template lang="jade">
#process-bg
    mu-slider(v-model="percent", :step="2" @change="setCurrTime($event)"
        )
    .time
        span {{currtime | format}}
        span {{duration | format}}
</template>

<script type="se6">
import { mapState, mapMutations } from 'vuex';
import Rx from 'rx';

export default {
    computed: mapState({
        duration: state => state.PlayingService.duration,
        currtime: state => state.PlayingService.currentTime,
        percent(state) {
            const tmp = state.PlayingService;
            return parseInt(tmp.currentTime / tmp.duration * 100);
        }
    }),
    filters: {
        format(time) {
            time = parseInt(time);
            return ('0' + parseInt(time / 60)).slice(-2) + ':' + ('0' + (time % 60)).slice(-2);
        }
    },
    methods: {
        setCurrTime(value) {
            this.value = value;
        },
        ...mapMutations(['setCurrentTime'])
    },
    data() {
        return {
            value: undefined
        }
    },
    mounted() {
        // 滑动条change事件值缓存过滤
        const that = this;
        Rx.Observable
            .interval(200)
            .map(_ => that.value)
            .filter(value => value != undefined)
            .distinctUntilChanged()
            .subscribe(
                res => {
                    that.setCurrentTime(parseInt(res * that.duration / 100));
                    that.value = undefined;
                    that.percent = res;
                },
                err => console.log('Rx err:', err)
            )
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#process-bg {
    width: 100%;
    position: relative;
    overflow: hidden;
    z-index: 2;
    > * {
        margin: 0;
        position: relative;
    }
    .time {
        display: flex;
        padding: 0 2%;
        span {
            flex: 1;
            color: rgba(0, 0, 0, .7);
            font-size: $fontSize;
        }
        span:nth-child(2) {
            text-align: right;
        }
    }
}
</style>