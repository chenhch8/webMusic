/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		7: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "js/" + chunkId + ".bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTRweCcgaGVpZ2h0PSc1NHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9InVpbC1kZWZhdWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDAwMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwMDAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjA4MzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDAwMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuMTY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMDAwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDkwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4yNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwMDAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMTIwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC4zMzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDAwMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjQxNjY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMDAwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwMDAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMjEwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC41ODMzMzMzMzMzMzMzMzM0cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjMDAwMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nMXMnIGJlZ2luPScwLjY2NjY2NjY2NjY2NjY2NjZzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMDAwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDI3MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuNzVzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyMwMDAwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDMwMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScxcycgYmVnaW49JzAuODMzMzMzMzMzMzMzMzMzNHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzAwMDAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMzMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9JzFzJyBiZWdpbj0nMC45MTY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PC9zdmc+"

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = VueLazyload;

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playing_song__ = __webpack_require__(12);

// import Vuex from 'vuex';



// Vue.use(Vuex);

/* harmony default export */ __webpack_exports__["a"] = (new Vuex.Store({
    modules: {
        PlayingService: __WEBPACK_IMPORTED_MODULE_1__playing_song__["a" /* default */]
    }
}));

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_playing__ = __webpack_require__(2);


function format(song) {
    return {
        name: song.name,
        singers: song.singers,
        albummid: song.albummid
    }
}

/* harmony default export */ __webpack_exports__["a"] = ({
    state: {
        playing: false,
        // 歌曲当前播放时间
        currentTime: 0,
        // 歌曲总时长
        duration: 0,
        // 修改当前播放时间到指定的时间
        changeTo: 0,
        // 歌曲播放模式
        playMode: __WEBPACK_IMPORTED_MODULE_0__config_playing__["SEQUENTIAL"],
        // 播放歌曲的下标
        index: 0,
        // 播放歌曲相关信息
        song: {
            name: __WEBPACK_IMPORTED_MODULE_0__config_playing__["DEFAULT_SONG_NAME"],
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
                __WEBPACK_IMPORTED_MODULE_0__config_playing__["DEFAULT_IMG"];
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
                        name: __WEBPACK_IMPORTED_MODULE_0__config_playing__["DEFAULT_SONG_NAME"]
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
            state.playMode = __WEBPACK_IMPORTED_MODULE_0__config_playing__["SEQUENTIAL"];
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
                case __WEBPACK_IMPORTED_MODULE_0__config_playing__["SINGLE"]:
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__config_playing__["SEQUENTIAL"]:
                    state.index = ++state.index % list.length;
                    break;
                default:
                    state.index = parseInt(Math.random() * list.length);
            }
            if (state.playMode === __WEBPACK_IMPORTED_MODULE_0__config_playing__["SINGLE"] || list.length === 1) {
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
});

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/f29e5041.Vue_Music_Blur.png";

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = MuseUI;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);



// 改写路由原方法
const $go = __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a.prototype.go;
const $push = __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a.prototype.push;
__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a.prototype.go = function(n, mode = 'right') {
    this.mode = mode;
    $go.call(this, n);
};
__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a.prototype.push = function(location, mode = 'left', onComplete = null, onAbort = null) {
    /* mode支持四种类型：up/down/left/right */
    this.mode = mode;
    $push.call(this, location, onComplete, onAbort)
};

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);

