<template>
    <div class="template_com">
        <div class="search_box" :class="{ 'search_input_focus': isFocus }">
            <img class="search_icon" src="" alt="">

            <input ref="searchInputRef" class="search_input" v-model="searchText" :placeholder="$t('searchTips')"
                @keyup.enter="handleSearch" @focus="isFocus = true" @blur="isFocus = false" />


            <img class="clear_icon" src="" alt="" @click.stop="clearSearchText" @mousedown.prevent
                v-show="isFocus || searchText">
            <designSearchHistory v-show="isFocus" class="search_history_position" @clearSearchHistory="clearSearchText"
                @searchHistoryItemClick="handleSearchHistoryItemClick" />
        </div>

        <div class="template_list" v-if="templatesList.length > 0">
            <div class="list_title">
                <span class="title_text">
                    {{ $t('hotTemplate') }}
                </span>
                <div class="more_type" @click="handleMoreTypeClick">
                    <span>
                        {{ $t('category') }}
                    </span>
                    <img src="/img/arrowRight.png" alt=""></img>

                </div>

            </div>
            <ul class="list_box">
                <li v-for="(item, index) in templatesList" :key="index" class="template_item">
                    <img :src="item.coverUrl" alt="">
                </li>
            </ul>
            <div class="more_tips" ref="moreTipsRef">
                <loadingCom v-if="!isFinished" />
                <span v-else>
                    {{ $t('nomore') }}
                </span>

            </div>
        </div>
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
</template>

<script lang="ts" setup>
    import loadingCom from '../../loadingCom.vue'
    import designSearchHistory from '../designSearchHistory.vue'
    const stores = useMainStore()
    const { templateTypeSelectX, templateTypeSelectY, isShowTemplateTypeSelect } = storeToRefs(stores)

    //加载更多
    const moreTipsRef = ref<HTMLElement | null>(null)
    const isLoading = ref(false)
    const isFinished = ref(false)
    let observer: IntersectionObserver | null = null

    const loadMore = () => {
        if (isLoading.value || isFinished.value) return
        isLoading.value = true
        setTimeout(() => {
            const newItems = [
                {
                    coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/DA168404-EAD9-4F73-BA45-0E94A0189975'
                },
                {
                    coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/2579A9A9-45F7-424E-8803-388767DEE2E5'
                },
                {
                    coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/66ED5CAB-766C-4A36-8602-ED646C82F9ED'
                },
                {
                    coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/B32E7C30-ED8C-40DD-AC7A-C92F3B3034ED'
                }
            ]
            templatesList.value.push(...newItems)
            if (templatesList.value.length > 20) {
                isFinished.value = true
            }
            isLoading.value = false
        }, 1000)
    }



    const searchInputRef = ref<HTMLInputElement>()

    //搜索文本
    const searchText = ref<string>('')
    //搜索框聚焦
    const isFocus = ref<boolean>(false)
    //搜索
    const handleSearch = () => {
        if (searchText.value) {
            console.log(searchText.value)
            // 清空输入框
            searchInputRef.value?.blur()
        }
    }
    //清空搜索文本
    const clearSearchText = () => {
        searchText.value = ''

    }

    //历史选择
    const handleSearchHistoryItemClick = (item: string) => {
        searchText.value = item
        handleSearch()
    }



    //点击分类
    const handleMoreTypeClick = (e: MouseEvent) => {
        e.stopPropagation()
        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        templateTypeSelectX.value = rect.left + window.scrollX + rect.width
        templateTypeSelectY.value = rect.top + window.scrollY - 70
        isShowTemplateTypeSelect.value = true
    }




    const templatesList = ref<any>([


        {
            coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/DA168404-EAD9-4F73-BA45-0E94A0189975'
        },
        {
            coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/2579A9A9-45F7-424E-8803-388767DEE2E5'
        },
        {
            coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/66ED5CAB-766C-4A36-8602-ED646C82F9ED'
        },
        {
            coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/B32E7C30-ED8C-40DD-AC7A-C92F3B3034ED'
        },
        {
            coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/0C0AD6DD-9667-4F77-9A5F-4981B52FF5FE'
        },
        {
            coverUrl: 'https://knockout.oss.biggerlens.com/template/covers/2C7EB0C7-1A07-4FC0-A783-CBB95F265277'
        },
        {
            coverUrl: '	https://knockout.oss.biggerlens.com/template/covers/83EDE1A4-8BDD-44BF-958F-1CC83E6C6306'
        }
    ])





    onMounted(() => {
        window.addEventListener('click', () => {
            isShowTemplateTypeSelect.value = false
        })

        observer = new IntersectionObserver((entries) => {
            if (entries[0] && entries[0].isIntersecting) {
                loadMore()
            }
        })
        if (moreTipsRef.value) {
            observer.observe(moreTipsRef.value)
        }
    })

    onUnmounted(() => {
        window.removeEventListener('click', () => {
            isShowTemplateTypeSelect.value = false
        })
        if (observer) {
            observer.disconnect()
            observer = null
        }
    })


</script>

<style lang="scss" scoped>


    .template_com {


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

        .template_list {
            margin-top: 20px;

            .list_title {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title_text {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 14px;
                    color: #333333;
                    white-space: nowrap;
                }

                .more_type {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    column-gap: 4px;
                    cursor: pointer;
                    position: relative;
                    white-space: nowrap;

                    span {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 12px;
                        color: #999999;
                    }

                    img {
                        width: 12px;
                        height: 12px;
                    }



                }
            }

            .list_box {
                margin-top: 12px;
                column-count: 2;
                column-gap: 8px;

                .template_item {
                    border-radius: 12px;
                    margin-bottom: 8px;
                    break-inside: avoid;
                    cursor: pointer;

                    img {
                        width: 100%;
                        height: auto;
                        border-radius: 12px;
                        display: block;
                    }
                }
            }

            .more_tips {
                width: 100%;
                height: 40px;
                position: relative;
                margin-top: 10px;
                text-align: center;

                span {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 10px;
                    color: #999999;
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
</style>