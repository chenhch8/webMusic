<template lang="jade">
.list
    .rank-title(:style="{ background: color.title }")
        .title
            h1 {{listinfo.title}}
            span {{listinfo.listennum | number}}
        .title-btn
            img(src="../assets/images/icon-play.png")
    mu-list.song-list(:style="{ background: color.listcolor }")
        mu-list-item(v-for="(item, index) in songlist",
            :key="item.data.songmid",
            :title="item.data.songname",
            @click.prevent.stop="selectSong(index)")
            mu-avatar(slot="leftAvatar", color="#fff", backgroundColor="transparent",
                :style="{ fontWeight: 100, fontSize: '1.5rem' }") {{index + 1}}
            span(slot="describe", :style="{ fontSize: '1rem', color: 'rgba(255,255,255,.7)' }")
                {{item.data.singer | singers}}
                // span(v-for="singer in item.data.singer", :key="singer.mid")
                //     {{singer.name}}-
                {{item.data.albumdesc}}
            .item-btn(@click.prevent.stop="showMenu(index)")
                img(src="../assets/images/more_horiz.svg")
            .item-divider
</template>

<script type="es6">
export default {
    props: {
        color: {
            type: Object,
            require: true
        },
        songlist: {
            type: Array,
            require: true
        },
        listinfo: {
            type: Object,
            require: true
        }
    },
    methods: {
        selectSong(index) {
            const song = this.songlist[index].data;
            // console.log('select one song:', song);
            this.$store.commit('setSong', {
                id: song.songid,
                albummid: song.albummid,
                name: song.songname,
                singers: song.singer
            });
        },
        showMenu(index) {
            this.$emit('showMenu', index);
        },
    },
    filters: {
        number(num) {
            return parseInt(num / 10000) + '万';
        },
        singers(array) {
            return array.map(item => item.name).join('-');
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.list {
    position: absolute;
    top: -1%;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    > * {
        position: relative;
    }
    .rank-title {
        height: 12%;
        top: 49.4%;
        color: #fff;
        padding: 1% 2%;
        display: flex;
        align-items: center;
        z-index: 2;
        .title {
            * {
                margin: 0;
            }
            h1 {
                font-size: $fontSize * 2.3;
                height: 55%;
            }
            span {
                font-size: $fontSize * 1.5;
                position: relative;
                top: -1%;
            }
        }
        .title-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid #fff;
            background: rgba(255, 255, 255, 0.3);
            position: absolute;
            right: 2%;
            img {
                width: 50%;
                height: 50%;
                position: absolute;
                top: 50%; left: 55%;
                transform: translate(-50%, -50%);
            }
        }
    }
    @mixin divider($dir) {
        border-#{$dir}: 1px solid rgba(255, 255, 255, .2);
    }
    .song-list {
        top: 49.4%;
        @include divider(top);
        .item-divider {
            @include divider(bottom);
            height: 0; width: 100%;
            position: absolute;
            bottom: -.1%;
        }
        .item-title {
            font-size: $fontSize;
            color: #fff;
        }
        .item-btn {
            position: absolute;
            top: 50%;
            right: 16px;
            z-index: 3;
            transform: translate(0, -50%);
        }
    }
}
</style>