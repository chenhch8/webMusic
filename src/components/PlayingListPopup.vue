<template lang="jade">
mu-popup(position="bottom",
    :open="open",
    @close="close"
    popupClass="popup-bottom"
    v-if="song")
    .popup-content
        mu-list.btn-list
            mu-list-item(disabled)
                p 《{{song.name}}》
            mu-divider
            div(v-if="!song.type")
                mu-list-item(@click.prevent.stop="setLike")
                    p 添加为喜欢
                mu-divider
            mu-list-item(@click.prevent.stop="deleteSong")
                p 删除
            mu-divider
        mu-list.btn-list
            mu-list-item(@click.stop="close")
                p 取消
</template>

<script type="es6">
import { mapMutations} from 'vuex';

export default {
    props: {
        open: {
            type: Boolean,
            default: false,
            require: true
        },
        song: {
            type: Object,
            require: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        ...mapMutations([
            'addLike', 'deleteFromsongList'
        ]),
        setLike() {
            this.addLike(this.song.id);
            this.close();
        },
        deleteSong() {
            this.deleteFromsongList({
                songid: this.song.id,
                type: this.song.type
            });
            this.close();
        }
    }
}
    
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.popup-bottom {
    width: 100%;
    max-width: 415px;
}

.popup-content {
    width: 100%;
    background-color: #eaeaea;
    * {
        margin:0;
        padding: 0 !important;
    }
    p {
        text-align: center;
        font-size: $fontSize * 1.4;
        font-weight: 600;
        height: 4.5%;
        line-height: 4.5%;
    }
    .btn-list {
        background-color: #fff;
    }
    .btn-list:nth-child(1) {
        margin-bottom: 1%;
    }
}
</style>