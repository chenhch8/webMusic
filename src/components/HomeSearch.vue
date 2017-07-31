<template lang="jade">
#search
    #search-input
        .input-search
            img(src="../assets/images/icon-search.png")
            form
                input(placeholder="搜索 歌曲/专辑/歌手"
                    @focus="btnShow = !btnShow"
                    @blur="btnShow = false"
                    v-model="searchKey")
        .input-btn(
            :class="{ 'input-btn-show': btnShow, 'input-btn-hide': !btnShow }"
            @touchend="btnShow = !btnShow")
                span  取消
    search-list(:searchResult="searchResult",
        @select="select($event)")
</template>

<script>
// import Rx from 'rx-lite'
import SearchList from '@/components/HomeSearchList'
import { Search } from '@/services/ApiService'

export default {
    components: {
        SearchList
    },
    data() {
        return {
            btnShow: false,
            searchKey: '',
            searchResult: null
        }
    },
    methods: {
        select(param) {
            this.searchKey = param.name;
            this.searchResult = null;
            // TODO 搜索
        },
        search() {
            search(this.searchKey)
                .then(res => {
                    console.log('res:', res);
                })
        }
    },
    // watch: {
    //     searchKey: function() {
    //         this.search();
    //     }
    // }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

$bgColor: #eee;
#search {
    display: flex;
    // flex-direction: column;
    height: 8%;
    align-items: center;
}
#search-input {
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    > div {
        height: 90%;
    }
}
.input-search {
    background-color: $bgColor;
    margin: 10px;
    border-radius: 10px;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 4px;
    overflow: hidden;
    img {
       width: 30px;
       height: 30px;
    }
    form {
        flex: 1;
        outline: none;
        background-color: $bgColor;
    }
    input {
        background-color: $bgColor;
        width: 100%;
        border: 0;
        outline: none;
    }
}
.input-btn {
    font-size: $fontSize;
    transition: width .3s;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    span {
        position: absolute;
        white-space: nowrap;
        top: 50%; left: 40%;
        transform: translate(-50%, -50%);
    }
}
.input-btn-hide {
    width: 0px;
}
.input-btn-show {
    width: 10%;
}
</style>