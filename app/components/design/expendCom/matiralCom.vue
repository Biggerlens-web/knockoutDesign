<template>
    <div class="material_com" v-show="!activeCateId">
        <div class="search_box" :class="{ 'search_input_focus': isFocus }">
            <img class="search_icon" src="" alt="">

            <input ref="searchInputRef" class="search_input" v-model="searchText" :placeholder="$t('searchTips')"
                @keyup.enter="handleSearch" @focus="isFocus = true" @blur="isFocus = false" />


            <img class="clear_icon" src="" alt="" @click.stop="clearSearchText" @mousedown.prevent
                v-show="isFocus || searchText">
            <designSearchHistory v-show="isFocus" class="search_history_position" @clearSearchHistory="clearSearchText"
                @searchHistoryItemClick="handleSearchHistoryItemClick" />
        </div>
        <div class="search_model" v-show="searchModelView">
            <ul class="search_result_ul" v-if="searchResultList.length">
                <li class="search_result_li" v-for="item in searchResultList" :key="item.id">
                    <img class="matiral_img" :src="item.cover" alt="">
                </li>
            </ul>
            <div class="empty_tips" v-else>

                <img class="empty_img" src="/img/noProjects.png" alt="">
                <p class="empty_text">
                    {{ $t('emptyContent') }}
                </p>
                <p class="change_search">
                    {{ $t('changeSearch') }}
                </p>

            </div>
        </div>

        <div class="cate_list" v-show="!searchModelView">
            <div class="cate_list_ul" v-for="item in cateList" :key="item.id">
                <div class="cate_title">
                    <span class="cate_name">
                        {{ item.name }}
                    </span>
                    <div class="more_btn" @click="handleMoreTypeClick(item.id)">
                        <span class="more_text">
                            {{ $t('all') }}
                        </span>
                        <img class="arrow_img" src="/img/arrowRight.png" alt=""></img>
                    </div>
                </div>
                <ul class="material_ul">
                    <li v-for="children in 4" :key="children" class="material_children">
                        <img class="matiral_img" src="" alt="">
                    </li>
                </ul>

            </div>
        </div>

    </div>
    <div class="cate_detail" v-show="activeCateId">
        <div class="cate_detail_title" @click="activeCateId = ''">
            <img class="arrow_img" src="/img/designLeftArrow.png" alt="">
            <span class="title_text">
                {{ activeCateName }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>

    import designSearchHistory from '@/components/design/designSearchHistory.vue'








    const cateList = ref<any[]>([
        {
            id: 1,
            name: '全部'
        },
        {
            id: 2,
            name: '物料'
        },
        {
            id: 3,
            name: '模板'
        },
        {
            id: 4,
            name: '物料'
        },
        {
            id: 5,
            name: '模板'
        },
        {
            id: 6,
            name: '物料'
        },
        {
            id: 6,
            name: '模板'
        },
        {
            id: 7,
            name: '物料'
        },
        {
            id: 8,
            name: '模板'
        },
    ])


    //点击分类
    const activeCateId = ref<number | string>('')
    const activeCateName = computed(() => {
        return cateList.value.find(item => item.id === activeCateId.value)?.name || ''
    })
    const handleMoreTypeClick = (id: number | string) => {
        activeCateId.value = id
    }


    const searchInputRef = ref<HTMLInputElement>()
    //搜索文本
    const searchText = ref<string>('')
    //搜索框聚焦
    const isFocus = ref<boolean>(false)
    //搜索
    const searchModelView = ref<boolean>(false)
    const handleSearch = () => {
        if (searchText.value) {
            console.log(searchText.value)
            searchModelView.value = true
            // 清空输入框
            searchInputRef.value?.blur()
        }
    }
    //清空搜索文本
    const clearSearchText = () => {
        searchText.value = ''
        searchModelView.value = false
    }
    //历史选择
    const handleSearchHistoryItemClick = (item: string) => {
        searchText.value = item
        handleSearch()
    }


    //搜索结果
    const searchResultList = ref<any[]>([])

</script>

<style lang="scss" scoped>
    .material_com {
        box-sizing: border-box;
        padding: 16px 0px;



        .search_box {
            display: flex;
            align-items: center;
            height: 40px;
            background: #FFFFFF;
            border-radius: 12px 12px 12px 12px;
            border: 1px solid #EEEEEE;
            box-sizing: border-box;
            padding: 0 16px;
            column-gap: 10px;
            padding-right: 32px;
            position: relative;

            .search_history_position {
                position: absolute;
                top: 120%;
                left: 0px;
                z-index: 3;

            }

            .search_icon {
                width: 16px;
                height: 16px;
            }

            .clear_icon {
                position: absolute;
                top: 50%;
                right: 16px;
                transform: translateY(-50%);
                width: 16px;
                height: 16px;
                cursor: pointer;
            }

            .search_input {
                flex: 1;
                min-width: 0;
                border: none;
                outline: none;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #999999;
            }


        }

        .search_input_focus {
            border-color: #6B42F2;
        }



        .search_model {

            .search_result_ul {
                margin-top: 12px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                column-gap: 9px;
                row-gap: 9px;

                .search_result_li {
                    cursor: pointer;
                    height: 66px;
                    background: #FAFAFA;
                    border-radius: 12px 12px 12px 12px;

                    .matiral_img {
                        height: 100%;
                        width: auto;
                    }
                }
            }

            .empty_tips {

                margin: 0 auto;
                width: max-content;
                margin-top: 180px;
                display: flex;
                flex-direction: column;
                align-items: center;

                .empty_img {
                    width: 60px;
                    height: 60px;
                    margin-bottom: 16px;
                }

                .empty_text {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #666666;
                    margin-bottom: 6px;
                }

                .change_search {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #666666;
                }

            }
        }

        .cate_list {

            margin-top: 20px;

            .cate_list_ul {

                .cate_title {

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .cate_name {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 14px;
                        color: #333333;
                        white-space: nowrap;
                    }

                    .more_btn {
                        display: flex;
                        align-items: center;
                        column-gap: 4px;
                        cursor: pointer;

                        .more_text {
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 400;
                            font-size: 12px;
                            color: #333333;
                        }

                        .arrow_img {
                            width: 12px;
                            height: 12px;
                        }

                    }
                }

                .material_ul {
                    margin-top: 12px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    column-gap: 9px;
                    row-gap: 9px;

                    .search_result_li {
                        cursor: pointer;
                        height: 66px;
                        background: #FAFAFA;
                        border-radius: 12px 12px 12px 12px;

                        .matiral_img {
                            height: 100%;
                            width: auto;
                        }
                    }
                }
            }
        }
    }

    .cate_detail {
        padding: 16px 0px;

        .cate_detail_title {
            width: max-content;
            display: flex;
            align-items: center;
            column-gap: 6px;
            cursor: pointer;

            .arrow_img {
                width: 16px;
                height: 16px;
            }

            .title_text {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
            }
        }
    }
</style>