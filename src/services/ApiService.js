import Vue from 'vue';
import API from '@/config/api';

export {
    Search,
    GetRecommend,
    GetRankList,
    GetRankSongs,
    GetLyric
}

function Search(key) {
    return apiFactory(API.search)(key);
}

function GetRecommend() {
    return apiFactory(API.recommend)();
}

function GetRankList() {
    return apiFactory(API.rank_list)();
}

function GetRankSongs(id) {
    return apiFactory(API.rank_songs)(id);
}

function GetLyric(id) {
    return Vue.http.jsonp('https://api.darlin.me/music/lyric/' + id + '/', {
        jsonp: 'callback'
    })
}

function apiFactory(api) {
    return (id = null) => Vue.http.jsonp(
        api.url, {
            params: api.params(id),
            jsonp: 'jsonpCallback'
        }
    );
}