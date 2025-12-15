<template>
    <div class="design_tools">
        <p class="title">
            {{ $t('designTools') }}
        </p>
        <ul class="tool_list">
            <NuxtLink :to="item.path" v-for="item in toolList" :key="item.path">
                <li class="tool_item">
                    <img src="" alt="">
                    <p class="name">{{ item.name }}</p>
                    <p class="desc">{{ item.desc }}</p>
                </li>
            </NuxtLink>
        </ul>
    </div>
</template>

<script lang="ts" setup>

    interface ToolItem {
        name: string;
        icon: string;
        desc: string
        path: string
    }


    const toolList = reactive<ToolItem[]>([
        {
            name: '在线设计',
            icon: 'icon1',
            desc: '这是一个设计工具1',
            path: '/design'
        },
        {
            name: '图片裁剪',
            icon: 'icon2',
            desc: '这是一个图片裁剪工具',
            path: '/ImageCroppingPage'
        }

    ])







</script>

<style lang="scss" scoped>
    .design_tools {
        margin-bottom: 20px;

        .title {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: bold;
            font-size: 18px;
            color: #333333;
            margin-bottom: 12px;
        }

        .tool_list {
            display: flex;
            flex-wrap: wrap;
            column-gap: 16px;
            row-gap: 16px;

            .tool_item {
                width: 180px;
                height: 110px;
                background: #FFFFFF;
                border-radius: 16px 16px 16px 16px;
                border: 1px solid #EEEEEE;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                padding: 16px 20px;

                img {
                    width: 24px;
                    height: 24px;
                    margin-bottom: 12px;
                }

                .name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: bold;
                    font-size: 14px;
                    color: #333333;
                    margin-bottom: 5px;
                }

                .desc {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
    }
</style>