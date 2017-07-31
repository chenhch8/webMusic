<template lang="jade">
#rank-songs
    .rank-songs(v-if="songlist")
        .header(:style="{ background: color.headcolor }")
            div(@click.prevent.stop="$router.go(-1)")
                img(src="../assets/images/icon-back-white.svg")
                span 排行榜
        .content
            .bg-pic
                img(:src="picUrl")
            rank-song-list(:color="color",
                :songlist="songlist",
                :listinfo="listinfo",
                @showMenu="showMenu($event)")
        rank-song-popup(:open="bottomPopup",
            :song="songlist[ptr].data"
            @close="bottomPopup = false")

    .rank-songs(v-else)
        .header(:style="{ background: 'rgba(0,0,0,.3)' }")
            div(@click.prevent.stop="$router.go(-1)")
                img(src="../assets/images/icon-back-white.svg")
                span 排行榜
        .loading-pic
            img(src="../assets/images/loading.svg") 

    playing-bar
</template>

<script type="es6">
import PlayingBar from '@/components/PlayingBar';
import RankSongPopup from '@/components/RankSongPopup';
import RankSongList from '@/components/RankSongList';

import { GetRankSongs } from '@/services/ApiService';

export default {
    components: {
        PlayingBar, RankSongPopup,
        RankSongList
    },
    data() {
        return {
            songlist: null,
            picUrl: undefined,
            listinfo: {
                title: undefined,
                listennum: undefined,
            },
            color: {
                headcolor: '#000',
                r: undefined,
                g: undefined,
                b: undefined,
                title: undefined,
                listcolor: undefined
            },
            bottomPopup: false,
            ptr: 0,
        }
    },
    activated() {
        this.songlist = null;
        this.getRankSongs();
    },
    methods: {
        getRankSongs() {
            GetRankSongs(this.$route.params.rankid)
                .then(res => {
                    const data = res.body;
                    let color = '#000000';
                    if (res.status === 200) {
                        this.songlist = data.songlist;
                        this.listinfo = {
                            title: data.topinfo.ListName,
                            listennum: data.topinfo.listennum
                        };
                        this.picUrl = data.topinfo.pic_album;
                        color = '00000' + data.color.toString(16);
                        color = '#' + color.substr(color.length - 6);
                    }
                    this.extractColor(color);
                })
        },
        extractRGB(start, color) {
            return parseInt(color.substr(start, 2), 16);
        },
        extractColor(color) {
            const r = this.extractRGB(1, color),
                  g = this.extractRGB(3, color),
                  b = this.extractRGB(5, color),
                  headcolor = `-webkit-linear-gradient(bottom, rgba(${r},${g},${b},0), ${color})`,
                  title = `-webkit-linear-gradient(top, rgba(${r},${g},${b},0), ${color})`,
                  listcolor = color;
            this.color = { headcolor, r, g, b, title, listcolor };
        },
        showMenu(index) {
            // console.log('[2]', this.songlist[index]);
            this.bottomPopup = true;
            this.ptr = index;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#rank-songs, .rank-songs {
    width: 100%;
    height: 100%;
    position: relative;
}
.header {
    height: 6%;
    width: 100%;
    position: absolute;
    z-index: 2;
    > div {
        width: 18%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        cursor: pointer;
        img {
            width: 30px;
        }
        span {
            color: #fff;
            font-size: $fontSize;
            white-space: nowrap;
        }
    }
}
.content {
    position: relative;
    width: 100%;
    height: 94%;
    z-index: 0;
    .bg-pic {
        position: relative;
        width: 100%;
        height: 60%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.loading-pic {
    position: absolute;
    left: 50%; top: 50%;
    width: 60px; height: 60px;
    transform: translate(-50%, -50%);
    img {
        width: 100%;
    }
}
</style>