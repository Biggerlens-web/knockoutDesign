<template>
    <div class="search_history">
        <div class="search_history_title">
            <span class="title">
                最近搜索
            </span>
            <span class="clear">
                清空
            </span>
        </div>
        <ul class="search_history_list">
            <li class="search_history_item" v-for="item in searchHistoryList" :key="item.name">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    interface SearchHistoryItem {

        name: string
    }
    const searchHistoryList = ref<SearchHistoryItem[]>([
        {

            name: '搜索1',
        },
        {

            name: '搜索2',
        },
        {

            name: '搜索3',
        },
    ])

</script>

<style lang="scss" scoped>
    .search_history {
        width: 100%;
        height: 200px;
        background-color: #ffffff;
        border-radius: 20px;
        border: 1px solid #000;

        .search_history_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;

            .title {
                font-size: 16px;
                font-weight: bold;
            }

            .clear {
                font-size: 14px;
                font-weight: bold;
            }
        }

        .search_history_list {
            display: flex;
            flex-wrap: wrap;
            padding: 20px;
            column-gap: 10px;
            row-gap: 10px;
        }

        .search_history_item {
            flex-shrink: 0;
            padding: 5px 10px;
            border-radius: 10px;
            border: 1px solid #000;
            font-size: 14px;
        }
    }
</style>