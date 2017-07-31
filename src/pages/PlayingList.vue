<template lang="jade">
#playing-list
    .header
        .header-part
            p.left.btn(@click.prevent.stop="changePlayMode")
                img(:src="imgUrl")
                span {{mode}}
        .header-part
            p.right.btn(@click="$router.go(-1, 'down')")
                完成
    .content
        swiper.list-swiper-content(:options="swiperOption")
            swiper-slide.list-swiper-item
                playing-list-detail(:data="cacheList", :type="false", @showMenu="showMenu($event)")
            swiper-slide.list-swiper-item
                playing-list-detail(:data="likeList", :type="true", @showMenu="showMenu($event)")
            .swiper-btns-group(slot="pagination")
    playing-list-popup(:open="popup.open", :song="popup.song" @close="popup.open = false")
</template>

<script type="es6">
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import PlayingListDetail from '@/components/PlayingListDetail';
import PlayingListPopup from '@/components/PlayingListPopup';

import { mapState, mapMutations, mapGetters } from 'vuex';
import * as playing from '@/config/playing';

const MODES = ['单曲循环', '顺序播放', '随机播放'];
const SWIPER = ['最近播放', '个人喜爱'];

export default {
    components: {
        swiper, swiperSlide, PlayingListDetail,
        PlayingListPopup
    },
    data() {
        return {
            type: {
                SINGLE: require('@/assets/images/icon-SINGLE.svg'),
                SEQUENTIAL: require('@/assets/images/icon-SEQUENTIAL.png'),
                RANDOM: require('@/assets/images/icon-RANDOM.png')
            },
            imgUrl: null,
            mode: undefined,
            swiperOption: {
                pagination: '.swiper-btns-group',
                paginationClickable: true,
                paginationBulletRender(swiper, index, className) {
                    return `<span class="${className}"
                        style="flex: 1; border-radius: 0; height: 32px; line-height: 35px; background-color: #fff; text-align: center; font-size: 15px;">
                        ${SWIPER[index]}
                        </span>`
                }
            },
            popup: {
                open: false,
                song: null
            }
        }
    },
    computed: {
        ...mapState({
            playMode: state => state.PlayingService.playMode,
            songList: state => state.PlayingService.songList
        }),
        ...mapGetters([
            'cacheList', 'likeList'
        ])
    },
    created() {
        this.setImg();
    },
    watch: {
        playMode: function() {
            this.setImg();
        }
    },
    methods: {
        ...mapMutations([
            'changePlayMode'
        ]),
        setImg() {
            switch(this.playMode) {
                case playing.SINGLE:
                    this.imgUrl = this.type.SINGLE;
                    break;
                case playing.SEQUENTIAL:
                    this.imgUrl = this.type.SEQUENTIAL;
                    break;
                default:
                    this.imgUrl = this.type.RANDOM
            }
            this.mode = MODES[this.playMode];
        },
        showMenu(song) {
            this.popup = {
                open: true,
                song: {
                    id: song.songid,
                    name: this.songList[song.songid].name,
                    singers: this.songList[song.songid].singers,
                    type: song.type
                }
            };
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#playing-list {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #eaeaea;
    > * {
        box-sizing: border-box;
        background-color: #fff;
    }
    > div {
        position: relative;
        width: 100%;
    }
    .header {
        height: 6%;
        display: flex;
        .header-part {
            flex: 1;
            height: 100%;
            p {
                margin: 0;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
                font-size: $fontSize;
                color: rgba(0, 0, 0, .7);
            }
            .left {
                display: flex;
                align-items: center;
                left: 2%;
                > * {
                    margin-left: 5px;
                }
                img {
                    width: 30px;
                }
            }
            .right {
                right: 2%;
            }
            .btn {
                cursor: pointer;
            }
        }
    }
    .content {
        margin-top: 2%;
        height: 93%;
        overflow-y: auto;
        .list-swiper-content {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            * {
                font-size: $fontSize !important;
            }
            .list-swiper-item {
                top: 25px;
                height: calc(100% - 30px);
            }
            .swiper-btns-group {
                position: fixed;
                background-color: #fff;
                width: 100%;
                height: 30px;
                top: 7%;
                z-index: 2;
                display: flex;
            }
        }

    }
}
</style>