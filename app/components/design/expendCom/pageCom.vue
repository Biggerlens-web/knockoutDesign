<template>
    <div class="page_com">
        <div class="page_com_title">
            <span class="page_com_title_text">
                {{ $t('canvas') }}
            </span>
            <img class="add_btn_img" src="/img/addPageIcon.png" alt="">


        </div>
        <ul class="page_com_list">
            <li v-for="(item, index) in 10" :key="item" class="page_com_item"
                :class="{ 'active': index === activeIndex }" @click="activeIndex = index">
                <div class="view_box">
                    <div class="del_btn" v-if="index == activeIndex">
                        <img src="" alt="">
                    </div>
                    <div class="index_box">
                        {{ index + 1 }}
                    </div>
                    <div class="design_box">

                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const activeIndex = ref<number>(0)


</script>

<style lang="scss" scoped>
    .page_com {
        box-sizing: border-box;
        padding: 16px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;


        .page_com_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 12px;

            .page_com_title_text {
                flex-shrink: 0;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 14px;
                color: #333333;
            }

            .add_btn_img {
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
        }


        .page_com_list {
            flex: 1;
            min-height: 0;
            overflow-y: auto;

            margin-top: 16px;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #9c9797;
                border-radius: 10px;
            }

            .page_com_item {
                box-sizing: border-box;
                padding: 12px;
                width: 100%;
                height: 230px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    background: #FAFAFA;
                }

                .view_box {
                    width: 100%;
                    height: 100%;
                    background: #FFFFFF;
                    border-radius: 12px 12px 12px 12px;
                    border: 1px solid #EEEEEE;
                    cursor: pointer;
                    position: relative;

                    .del_btn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        width: 24px;
                        height: 24px;
                        background: rgba(0, 0, 0, 0.5);
                        border-radius: 6px 6px 6px 6px;
                        cursor: pointer;
                    }

                    .index_box {
                        position: absolute;
                        bottom: 10px;
                        left: 10px;

                        width: 24px;
                        height: 24px;
                        background: rgba(0, 0, 0, 0.5);
                        border-radius: 6px 6px 6px 6px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 14px;
                        color: #FFFFFF;
                    }
                }
            }

            .active {


                .view_box {
                    border: 1px solid #6B42F2;
                }
            }


        }
    }
</style>
