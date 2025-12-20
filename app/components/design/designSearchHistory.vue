<template>
    <div class="design_search_history" @click.stop="" @mousedown.prevent>
        <div class="design_search_history_title">
            <span class="title_text">
                {{ $t('searchHistory') }}
            </span>
            <span class="clear_text" @click="emit('clearSearchHistory')">
                {{ $t('clear') }}
            </span>
        </div>
        <div class="design_search_history_list">
            <div v-for="item in searchHistoryList" :key="item" class="design_search_history_item"
                @click="emit('searchHistoryItemClick', item)">
                {{ item }}
            </div>
        </div>
        <div class="hot_search_history">
            <p class="hot_search_history_title">
                {{ $t('hotSearch') }}
            </p>
            <div class="hot_search_history_list">
                <div v-for="item in hotSearchList" :key="item" class="hot_search_history_item">
                    <span @click="emit('searchHistoryItemClick', item)">
                        {{ item }}
                    </span>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const emit = defineEmits<{
        (e: 'clearSearchHistory'): void
        (e: 'searchHistoryItemClick', item: string): void
    }>()






    const searchHistoryList = ref<Array<string>>([
        '123',
        '456',
        '789',
    ])

    const hotSearchList = ref<Array<string>>([
        '123',
        '456',
        '789',
    ])

</script>

<style lang="scss" scoped>
    .design_search_history {
        box-sizing: border-box;
        padding: 20px 16px;
        width: 100%;
        min-height: 276px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 12px 12px 12px 12px;

        .design_search_history_title {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #999999;
            }

            .clear_text {
                cursor: pointer;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 12px;
                color: #6B42F2;
            }
        }

        .design_search_history_list {
            margin-top: 12px;
            display: flex;
            flex-wrap: wrap;
            column-gap: 10px;
            row-gap: 10px;

            .design_search_history_item {
                box-sizing: border-box;
                height: 26px;
                padding: 0 10px;
                line-height: 26px;
                background: #F7F6FA;
                border-radius: 6px 6px 6px 6px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                cursor: pointer;

                &:hover {
                    background: #ECEAEE;
                    color: #333333;
                }
            }
        }

        .hot_search_history {
            margin-top: 24px;

            .hot_search_history_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #999999;
                margin-bottom: 12px;
            }

            .hot_search_history_list {
                display: flex;
                flex-direction: column;
                row-gap: 12px;

                .hot_search_history_item {

                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 11px;
                    color: #333333;

                    span {
                        cursor: pointer;
                    }
                }
            }
        }

    }
</style>