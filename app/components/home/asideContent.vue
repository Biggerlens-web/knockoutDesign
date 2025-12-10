<template>
    <div class="aside_box">
        <ul class="menu_list">
            <a :href="item.path" v-for="item in asideList" :key="item.path">
                <li class="menu_item">

                    <img src="" alt="">
                    <span>{{ item.title }}</span>
                </li>
            </a>
        </ul>
        <div class="mine_project">
            <a href="/mine-project">
                <div class="project_item">
                    <img src="" alt="">
                    <span>我的项目</span>
                </div>
            </a>

        </div>
    </div>
</template>

<script lang="ts" setup>
    interface AsideItem {
        title: string
        path: string
        icon: string
    }
    const asideList: AsideItem[] = reactive([
        {
            title: '侧边栏1',
            path: '/aside1',
            icon: 'icon1',
        },
        {
            title: '侧边栏2',
            path: '/aside2',
            icon: 'icon2',
        },
        {
            title: '侧边栏3',
            path: '/aside3',
            icon: 'icon3',
        },
    ])

</script>

<style lang="scss" scoped>
    .aside_box {
        width: 200px;
        flex-shrink: 0;
        background: #f5f5f5;
        box-sizing: border-box;
        padding: 20px;

        .menu_list {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            border-bottom: 1px solid #000;
            padding-bottom: 20px;

            .menu_item {
                height: 40px;
                line-height: 40px;

                font-size: 16px;
                font-weight: 600;
                color: #000;
                border: 1px solid #000;
                border-radius: 20px;
                display: flex;
                align-items: center;
                column-gap: 10px;

                img {
                    width: 20px;
                    height: 20px;
                    margin-left: 10px;
                }

                &:hover {
                    background-color: #000;
                    color: #fff;
                }
            }
        }

        .mine_project {

            padding-top: 20px;
            display: flex;
            flex-direction: column;

            .project_item {
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #000;
                border: 1px solid #000;
                border-radius: 20px;
                display: flex;
                align-items: center;
                column-gap: 10px;

                img {
                    width: 20px;
                    height: 20px;
                    margin-left: 10px;
                }

                &:hover {
                    background-color: #000;
                    color: #fff;
                }
            }
        }
    }
</style>