<template lang="jade">
#playing-lyric(v-if="song.id")
    h2.song-name {{song.name}}
    .lyric(v-if="lyric")
        .scroll-penal(:style="offset")
            p(v-for="(item, index, order) in lyric", 
                :class="{ strong: order == nonius }",
                :key="index")
                {{item}}
    .lyric(v-else)
        span.error 未找到歌词
</template>

<script type="es6">
import { GetLyric } from '@/services/ApiService';
import { mapState } from 'vuex';
import Base64 from '@/utils/base64';

export default {
    data() {
        return {
            // 歌词数组
            lyric: null,
            // 歌词时间点数组
            keys: null,
            // 歌词当前播放位置
            nonius: 0,
            // 歌词前一次播放位置
            oldnonius: undefined,
            // 歌词将要修改到的播放位置
            newnonius: 0,
            offset: {
                transform: 'translate(0, 0)'
            }
        }
    },
    computed: mapState({
        song(state) {
            this.nonius = 0;
            return state.PlayingService.song;
        },
        currtime: state => state.PlayingService.currentTime,
        changTo: state => state.PlayingService.currentTime
    }),
    created() {
        this.getLyric();
    },
    watch: {
        song: function() {
            this.getLyric();
        },
        currtime: function() {
            if (!this.keys) return;
            this.updateLyricLoc(this.format(this.currtime));
        },
        changTo: function() {
            if (!this.keys) return;
            this.newnonius = 0;
            this.changeLyricLoc(this.format(this.changTo));
        }
    },
    methods: {
        getLyric() {
            if (this.song.id === undefined) return;
            const regex = /^\s+$/;
            GetLyric(this.song.id)
                .then(res => {
                    if (res.status !== 200)
                        return;
                    this.lyric = Base64
                        .decode(res.data.lyric)
                        .split('[')
                        .slice(5)
                        .map(str => {
                            let t = str.split(']');
                            return { [t[0]]: t[1] }
                        })
                        .filter(str => {
                            return !regex.test(Object.values(str)[0]);
                        })
                        .reduce((a, b) => {
                            return { ...a, ...b };
                        }, {});
                    this.keys = Object.keys(this.lyric).slice(1);
                })
        },
        updateLyricLoc(time) {
            if(time === '00:00.00' && 
               this.oldnonius >= this.keys.length - 1) {
                this.nonius = 0;
            }
            while (this.keys[this.nonius] < time) {
                this.nonius++;
                if (this.nonius === this.keys.length) break
            }
            if (this.oldnonius === this.nonius) return;
            this.oldnonius = this.nonius;
            this.offset = {
                transform: `translate(0,-${this.nonius * 35}px)`
            };
        },
        changeLyricLoc(time) {
            while (this.keys[this.newnonius] < time) {
                this.newnonius++;
                if (this.newnonius === this.keys.length) break
            }
            this.nonius = this.newnonius;
        },
        format(time) {
            return ('0' + parseInt(time / 60)).slice(-2) + ':' +
                ('0' + parseInt(time % 60)).slice(-2) + '.' +
                (time - parseInt(time)).toFixed(2).slice(-2);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#playing-lyric {
    width: 100%;
    height: 72%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    > * {
        margin: 0;
    }
    .song-name {
        font-size: $fontSize * 1.5;
        font-weight: 700;
        text-align: center;
    }
    .lyric {
        flex: 1;
        overflow: hidden;
        .error {
            font-size: $fontSize * 1.3;
            color: rgba(0, 0, 0, .5);
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
        }
        .scroll-penal {
            transition: transform .2s linear;
            overflow-y: auto;
            p {
                color: rgba(0, 0, 0, .5);
                font-size: 15px;
                text-align: center;
                margin: 10px;
                height: 25px;
                box-sizing: border-box;
            }
            .strong {
                color: rgba(0, 0, 0, .85);
                font-size: 17px;
            }
        }
    }
}
</style>