<template lang="jade">
.recommend
    swiper.recommend-swiper-content(:options="swiperOption" v-if="focus")
        swiper-slide(v-for="(item, index) in focus", :key="index")
            a.recommend-swiper-item(:href="item.jumpurl")
                img(v-lazy="item.pic")
        .recommend-swiper-pagination(slot="pagination")
    .recommend-segment
        h3.recommend-segment-title 热门歌曲
        ul.recommend-hotdiss-list(v-if="hotdiss")
            li(v-for="item in hotdiss", :key="item.dissid", )
                router-link(:to="{ name: 'HotDiss', params: { dissid: item.dissid } }")
                    .img
                        img(v-lazy="item.imgurl")
                        .img-listen-count
                            img(src="../assets/images/icon-erji.svg")
                            p {{item.listennum | number}}
                    h3 {{item.dissname | nospace}}
                    p {{item.author | nospace}}
            li(v-if="hotdiss.length % 2")
    .recommend-segment.recommend-shoubomv
        h3.recommend-segment-title 热门 MV
        ul.recommend-shoubomv-list(v-if="shoubomv")
            li.recommend-shoubomv-item(v-for="item in shoubomv", :key="item.mv_id")
                router-link(:to="{ name: 'MvPlaying', params: { mvid: item.mv_id }}")
                    img(v-lazy="item.picurl")
                    .recommend-shoubomv-info
                        h3 {{item.mvtitle | nospace}}
                        span {{item.singer_name | nospace}}
                        span 发行时间:{{item.pub_date | nospace}}
                        span 播放量:{{item.listennum | number }}
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { GetRecommend } from '@/services/ApiService';

export default {
    components: {
        swiper, swiperSlide
    },
    data() {
        return {
            // 轮播广告
            focus: null,
            // 热门歌曲
            hotdiss: null,
            // 热门MV
            shoubomv: null,
            // 排行榜
            toplist: null,
            swiperOption: {
                pagination: '.recommend-swiper-pagination',
                paginationClickable: true,
                centeredSlides: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false
            }
        }
    },
    activated() {
        this.getRecommend();
    },
    methods: {
        getRecommend() {
            GetRecommend()
                .then(res => {
                    const data = res.body.data;
                    if (res.status === 200) {
                        this.focus = data.focus;
                        this.hotdiss = data.hotdiss.list;
                        this.shoubomv = data.shoubomv.all;
                        this.toplist = data.toplist;
                    }
                })
        }
    },
    filters: {
        number(num) {
            return (num / 10000).toFixed(1) + '万'
        },
        nospace(str) {
            return str.trim();
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.recommend {
    background-color: #eaeaea;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.recommend-swiper-item {
    display: inline-block;
    img {
        width: 100%;
        display: block;
    }
}
.recommend-swiper-pagination {
    position: absolute;
    z-index: 1;
    text-align: center;
}
.recommend-segment {
    margin-top: 2%;
    background-color: #fff;
    position: relative;
    padding-top: 1.5%;
}
h3.recommend-segment-title {
    text-align: center;
    font-weight: 100;
    font-size: $fontSize;
    margin:0 0 1.5%;
}
.recommend-hotdiss-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    li {
        width: 45%;
        box-sizing: border-box;
        margin-bottom: 6px;
        .img {
            width: 100%;
            position: relative;
            img {
                width: 100%;
            }
            .img-listen-count {
                position: absolute;
                bottom: .6%;
                left: .6%;
                display: flex;
                align-items: center;
                img {
                    width: 4%;
                    height: 4%;
                    margin-right: 1%;
                }
                p {
                    color: #fff;
                }
            }
        }
        h3, p {
            margin: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: $fontSize;
        }
        h3 {
            color: #000;
            font-weight: 100;
        }
        p  {
            color: rgba(0, 0, 0, 0.5)
        }
    }
}
.recommend-shoubomv {
    background-color: transparent;
    > h3 {
        background-color: #fff;
        padding: 1.5% 0;
    }
    .recommend-shoubomv-list {
        .recommend-shoubomv-item {
            width: 95%;
            height: 150px;
            background-color: #fff;
            margin: 1% auto;
            padding: 0 1.5%;
            position: relative;
            a {
                display: block;
                width: 100%;
                height: 100%;
            }
            @mixin item-style {
                height: 90%;
                position: absolute;
                top: 50%;
                transform: translate(0, -50%);
            }
            img {
                width: 57%;
                border-radius: 5px;
                @include item-style
            }
            .recommend-shoubomv-info {
                width: 40%;
                @include item-style;
                right: 0;
                display: flex;
                flex-direction: column;
                span {
                    flex: 1;
                }
                h3 {
                    flex: 2;
                }
                * {
                    font-size: $fontSize;
                }
                h3 {
                    margin: 0;
                    font-weight: 600;
                    color: #000;
                }
                span {
                    color: rgba(0, 0, 0, 0.6)
                }
            }
        }
    }
}
</style>