<template lang="jade">
#playing-bar(@click.prevent.stop="goPlayingPage")
    .song-pic
        img(:src="coverImgUrl")
    p.song-name {{song.name}}
    .song-btn(@click.prevent.stop="changeCurrState")
        img(src="../assets/images/icon-pause.png" v-if="isplaying")
        img(src="../assets/images/icon-play.png" v-else)
</template>

<script type="es6">
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapState({
            isplaying: state => state.PlayingService.playing,
            song: state => state.PlayingService.song,
            btnImg(state) {
                return state.PlayingService.playing && this.btn_pause || this.btn_play;
            }
        }),
        ...mapGetters([
            'coverImgUrl'
        ])
    },
    methods: {
        ...mapMutations([
            'play', 'pause'
        ]),
        goPlayingPage() {
            this.$router.push({ name: 'MusicPlaying', params: { musicid: this.song.id } }, 'up');
        },
        changeCurrState() {
            if (this.isplaying)
                this.pause();
            else
                this.play();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#playing-bar {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    .song-pic {
        height: 30px;
        width: 30px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 3%;
        margin-left: 5%;
        img {
            width: 100%;
        }
    }
    .song-name {
        font-size: $fontSize;
    }
    .song-btn {
        height: 22px;
        width: 22px;
        position: absolute;
        right: 5%;
        img {
            width: 100%;
        }
    }
}
</style>