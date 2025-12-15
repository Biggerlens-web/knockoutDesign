<template>
    <div class="search_history" @click.stop="" @mousedown.prevent>
        <div class="search_history_title">
            <span class="title">
                {{ $t('searchHistory') }}
            </span>
            <span class="clear">
                {{ $t('clear') }}
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
        min-height: 142px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 24px 24px 24px 24px;
        padding: 20px;
        box-sizing: border-box;

        .search_history_title {
            display: flex;
            align-items: center;
            justify-content: space-between;


            .title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 14px;
                color: #333333;
            }

            .clear {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #6B42F2;
                cursor: pointer;
            }
        }

        .search_history_list {
            margin-top: 12px;
            display: flex;
            flex-wrap: wrap;

            column-gap: 10px;
            row-gap: 10px;
        }

        .search_history_item {
            height: 30px;
            text-align: center;
            line-height: 30px;
            flex-shrink: 0;
            padding: 0px 16px;
            background: #ECEAEE;
            border-radius: 10px 10px 10px 10px;
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 12px;
            color: #666666;
            cursor: pointer;
        }
    }
</style>