<template lang="jade">
#search-list(v-show="searchResult")
    ul(@click.stop="select($event)")
        li.list-item(v-for="(item, index) in searchResult"
            @touchstart="currPtr = index"
            @touchend="currPtr = -1",
            :class="{ 'btn-active': currPtr == index }",
            :title="item.id + '&' + item.name")
            img(src="../assets/images/icon-search.png")
            div {{item.name}}
</template>

<script>
export default {
    props: {
        searchResult: Array 
    },
    data() {
        return {
            currPtr: -1
        }
    },
    methods: {
        select(event) {
            if (!event.target.title) return;
            const info = event.target.title.split('&');
            this.$emit('select', { id: info[0], name: info[1]});
        }
    }
}
</script>

<style lang="scss">
#search-list {
    width: 92%;
    position: relative;
    margin: 0 auto;
    max-height: 85vh;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 0 15px 1px grey;
}
.list-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    img {
        width: 4vh;
        height: 4vh;
    }
    div {
        display: inline-block;
        margin-left: 10px;
    }
}
.btn-active {
    background-color: rgba(0, 0, 0, .1);
}
</style>