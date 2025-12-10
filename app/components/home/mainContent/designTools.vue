<template>
    <div class="design_tools">
        <p class="title">
            设计工具
        </p>
        <ul class="tool_list">
            <a :href="item.path" v-for="item in toolList" :key="item.path">
                <li class="tool_item">
                    <img src="" alt="">
                    <p class="name">{{ item.name }}</p>
                    <p class="desc">{{ item.desc }}</p>
                </li>
            </a>
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
            name: '设计工具1',
            icon: 'icon1',
            desc: '这是一个设计工具1',
            path: '/design/tools/1'
        },
        {
            name: '设计工具2',
            icon: 'icon2',
            desc: '这是一个设计工具2',
            path: '/design/tools/2'
        },
        {
            name: '设计工具1',
            icon: 'icon1',
            desc: '这是一个设计工具1',
            path: '/design/tools/1'
        },
        {
            name: '设计工具2',
            icon: 'icon2',
            desc: '这是一个设计工具2',
            path: '/design/tools/2'
        },
        {
            name: '设计工具1',
            icon: 'icon1',
            desc: '这是一个设计工具1',
            path: '/design/tools/1'
        },
        {
            name: '设计工具2',
            icon: 'icon2',
            desc: '这是一个设计工具2',
            path: '/design/tools/2'
        }
    ])







</script>

<style lang="scss" scoped>
    .design_tools {
        margin-bottom: 20px;

        .title {
            font-size: 20px;
            font-weight: 600;
            color: #000;
        }

        .tool_list {
            display: flex;
            flex-wrap: wrap;
            column-gap: 20px;
            row-gap: 20px;

            .tool_item {
                width: 200px;
                height: 100px;
                border-radius: 10px;
                border: 1px solid #000;

                display: flex;
                flex-direction: column;

                row-gap: 10px;
                padding: 10px;

                img {
                    width: 40px;
                    height: 40px;
                }

                .name {
                    font-size: 16px;
                    font-weight: 600;
                    color: #000;
                }

                .desc {
                    font-size: 14px;
                    font-weight: 400;
                    color: #000;
                }
            }
        }
    }
</style>