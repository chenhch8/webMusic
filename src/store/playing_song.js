import * as playing from '@/config/playing';

function format(song) {
    return {
        name: song.name,
        singers: song.singers,
        albummid: song.albummid
    }
}

export default {
    state: {
        playing: false,
        // 歌曲当前播放时间
        currentTime: 0,
        // 歌曲总时长
        duration: 0,
        // 修改当前播放时间到指定的时间
        changeTo: 0,
        // 歌曲播放模式
        playMode: playing.SEQUENTIAL,
        // 播放歌曲的下标
        index: 0,
        // 播放歌曲相关信息
        song: {
            name: playing.DEFAULT_SONG_NAME,
            singer: ''
        },
        // 当前所处歌单，true为like，false为cache
        place: false,
        // 缓存列表
        cache: [],
        // 喜爱列表
        like: [],
        // 歌曲列表
        songList: {},
    },
    getters: {
        songUrl(state) {
            return state.song.id && `http://ws.stream.qqmusic.qq.com/${state.song.id}.m4a?fromtag=46` ||
                undefined;
        },
        cacheList(state) {
            return state.cache.map(id => Object.assign({}, state.songList[id], { id }));
        },
        likeList(state) {
            return state.like.map(id => Object.assign({}, state.songList[id], { id }));
        },
        // 播放歌曲的图片地址
        coverImgUrl(state) {
            return state.song.albummid && `
                https://y.gtimg.cn/music/photo_new/T002R500x500M000${state.song.albummid}.jpg` ||
                playing.DEFAULT_IMG;
        },
        like(state) {
            return state.like.some(id => id === state.song.id);
        }
    },
    mutations: {
        // 初始化数据，恢复现场信息
        init(state) {
            let cache = window.localStorage.getItem('web-music-cache'),
                like = window.localStorage.getItem('web-music-like'),
                songList = window.localStorage.getItem('web-music-songList'),
                songid = window.localStorage.getItem('web-music-songid');
            if (songList) {
                state.songList = JSON.parse(songList);
                if (like) {
                    state.like = JSON.parse(like);
                    state.place = state.like.some((id, i) => {
                        if (id == songid)
                            state.index = i;
                        return id == songid;
                    });
                }
                if (cache) {
                    state.cache = JSON.parse(cache);
                    state.place = !state.cache.some((id, i) => {
                        if (id == songid)
                            state.index = i;
                        return id == songid;
                    });
                }
                if (songid !== null) {
                    state.song = Object.assign({}, state.songList[songid], { id: songid });
                }
            }
        },
        // 切换歌单
        switchList(state, flag) {
            state.place = flag;
        },
        // 设置立即播放歌曲
        setSong(state, song) {
            state.song = song;
            window.localStorage.setItem('web-music-songid', song.id);
            state.playing = true;
            state.place = false;
            if (state.cache.some((v, i) => {
                    if (v === song.id)
                        state.index = i;
                    return v === song.id;
                })) return;
            let tmp = {};
            tmp[song.id] = format(song);
            state.cache.push(song.id);
            state.index = state.cache.length - 1;
            state.songList = Object.assign({}, state.songList, tmp);
            window.localStorage.setItem('web-music-cache', JSON.stringify(state.cache));
            window.localStorage.setItem('web-music-songList', JSON.stringify(state.songList));
        },
        // 标记为喜欢/取消喜欢
        setLike(state, { songid, type }) {
            if (songid === undefined) return;
            if (type) {
                state.like.push(songid);
            } else {
                state.like = state.like.filter(id => id !== songid);
            }
            window.localStorage.setItem('web-music-like', JSON.stringify(state.like));
        },
        addLike(state, songid) {
            state.like.push(songid);
            window.localStorage.setItem('web-music-like', JSON.stringify(state.like));
        },
        addToSongList(state, song) {
            let ptr = -1;
            state.cache.some((v, i) => {
                if (v === song.id) ptr = i;
                return v === song.id;
            });
            if (ptr !== -1) return;
            if (!Array.isArray(song)) song = [song];
            song = song.reduce((list, song) => {
                state.cache.push(song.id);
                list[song.id] = format(song);
                return list;
            }, {});
            state.songList = Object.assign({}, state.songList, song);
            window.localStorage.setItem('web-music-songList', JSON.stringify(state.songList));
        },
        deleteFromsongList(state, { songid, type }) {
            let list1 = type && state.like || state.cache;
            const list2 = !type && state.like || state.cache;
            list1 = list1.filter(id => id !== songid);
            if (!list2.some(id => songid === id)) {
                let tmp = state.songList;
                delete tmp[songid];
                state.songList = tmp;
                window.localStorage.setItem('web-music-songList', JSON.stringify(state.songList));
            }
            if (songid === state.song.id) {
                if (list1.length) {
                    state.index %= list1.length;
                    state.song = Object.assign({}, state.songList[list1[state.index]], { id: list1[state.index] });
                    window.localStorage.setItem('web-music-songid', state.song.id);
                } else {
                    state.song = {
                        name: playing.DEFAULT_SONG_NAME
                    };
                    window.localStorage.removeItem('web-music-songid');
                    state.play = false;
                }
            }
            if (type) {
                state.like = list1;
                window.localStorage.setItem('web-music-like', JSON.stringify(list1));
            } else {
                state.cache = list1;
                window.localStorage.setItem('web-music-cache', JSON.stringify(list1));
            }
        },
        addToNextPlaySong(state, song) {
            let ptr = -1,
                list = state.place && state.like || state.cache;
            state.playMode = playing.SEQUENTIAL;
            list.some((v, i) => {
                if (v === song.id) ptr = i;
                return v === song.id;
            });
            if (ptr == -1) {
                let tmp = {};
                tmp[song.id] = format(song);
                list.splice(state.index + 1, 0, song.id);
                state.songList = Object.assign({}, state.songList, tmp);
                window.localStorage.setItem('web-music-songList', JSON.stringify(state.songList));
            } else {
                let tmp = list[ptr];
                if (ptr > state.index + 1) {
                    list.splice(ptr, 1);
                    list.splice(state.index + 1, 0, tmp);
                } else if (ptr < state.index) {
                    list.splice(ptr, 1);
                    list.splice(state.index--, 0, tmp);
                } else if (ptr === state.index) {
                    state.index--;
                }
            }
            if (state.song.id === undefined) {
                state.song = Object.assign({}, format(song), { id: song.id });
                state.playing = true;
                window.localStorage.setItem('web-music-songid', JSON.stringify(state.song.id));
            }
        },
        play(state) {
            if (state.song.id !== undefined) {
                state.playing = true;
            } else if (state.cache.length > 0) {
                state.place = false;
                state.index = 0;
                state.song = Object.assign({}, state.songList[state.cache[0]], { id: state.cache[0] });
                state.playing = true;
                window.localStorage.setItem('web-music-songid', JSON.stringify(state.song.id));
            }
        },
        pause(state) {
            state.playing = false;
        },
        playFront(state) {
            const list = state.place && state.like || state.cache;
            if (list.length <= 1) return;
            state.index = (state.index - 1 + list.length) % list.length;
            state.song = Object.assign({}, state.songList[list[state.index]], { id: list[state.index] });
            window.localStorage.setItem('web-music-songid', JSON.stringify(state.song.id));
        },
        playNext(state) {
            const list = state.place && state.like || state.cache;
            if (list.length <= 1) return;
            state.index = ++state.index % list.length;
            state.song = Object.assign({}, state.songList[list[state.index]], { id: list[state.index] });
            window.localStorage.setItem('web-music-songid', JSON.stringify(state.song.id));
        },
        playContinue(state, audio) {
            const list = state.place && state.like || state.cache;
            switch (state.playMode) {
                case playing.SINGLE:
                    break;
                case playing.SEQUENTIAL:
                    state.index = ++state.index % list.length;
                    break;
                default:
                    state.index = parseInt(Math.random() * list.length);
            }
            if (state.playMode === playing.SINGLE || list.length === 1) {
                audio.play();
                return;
            }
            let tmp = state.songList[list[state.index]];
            state.song = Object.assign({}, tmp, { id: list[state.index] });
            window.localStorage.setItem('web-music-songid', JSON.stringify(state.song.id));
        },
        changePlayMode(state) {
            state.playMode = (state.playMode + 1) % 3;
        },
        setDuration(state, duration) {
            state.duration = duration;
        },
        updateCurrentTime(state, time) {
            state.currentTime = time;
        },
        setCurrentTime(state, time) {
            state.changeTo = time;
        },
        // 从歌单中选择播放歌曲
        selectOneSongAndPlay(state, { songid, type }) {
            state.place = type;
            state.playing = true;
            if (songid === state.song.id) return;
            state.song = Object.assign({}, state.songList[songid], { id: songid })
            window.localStorage.setItem('web-music-songid', JSON.stringify(state.song.id));
        }
    }
}