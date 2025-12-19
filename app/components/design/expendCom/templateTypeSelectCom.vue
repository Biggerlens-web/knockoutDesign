<template>
    <div class="content_box">
        <ul class="template_type_select_com">
            <li v-for="item in categoryList" :key="item.value" class="item"
                :class="{ 'active': activeItem === item.value }" @click.stop="activeItem = item.value">
                <span class="item_name">
                    {{ item.name }}
                </span>
                <img class="item_img" :src="activeItem === item.value ? activeRightArrow : rightArrow" alt="">

            </li>

        </ul>
        <ul class="second_category_list" v-show="activeItem">
            <li v-for="item in secondCategoryList" :key="item.value" class="item"
                :class="{ 'active': activeItem === item.value }">
                <span class="item_name">
                    {{ item.name }}
                </span>

            </li>
        </ul>
    </div>

</template>

<script lang="ts" setup>
    import rightArrow from '/img/arrowRight.png'
    import activeRightArrow from '/img/activeRightArrow.png'
    interface CategoryItem {
        name: string
        value: string
    }


    const activeItem = ref<string>('')
    const categoryList = ref<CategoryItem[]>([
        {
            name: '模板',
            value: 'template'
        },
        {
            name: '模板',
            value: 'material'
        },
        {
            name: '字体',
            value: 'font'
        },
        {
            name: '图片',
            value: 'image'
        },
        {
            name: '页面',
            value: 'page'
        }
    ])

    const secondCategoryList = ref<CategoryItem[]>([
        {
            name: '模板',
            value: 'template'
        },
        {
            name: '素材',
            value: 'material'
        },
        {
            name: '字体',
            value: 'font'
        },
        {
            name: '图片',
            value: 'image'
        },
        {
            name: '页面',
            value: 'page'
        }
    ])

</script>

<style lang="scss" scoped>

    .content_box {
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 6px 6px 6px 6px;
        display: flex;
        align-items: flex-start;
        background: #FFFFFF;
        width: max-content;

        .template_type_select_com {
            min-width: 110px;
            background: #FFFFFF;
            box-shadow: inset 0px 0px 0px 0px #EEEEEE;
            box-sizing: border-box;
            padding: 10px 0;
            position: relative;
            border-right: 1px solid #EEEEEE;


            .item {
                height: 32px;
                box-sizing: border-box;
                padding: 0 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;

                .item_name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #999999;
                }

                .item_img {
                    width: 12px;
                    height: 12px;
                }
            }

            .active {
                .item_name {
                    color: #6B42F2;
                }
            }


        }

        .second_category_list {

            min-width: 120px;
            background-color: #ffffff;
            box-sizing: border-box;
            padding: 10px 0;


            .item {
                height: 32px;
                box-sizing: border-box;
                padding: 0 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;


                &:hover {
                    background-color: #f7f6fa;
                }

                .item_name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #999999;
                }

                .item_img {
                    width: 12px;
                    height: 12px;
                }



            }

            .active {
                .item_name {
                    color: #6B42F2;
                }
            }
        }
    }



</style>