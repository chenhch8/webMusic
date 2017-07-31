<template lang="jade">
mu-popup(position="bottom",
    :open="open",
    @close="close"
    popupClass="popup-bottom")
    .popup-content
        mu-list.btn-list
            mu-list-item(disabled)
                p 《{{song.songname}}》
            mu-divider
            mu-list-item(@click.prevent.stop="addNextSong")
                p 下一首播放
            mu-divider
            mu-list-item(@click.prevent.stop="addSongList")
                p 添加到播放列表
        mu-list.btn-list
            mu-list-item(@click.stop="close")
                p 取消
</template>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false,
            require: true
        },
        song: {
            type: Object,
            require: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        addNextSong() {
            this.$store.commit('addToNextPlaySong', this.format());
            this.close();
        },
        addSongList() {
            this.$store.commit('addToSongList', this.format());
            this.close();
        },
        format() {
            return {
                id: this.song.songid,
                albummid: this.song.albummid,
                name: this.song.songname,
                singers: this.song.singer
            }
        }
    },
    filters: {
        singers(array) {
            return array.map(item => item.name).join('-');
        }
    }
}
    
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.popup-bottom {
    width: 100%;
    max-width: 415px;
}

.popup-content {
    width: 100%;
    background-color: #eaeaea;
    * {
        margin:0;
        padding: 0 !important;
    }
    p {
        text-align: center;
        font-size: $fontSize * 1.4;
        font-weight: 600;
        height: 4.5%;
        line-height: 4.5%;
    }
    .btn-list {
        background-color: #fff;
    }
    .btn-list:nth-child(1) {
        margin-bottom: 1%;
    }
}
</style>