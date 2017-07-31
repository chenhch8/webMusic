<template lang="jade">
#playing-list-detail
    mu-list(v-if="data.length")
        mu-list-item.item-border(v-for="(item, index) in data", :key="index", @click="playSong(item.id)")
            p.list-item
                span {{index + 1}}
                span {{item.name}}
                span.singer-name {{item.singers | singers}}
                img.is-playing(v-if="item.id === playingSong" src="../assets/images/icon-playing.svg")
                img.setting-btn(src="../assets/images/icon-dots-black.png" @click.stop="showMenu(item.id)")
    .error(v-else) 列表为空
</template>

<script type="es6">
import { mapState, mapMutations } from 'vuex';

export default {
    props: {
        // 歌单歌曲信息
        data: {
            type: Array,
            require: true
        },
        // 歌单类型
        type: {
            type: Boolean,
            require: true
        }
    },
    computed: mapState({
        playingSong: state => state.PlayingService.song.id
    }),
    filters: {
        singers(arr) {
            return arr.map(singer => singer.name).join('-');
        }
    },
    methods: {
        ...mapMutations(['selectOneSongAndPlay']),
        playSong(songid) {
            this.selectOneSongAndPlay({
                songid,
                type: this.type
            })
        },
        showMenu(songid) {
            this.$emit('showMenu', { songid, type: this.type });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#playing-list-detail {
    .error {
        position: absolute;
        top: 50%; left: 50%;
        font-size: $fontSize * 1.2;
        transform: translate(-50%, -50%);
    }
    .item-border {
        border-top: 1px solid rgba(0, 0, 0, .1);
        p.list-item {
            margin: 0;
            display: flex;
            align-items: center;
            border: 0 !important;
            .setting-btn {
                width: 4%;
                position: absolute;
                right: 16px;
            }
            .is-playing {
                width: 4%;
            }
            span {
                margin-right: 12px;
                font-size: $fontSize * 1.2;
            }
            .singer-name {
                font-size: $fontSize;
                color: rgba(0, 0, 0, .6)
            }
        }
    }
}
</style>