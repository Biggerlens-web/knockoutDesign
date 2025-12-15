<template>
    <div class="aside_box">
        <div class="aside_title">
            <img src="" alt="" class="aside_title_img">
            <span class="aside_title_text">
                {{ $t('pageTitle') }}
            </span>
        </div>

        <ul class="menu_list">
            <NuxtLink :to="item.path" v-for="item in asideList" :key="item.path">
                <li class="menu_item"
                    :class="{ 'create_item': item.title === $t('startCreate'), 'active_item': route.path === item.path }">

                    <img src="" alt="">
                    <span>{{ item.title }}</span>
                </li>
            </NuxtLink>
        </ul>
        <div class="mine_project">
            <NuxtLink to="/projects">
                <div class="project_item" :class="{ 'active_item': route.path === '/projects' }">
                    <img src="" alt="">
                    <span>{{ $t('mineProject') }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { t } = useI18n()
    interface AsideItem {
        title: string
        path: string
        icon: string
    }

    const route = useRoute()

    const asideList: AsideItem[] = reactive([
        {
            title: t('startCreate'),
            path: '/design',
            icon: '',
        },
        {
            title: t('home'),
            path: '/',
            icon: '',
        },
        {
            title: t('templatesCenter'),
            path: '/templates',
            icon: '',
        },
    ])



</script>

<style lang="scss" scoped>
    .aside_box {
        width: 200px;
        flex-shrink: 0;
        background: #F7F6FA;
        box-sizing: border-box;
        padding: 20px;
        overflow-y: auto;


        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }

        .aside_title {
            display: flex;
            align-items: center;
            column-gap: 8px;
            margin-bottom: 44px;

            .aside_title_img {
                width: 24px;
                height: 24px;
            }

            .aside_title_text {
                font-family: "AaHouDiHei-Regular";
                font-weight: 400;
                font-size: 16px;
                color: #333333;
            }
        }

        .menu_list {
            display: flex;
            flex-direction: column;
            row-gap: 12px;
            border-bottom: 1px solid #DADADA;
            padding-bottom: 12px;

            .menu_item {
                height: 44px;
                background: #F7F6FA;
                border-radius: 12px 12px 12px 12px;
                line-height: 44px;

                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 14px;
                color: #666666;
                display: flex;
                align-items: center;
                column-gap: 8px;
                box-sizing: border-box;
                padding: 10px;

                img {
                    width: 24px;
                    height: 24px;

                }


            }

            .create_item {
                background: #EBE9F1;
            }

            .active_item {
                background: #E3DDFC;
                color: #333333;
                font-weight: 500;
            }
        }

        .mine_project {

            padding-top: 20px;
            display: flex;
            flex-direction: column;

            .project_item {
                cursor: pointer;
                height: 44px;
                line-height: 44px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 14px;
                color: #666666;
                border-radius: 12px;
                display: flex;
                align-items: center;
                column-gap: 8px;
                box-sizing: border-box;
                padding: 10px;

                img {
                    width: 24px;
                    height: 24px;

                }


            }

            .active_item {
                background: #E3DDFC;
                color: #333333;
                font-weight: 500;
            }
        }
    }
</style>