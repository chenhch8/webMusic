<template lang="jade">
#home-rank-list
    ul.ranklist-list(v-if="ranklist")
        li(v-for="item in ranklist", :key="item.id")
            router-link.ranklist-item(:to="{ name: 'RankSongs', params: { rankid: item.id } }")
                .ranklist-profile
                    img(v-lazy="item.picUrl")
                    span {{item.listenCount | number}}
                .ranklist-info
                    h3 {{item.topTitle}}
                    ul.song-list
                        li(v-for="(song, index) in item.songList", :key="song.songname")
                            p
                                span {{index + 1}}
                                span {{song.songname}}
                                span -{{song.singername}}
</template>

<script>
import { GetRankList } from '@/services/ApiService';

export default {
    data() {
        return {
            ranklist: null
        }
    },
    activated() {
        this.getRanklist();
    },
    methods: {
        getRanklist() {
            GetRankList()
            .then(res => {
                if (res.status === 200) {
                    this.ranklist = res.body.data.topList;
                }
                // console.log('[2]', this.ranklist);
            })
        }
    },
    filters: {
        number(num) {
            return (num / 10000).toFixed(1) + '万';
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#home-rank-list {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #eaeaea;
    z-index: 0;
}
.ranklist-item {
    height: 100px;
    width: 95%;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    margin: 1.5% auto;
    background-color: #fff;
    align-items: center;
    .ranklist-profile {
        width: 100px;
        height: 100px;
        position: relative;
        img {
            width: 100%;
        }
        span {
            position: absolute;
            left: 1%; bottom: 0;
            font-size: $fontSize;
            color: #fff;
        }
    }
    .ranklist-info {
        flex: 1;
        padding: 0 2%;
        overflow: hidden;
        h3 {
            margin: 0;
            color: #000;
            font-weight: 500;
            font-size: $fontSize;
        }
        .song-list {
            p {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                color: #000;
                margin: 0;
                span {
                    padding: 0 1% 0;
                    font-size: $fontSize;
                }
                :nth-child(3) {
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
}
</style>