const routes = [{
        path: '/',
        name: 'App',
        component: resolve => __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(20)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
        // meta: {
        //     keepAlive: true
        // },
        children: [{
            path: '',
            name: 'Home',
            component: resolve => __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(21)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/musicplaying/:musicid',
            name: 'MusicPlaying',
            component: resolve => __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(22)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/hotdiss/:dissid',
            name: 'HotDiss',
            component: resolve => __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(23)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
            // meta: {
            //     keepAlive: true
            // }
        }, {
            path: '/mvplaying/:mvid',
            name: 'MvPlaying',
            component: resolve => __webpack_require__.e/* require */(6).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(24)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
            meta: {
                keepAlive: false
            }
        }, {
            path: '/ranksongs/:rankid',
            name: 'RankSongs',
            component: resolve => __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(25)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe),
            // meta: {
            //     keepAlive: false
            // }
        }, {
            path: '/playinglist',
            name: 'PlayingList',
            component: resolve => __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(26)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe)
        }]
    },
    { path: '*', redirect: '/' }
];

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
    routes,
    // mode: 'history'
}));

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = VueRouter;

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 199:
/***/ (function(module, exports) {

module.exports = Rx;

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const PLAY_MODE_IMG = [
    __webpack_require__(3),
    __webpack_require__(4),
    __webpack_require__(5)
]
/* harmony export (immutable) */ __webpack_exports__["PLAY_MODE_IMG"] = PLAY_MODE_IMG;

const PLAY_MODE_NAME = ['单曲循环', '顺序播放', '随机播放']
/* harmony export (immutable) */ __webpack_exports__["PLAY_MODE_NAME"] = PLAY_MODE_NAME;

const SINGLE = 0
/* harmony export (immutable) */ __webpack_exports__["SINGLE"] = SINGLE;

const SEQUENTIAL = 1
/* harmony export (immutable) */ __webpack_exports__["SEQUENTIAL"] = SEQUENTIAL;

const RANDOM = 2
/* harmony export (immutable) */ __webpack_exports__["RANDOM"] = RANDOM;

const DEFAULT_IMG = __webpack_require__(13)
/* harmony export (immutable) */ __webpack_exports__["DEFAULT_IMG"] = DEFAULT_IMG;

const DEFAULT_SONG_NAME = 'MUSIC'
/* harmony export (immutable) */ __webpack_exports__["DEFAULT_SONG_NAME"] = DEFAULT_SONG_NAME;

const types = {
    ALBUM: 10002,
    CD: 10014,
    JUMP: 3002
}
/* harmony export (immutable) */ __webpack_exports__["types"] = types;


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDgyNzI3NzIzOTkxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEyMDggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwMTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjM1LjkzNzUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik02Ni4yOTc0MzYgNjkwLjQ2NDgyMWMyMi43MTE3OTUtNi4zMDE1MzggMzUuOTk3NTM4LTI5LjgyNzI4MiAyOS42OTYtNTIuNTEyODIxLTcuMDYyOTc0LTI1LjQ2ODcxOC0xMC42NjAxMDMtNTEuOTA4OTIzLTEwLjY2MDEwMy03OC42Mzc5NDkgMC0xNjEuNTgxOTQ5IDEzMS40NjU4NDYtMjkzLjA0Nzc5NSAyOTMuMDQ3Nzk1LTI5My4wNDc3OTVsMTczLjcxMjQxIDBjMS43ODU0MzYtMjkuNTEyMjA1IDcuMDYyOTc0LTU4LjEwNTQzNiAxNS40MTI1MTMtODUuMzMzMzMzTDM3OC4zNTQ4NzIgMTgwLjkzMjkyM2MtMTAxLjA2MDkyMyAwLTE5Ni4wODI4NzIgMzkuMzU4MzU5LTI2Ny41NTI4MjEgMTEwLjgyODMwOEMzOS4zNTgzNTkgMzYzLjIzMTE3OSAwIDQ1OC4yNTMxMjggMCA1NTkuMzE0MDUxYzAgMzQuNDQ4NDEgNC42NDczODUgNjguNTgxNzQ0IDEzLjc4NDYxNSAxMDEuNDgxMDI2IDUuMjUxMjgyIDE4Ljg3ODM1OSAyMi4zOTY3MTggMzEuMjQ1MTI4IDQxLjA5MTI4MiAzMS4yNDUxMjhDNTguNjMwNTY0IDY5Mi4wNDAyMDUgNjIuNDkwMjU2IDY5MS41NDEzMzMgNjYuMjk3NDM2IDY5MC40NjQ4MjF6IiBwLWlkPSIyMDE1IiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTY4NC42MDk2NDEgODE5LjYyMDEwMyAyODcuNTMzOTQ5IDgxOS42MjAxMDNsMC03NS41OTIyMDVjMC0yNC4yNjA5MjMtMTYuODgyODcyLTMzLjY2MDcxOC0zNy40OTQxNTQtMjAuODczODQ2bC0xODEuOTMwNjY3IDExMi42OTI1MTNjLTIwLjYxMTI4MiAxMi43ODY4NzItMjAuODIxMzMzIDM0LjAwMjA1MS0wLjQ0NjM1OSA0Ny4xNTY1MTNsMTgyLjc5NzEyOCAxMTguMDc1MDc3YzIwLjM3NDk3NCAxMy4xNTQ0NjIgMzcuMDQ3Nzk1IDQuMDY5NzQ0IDM3LjA0Nzc5NS0yMC4xNjQ5MjNsMC03NS45NTk3OTUgMzk3LjA3NTY5MiAwYzEwMS4wNjA5MjMgMCAxOTYuMDgyODcyLTM5LjM1ODM1OSAyNjcuNTUyODIxLTExMC44MjgzMDggNDUuNTgxMTI4LTQ1LjU4MTEyOCA3OC4wODY1NjQtMTAwLjcxOTU5IDk1LjY3ODM1OS0xNjAuOTI1NTM4LTMxLjUwNzY5MiAxMS43ODkxMjgtNjUuMDYzMzg1IDE5LjM3NzIzMS05OS45ODQ0MSAyMi4xMDc4OTdDOTAwLjA5NiA3NTIuNTM0OTc0IDgwMC4wMzI4MjEgODE5LjYyMDEwMyA2ODQuNjA5NjQxIDgxOS42MjAxMDN6IiBwLWlkPSIyMDE2IiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTkxOC45NzQzNTkgMGMtMTU5LjUwNzY5MiAwLTI4OC44MjA1MTMgMTI5LjMxMjgyMS0yODguODIwNTEzIDI4OC44MjA1MTNzMTI5LjMxMjgyMSAyODguODIwNTEzIDI4OC44MjA1MTMgMjg4LjgyMDUxM1MxMjA3Ljc5NDg3MiA0NDguMzI4MjA1IDEyMDcuNzk0ODcyIDI4OC44MjA1MTMgMTA3OC40ODIwNTEgMCA5MTguOTc0MzU5IDB6TTk3Mi41Mzc0MzYgNDQyLjQ3MzAyNmwtNTUuMjk2IDAgMC0yMTguMjk1Nzk1Qzg5Ni45MTg5NzQgMjQyLjYwOTIzMSA4NzEuMzk3NzQ0IDI1Ni4zMTUwNzcgODQwLjIwNTEyOCAyNjUuMjk0NzY5bDAtNTQuODIzMzg1YzE1LjEyMzY5Mi0zLjc4MDkyMyAzMS4xOTI2MTUtMTAuMzk3NTM4IDQ4LjIwNjc2OS0xOS44NDk4NDYgMTcuMDE0MTU0LTEwLjM5NzUzOCAzMS4xOTI2MTUtMjEuMjY3NjkyIDQyLjUzNTM4NS0zMy4wODMwNzdsNDEuNTkwMTU0IDBMOTcyLjUzNzQzNiA0NDIuNDczMDI2eiIgcC1pZD0iMjAxNyIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAADwUlEQVRo3u2aa0hTYRiAX8cuBjtOd3NaztnF1pqzrB+SFEVgUGlEBFIE60JMS1fWRi38oX8UQgQJin5UZLliF3EXdWzTdMtVolmrzCbRryC7QfOHYXT6czbmMozcOcfm98CB79vtfZ/vG9959zIABAKBQCAQCAQC8V/jc9skeTKpK08mdbls91fSnQ/pGPRn1ACAAwCOYdxhu7lNTndOpOL32MU8XtrQkpL2OExSAT8jgKSXiDROhnTKfC+40tJY6vI82PV0NFj0YfKjeGZmhk2R9+rYCYZxR+zmtrLtu/a/JyVafZ3+UHaWpB8AQkCsNN2XQadVL9Trtx32ex3iSq3+avDFK1XcKk+QsrJ/ZtYOC/gZj+yWO2Vbduz5lLAI3Z33VsceGAAQyhSLfGerNVVOa3s+VaZ2c5scw7jRnRXwMwIeh0ma0CCDfU6hUMCPyrLZ7JcXztcco0oyTnaYVFkAgE0bC42RIDxe2lCn6bYiaWWbmxrKgTicmEzmmNV4U0m1bG+XZQUlsgAAq/Jk3ZFA2lMnT1MtCwBwSX9WTYmsxXhDBcTuYhh3+PWzQQYdwo/7e/gqpcKiUiosXqeZHFkAgJqqE9HT8HDFgXo6ZKmE8XQ0GJ1sLSnupzsh0oUn3r6LThTyta/oToh04XB4KjKeEIkEiatiFhEGnVa9PFvSZ9Bp1cBms3EAwDkcTnDBn7xISU3lBAlHnHFOW3k8S5I5UFujaaE7MTJ4PfqQMT39PRUAgMVk0p0O+fjcNgkQd6HsLAlOyz2XSsbG30QbB6vyciHphQf8j7ZFxhsKC8gL5PPYJUqFvEOlVFieDPSk0yE7/myQEVOfh4iqMvG4HSaZSCR8SATCiTqZcmqrNZpIDsTvBXJk47uOfa6OFVTLWo03lUwmc4zII9TcVF9OiayNhharzXRbnp7Oizb1NxcVGpNW1qDTqokiCgcAXCjgBwb7nEKyZXEqZZ3W9vzaao0mUyzyQUyXVcDPCHR1tM9qBs7bl54Pv9ch3nfwSOfnL1+LI4+xWCxYtix1hArZb9/CacRwVoe1YP2659daL1eW7Nw7mdCAF3XaY7AIetbEFcqSZPY31OkrSFvh3m7rrF4U1YIsFutlzvJsb9nu0uYrLY2l8+W74K80AIDN3CY/fLTybjg8VQQAgGFcuHW9FeT5azh/8/4UgJ/RCR5X/aXEPDcHik1bfyTC4Z+k47qOuNthktGSDI3SgSUp7fc6xHTnRak08f+N5MZuuSPPlea4c6U57qTfYQQCgUAgEIi5+AWII/KTr3UwFwAAAABJRU5ErkJggg=="

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAADg0lEQVRo3u2Z309SYRjHH4rB8YATEOSqm2h1Y+nWLDRnW6a2DJEIQQkbU6eOytTlumg5u8jNtbE5dVj+SIOMBVsey+WmKx0zNy39H7pKV92rG11wDh6JCDkHDh3fz3Y22Hl/PF/e5333vF8AEAgEAoFAIBCIf9La3HBGKpWMNdrrz3IdS0rIwDAPAAQBgLDW1lzgOp6kY7OatQCwfqhE63VXK5DoQyK6hxS8T7TA0dKU+2z0RffOzo6YyQQ4jv/Kzzu9YDEZ393t6PrJZCy/96V4fNJzaXXta/nm5pYmGAwmMswxAMinfZ9psNt66CcbWw9RqD1nD3ycO5JIlPVWi1YgEBAsxxQEgCCO4xOsrTCJjvqQna0YGh0eaK++Ubcdb+eS4qLapcByF21lNgDgGxvxAMCMzWp+woLGECuBBYGjpSlXKBS+AfIXzcyUjvm9blE8/Q36a2VAO2iulF+ueut7FVffaJB7Npx15EHGPr7Xk2KFQj5ITSaXyVwLczNHY/Xpd/YpAIBKY6KjzXGKSQyk2PB4SRNLMUv4hHKZzEWJ1miOP4rVXp2jclJtzabrF/8rsRR+r1tEPxAN1bqyaO2MhqpSqk2OSulkMqf9lrWAE7EUzqe9SnoArgFnFv39iGsgM9b7g0KvpVMulkKvq6wggwiqlMr+tZVFAfVOrc4JpzIbATpaGnMzMMxD1tTcsLayKFAplf17wiorAACMBn04lUM/xCcBk3nSCjJVw6lbb7VogcVUTkvoqU1/qBXnHZGpDVH2NO+439F2gi64s/3OSa5jSir0Uxn4vsL0Uxn4vocjC4w6i6kY+HxK7y8wQitKlpr8S23y2hdHpcU8tZub7HkZGOZpsNu48aX7eh+rgaNaOuXG3bR/SoRh4jhuS3uHGXlNTBjOfOlZwiekmwAHuQ9baowlTOZOuUUb6XjIsrJc8x+Igzke924zcjxSInp5af4PT0sqlTDytKb9Uwl7WjF96edjEw+3t7dxFnSHXUKFQj40OjzYbjDF71oWFxXeDCx/7gR2XMvovjSO4xMAf/dyE3gI7fmChH1pWxJ9aYlEEvKlh0fGu3d3d1n558F8w/C+rfPBDyZj+b1u0fiku3R19Uv5980tDYOh6L70hs1qbmUSV1oT4Uuvc+ZxpVAstS2QWN4Q4UvzWyzAvlqa/2IB0sSXRiAQCAQCgUAcFn4DdCYHcsauye4AAAAASUVORK5CYII="

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),

/***/ 68:
/***/ (function(module, exports) {

module.exports = Vuex;

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_scss_app_scss__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_scss_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_scss_app_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_lazyload__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_muse_ui__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_muse_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_muse_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_muse_ui_dist_muse_ui_css__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_muse_ui_dist_muse_ui_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__lib_muse_ui_dist_muse_ui_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router__ = __webpack_require__(16);










__WEBPACK_IMPORTED_MODULE_1_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_muse_ui___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vue_lazyload___default.a, {
    error: __webpack_require__(1),
    loading: __webpack_require__(1),
    attempt: 1
});

new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
    router: __WEBPACK_IMPORTED_MODULE_6__router__["a" /* default */],
    store: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */],
    // render: h => h(App)
}).$mount('#app');

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 9:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });