<template lang="jade">
.home-bg
    search
    .content
        swiper.swiper-content(:options="swiperOption")
            swiper-slide.home-bg-swiper-slide
                recommend
            swiper-slide.home-bg-swiper-slide
                rank-list
            .swiper-pagination.swiper-pagination-bullets(slot="pagination")
    playing-bar
</template>

<script>
    import Search from '@/components/HomeSearch'
    import PlayingBar from '@/components/PlayingBar'
    import Recommend from '@/components/HomeRecommend'
    import RankList from '@/components/HomeRankList';

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    const TAB_NAME = ['推荐', '排行榜']

    export default {
        components: {
            Search, PlayingBar, swiper, swiperSlide,
            Recommend, RankList
        },
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    paginationBulletRender(swiper, index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`
                    }
                }
            }
        },
    }    
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.home-bg {
    height: 100%;
    width: 100%;
    position: relative;
}
.content {
    height: 86%;
    position: relative;
    background-color: #eaeaea;
}
.swiper-content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.swiper-pagination {
    top: 0;
    display: flex;
    z-index: 1;
    height: 5%;
}
.home-bg-swiper-slide {
    top: 5%;
    height: 95%;
}
.swiper-pagination-bullet-custom {
    flex: 1;
    height: 100%;
    line-height: 180%;
    position: relative;
    text-align: center;
    font-size: $fontSize;
    color: rgba(0, 0, 0, .3);
    border-radius: 0;
    opacity: 1;
    margin: 0 !important;
    background: #fff;
}
.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #000;
}
</style>