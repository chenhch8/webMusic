<template lang="jade">
#playing-page
    .btg-back(@click.stop.prevent="$router.go(-1, 'down')")
        img(src="../assets/images/icon-jiantou.png")
    .content
        .album-pic
            img(:src="coverImgUrl")
        .song-info
            playing-progress.procgress
            playing-lyrc.lyrc
            img(:src="coverImgUrl")
            .mask
    playing-bar.playing-bar
</template>

<script type="es6">
import PlayingBar from '@/components/PlayingBar2';
import PlayingProgress from '@/components/PlayingProgress';
import PlayingLyrc from '@/components/PlayingLyrc'; 

import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
    components: {
        PlayingBar, PlayingProgress, PlayingLyrc
    },
    methods: {
        
    },
    computed: {
        ...mapGetters([
            'coverImgUrl'
        ])
    }
}
</script>

<style lang="scss" scoped>
#playing-page {
    height: 100%;
    position: relative;
    overflow: hidden;
    .btg-back {
        position: absolute;
        width: 27px; height: 27px;
        left: 20px; top: 20px;
        background-color: rgba(255, 255, 255, .9);
        border-radius: 50%;
        z-index: 5;
        cursor: pointer;
        img {
            width: 60%;
            height: 60%;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    img {
        width: 100%;
    }
    .content {
        width: 100%;
        height: 100%;
        .album-pic {
            position: relative;
            width: 100%;
            height: 58%;
            overflow: hidden;
            img {
                height: 100%;
            }
        }
        .song-info {
            position: relative;
            height: 42%;
            img {
                filter: blur(30px);
                position: absolute;
                top: 0;
            }
            .mask {
                position: absolute;
                width: 100%; height: 100%;
                top: 0;
                background-color: rgba(255, 255, 255, .7);
            }
            .procgress {
                top: -11px;
            }
            .lyrc {
                position: relative;
                top: -11px;
                z-index: 2;
            }
        }
    }
    .playing-bar {
        position: absolute;
        bottom: 0;
    }
}
</style>