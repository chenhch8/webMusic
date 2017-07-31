<template lang="jade">
#playing-bar
    .like(@click.stop.prevent="setState")
        img(src="../assets/images/icon-like-red.png" v-if="like")
        img(src="../assets/images/icon-like.png" v-else)
    .btn-group
        .btn-front(@click.prevent.stop="playFront")
            img(src="../assets/images/icon-shangyiqu.png")
        .btn-play(@click.prevent.stop="changeCurrState")
            img(src="../assets/images/icon-pause.png" v-if="playing")
            img(src="../assets/images/icon-play.png" v-else)
        .btn-next(@click.prevent.stop="playNext")
            img(src="../assets/images/icon-xiayiqu.png")
    .song-list(@click.prevent.stop="goPlayingList")
        img(src="../assets/images/icon-list.png")
</template>

<script style="es6">
import { mapGetters, mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState({
            playing: state => state.PlayingService.playing,
            song: state => state.PlayingService.song
        }),
        ...mapGetters([
            'like'
        ])
    },
    methods: {
        ...mapMutations([
            'play', 'pause', 'playFront', 'playNext', 'setLike'
        ]),
        changeCurrState() {
            if (this.playing)
                this.pause();
            else
                this.play();
        },
        goPlayingList() {
            this.$router.push({ name: 'PlayingList'}, 'up');
        },
        setState() {
            this.setLike({
                songid: this.song.id,
                type: !this.like
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#playing-bar {
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    $width: 14%;
    > div {
        position: relative;
    }
    img {
        width: 70%;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
    .like, .song-list {
        width: $width;
    }
    .btn-group {
        width: 4 * $width;
        display: flex;
        justify-content: space-between;
        > div {
            flex: 1;
            position: relative;
            img {
                width: 50%;
            }
        }
    }
}
</style>