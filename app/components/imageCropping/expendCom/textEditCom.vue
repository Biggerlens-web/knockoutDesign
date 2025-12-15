<template>
    <div class="text_edit_com">
        <div class="search_box">
            <img src="" alt="">
            <input class="search_input" type="text" :placeholder="$t('searchFont')">
        </div>
        <div class="font_list">
            <div v-for="item in defaultFontList" :key="item.name" class="font_item">
                <img :src="item.img" alt="">
            </div>
        </div>
        <div class="font_type_box">
            <div class="font_type_item" v-for="item in materialTypeList" :key="item.name">
                <div class="font_type_title">
                    <span class="type_name">{{ item.name }}</span>
                    <div class="type_right">
                        <span>
                            {{ $t('all') }}
                        </span>
                        <img src="/img/arrowRight.png" alt="">
                    </div>
                </div>
                <ul class="list">
                    <li v-for="(el, index) in item.list" :key="el" class="list_item">
                        <img src="" alt="">
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
    import defaultFont1 from '/img/defaultFont1.png'
    import defaultFont2 from '/img/defaultFont2.png'
    import defaultFont3 from '/img/defaultFont3.png'

    const defaultFontList = reactive<any>([
        {
            name: 'defaultFont1',
            img: defaultFont1
        },
        {
            name: 'defaultFont2',
            img: defaultFont2
        },
        {
            name: 'defaultFont3',
            img: defaultFont3
        }
    ])


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


    .text_edit_com {
        box-sizing: border-box;
        padding: 16px 12px;
        overflow-y: auto;
        height: 100%;

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
            padding: 0 16px;

            img {
                width: 16px;
                height: 16px;
            }

            .search_input {
                flex: 1;
                width: 100%;
                border: none;
                outline: none;
            }
        }

        .font_list {
            margin-top: 16px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 7px;

            .font_item {
                width: 68px;
                height: 40px;
                background: #F5F5F5;
                border-radius: 12px 12px 12px 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                img {
                    height: 12px;
                    width: auto;
                }
            }
        }

        .font_type_box {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            margin-top: 20px;

            .font_type_item {
                .font_type_title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .type_name {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 14px;
                        color: #333333;
                    }

                    .type_right {
                        display: flex;
                        align-items: center;
                        column-gap: 4px;

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
                    margin-top: 12px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 9px;

                    .list_item {
                        cursor: pointer;
                        width: 66px;
                        height: 66px;
                        background: #FAFAFA;
                        border-radius: 12px 12px 12px 12px;
                    }
                }
            }
        }
    }
</style>