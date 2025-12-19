<template>
    <div class="template_com">
        <div class="search_box">
            <img class="search_icon" src="" alt="">

            <input class="search_input" v-model="searchText" :placeholder="$t('searchTips')"
                @keyup.enter="handleSearch" />
        </div>

        <div class="template_list">
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
        </div>


    </div>
</template>

<script lang="ts" setup>
    const stores = useMainStore()
    const { templateTypeSelectX, templateTypeSelectY, isShowTemplateTypeSelect } = storeToRefs(stores)

    //搜索文本
    const searchText = ref<string>('')

    //搜索
    const handleSearch = () => {
        if (searchText.value) {
            console.log(searchText.value)
        }
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

    onMounted(() => {
        window.addEventListener('click', () => {
            isShowTemplateTypeSelect.value = false
        })
    })

    onUnmounted(() => {
        window.removeEventListener('click', () => {
            isShowTemplateTypeSelect.value = false
        })
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

            .search_icon {
                width: 16px;
                height: 16px;
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
        }
    }
</style>