<template lang="jade">
audio#audio(:src="songUrl"
    autoplay
    @ended="playContinue(audio)"
    @canplay="getDuration"
    @timeupdate="getCurrentTime")
</template>

<script type="es6">
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            audio: null
        }
    },
    mounted() {
        this.audio = document.getElementById('audio');
        this.setPlayintState();
    },
    computed: {
        ...mapGetters([
            'songUrl'
        ]),
        ...mapState({
            playing: state => state.PlayingService.playing,
            changeTo: state => state.PlayingService.changeTo
        })
    },
    watch: {
        playing: function(newvalue, oldvalue) {
            this.setPlayintState();
        },
        changeTo: function(newvalue, oldvalue) {
            this.audio.currentTime = newvalue;
        },
        songUrl: function(newvalue, oldvalue) {
            if (newvalue) return;
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    },
    methods: {
        ...mapMutations([
            'play', 'pause', 'playContinue',
            'setDuration', 'updateCurrentTime'
        ]),
        setPlayintState() {
            if (!this.songUrl) return;
            if (this.playing)
                this.audio.play();
            else
                this.audio.pause();
        },
        getDuration() {
            this.setDuration(this.audio.duration);
        },
        getCurrentTime() {
            this.updateCurrentTime(this.audio.currentTime);
        }
    }
}
</script>

<style lang="scss">
#auto {
    display: hidden;
}
</style>