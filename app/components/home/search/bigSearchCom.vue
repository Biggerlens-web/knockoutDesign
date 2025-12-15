<template>
    <div class="big_search_box">
        <img class="search_icon" src="" alt="">
        <input class="search_input" type="text" placeholder="请输入搜索内容" name="" id="">
        <img class="search_del" src="" alt="">
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>


    .big_search_box {
        width: 800px;
        height: 80px;
        background: #FFFFFF;
        border-radius: 24px 24px 24px 24px;
        border: 2px solid #6B42F2;
        margin: 0 auto;
        margin-bottom: 32px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        column-gap: 6px;
        position: relative;

        .search_icon {
            width: 24px;
            height: 24px;
            cursor: pointer;
        }

        .search_input {
            width: calc(100% - 80px);
            border: none;
            outline: none;
        }

        .search_del {
            width: 24px;
            height: 24px;
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;
        }
    }
</style>