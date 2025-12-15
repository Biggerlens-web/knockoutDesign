<template>
    <div class="material_edit_com">
        <div class="search_box">
            <img src="" alt="">
            <input type="text" v-model="searchText" :placeholder="$t('searchMaterial')">
        </div>
        <div class="material_list_box">
            <div class="material_list" v-for="(item, index) in materialTypeList" :key="index">
                <div class="material_type">

                    <span class="material_type_name">
                        {{ item.name }}
                    </span>
                    <div class="material_type_arrow">
                        <span>
                            {{ $t('all') }}
                        </span>
                        <img src="/img/arrowRight.png" alt="">

                    </div>
                </div>
                <ul class="list">
                    <li v-for="(el, elIndex) in item.list" class="list_item" :key="elIndex">
                        <img class="view_img" src="" alt="">
                    </li>
                </ul>


            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>


    const searchText = ref<string>('')



    const materialTypeList = ref<any>([
        {
            name: '热门推荐',
            list: [
                '1', '2', '3', '4'
            ]
        },
        {
            name: '基础样式',
            list: [
                '1', '2', '3', '4'
            ]
        },
        {
            name: '热门推荐',
            list: [
                '1', '2', '3', '4'
            ]
        },
        {
            name: '基础样式',
            list: [
                '1', '2', '3', '4'
            ]
        }, {
            name: '热门推荐',
            list: [
                '1', '2', '3', '4'
            ]
        },
        {
            name: '基础样式',
            list: [
                '1', '2', '3', '4'
            ]
        }, {
            name: '热门推荐',
            list: [
                '1', '2', '3', '4'
            ]
        },
        {
            name: '基础样式',
            list: [
                '1', '2', '3', '4'
            ]
        }
        , {
            name: '热门推荐',
            list: [
                '1', '2', '3', '4'
            ]
        },
        {
            name: '基础样式',
            list: [
                '1', '2', '3', '4'
            ]
        }
    ])

</script>

<style lang="scss" scoped>
    .material_edit_com {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 16px 12px;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #EEEEEE;
            border-radius: 12px;
        }

        .search_box {
            width: 100%;
            height: 40px;
            background: #FFFFFF;
            border-radius: 12px 12px 12px 12px;
            border: 1px solid #EEEEEE;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            column-gap: 16px;
            padding: 0 16px;

            img {
                width: 16px;
                height: 16px;
            }

            input {
                flex: 1;
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                background-color: transparent;
            }
        }

        .material_list_box {
            margin-top: 20px;

            .material_list {
                .material_type {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;

                    .material_type_name {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 14px;
                        color: #333333;
                    }

                    .material_type_arrow {
                        display: flex;
                        align-items: center;
                        column-gap: 4px;
                        cursor: pointer;

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

                .list {

                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 9px;

                    .list_item {
                        cursor: pointer;
                        height: 66px;
                        background: #FAFAFA;
                        border-radius: 12px 12px 12px 12px;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>