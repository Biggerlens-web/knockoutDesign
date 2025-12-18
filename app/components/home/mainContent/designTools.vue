<template>
    <div class="design_tools">
        <p class="title">
            {{ $t('designTools') }}
        </p>
        <ul class="tool_list">
            <NuxtLink :to="item.path" v-for="item in toolList" :key="item.path">
                <li class="tool_item" @click.prevent="handleClick(item)" @mouseenter="item.isHover = true"
                    @mouseleave="item.isHover = false" :style="{ '--hover-bg-color': item.hoverBgColor }">
                    <template v-if="!item.isHover">
                        <img :src="item.icon" alt="">
                        <p class="name">{{ $t(item.nameI18nKey) }}</p>
                        <p class="desc">{{ $t(item.descI18nKey) }}</p>
                    </template>
                    <template v-else>
                        <p class="hover_anme">
                            <span>
                                {{ $t(item.hoverNameI18nKey) }}
                            </span>
                            <img class="hover_arrow" src="/img/desginToolRArroww.png" alt="">
                        </p>
                        <img class="hover_bg" :src="item.hoverBg" alt="">
                    </template>

                </li>
            </NuxtLink>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import createIcon from '/img/createIcon.png'
    import createBg from '/img/designToolCreateBg.png'


    const stores = useMainStore()
    const { isStartCreateDialogVisible } = storeToRefs(stores)
    interface ToolItem {
        name: string;
        icon: string;
        desc: string
        path: string
        nameI18nKey: string
        descI18nKey: string
        hoverNameI18nKey: string
        hoverBg: string
        isHover: boolean
        hoverBgColor: string
    }


    const toolList = reactive<ToolItem[]>([
        {
            name: '在线设计',
            icon: createIcon,
            desc: '这是一个设计工具1',
            path: '/create',
            nameI18nKey: 'designToolsOnlineDesign',
            descI18nKey: 'designToolsOnlineDesignDesc',
            hoverNameI18nKey: 'designToolsOnlineDesignHover',
            hoverBg: createBg,
            isHover: false,
            hoverBgColor: `radial-gradient( 24% 24% at 62% 56%, #FAFAFA 50%, #DFE0FF 100%)`
        },
        // {
        //     name: '图片裁剪',
        //     icon: 'icon2',
        //     desc: '这是一个图片裁剪工具',
        //     path: '/image-editor',
        //     nameI18nKey: 'designToolsImageEditor',
        //     descI18nKey: 'designToolsImageEditorDesc',
        //     hoverNameI18nKey: 'designToolsImageEditorHover',
        //     hoverBg: '/img/designToolImageEditorBg.png',
        //     isHover: false,
        //     hoverBgColor: '#F7F7F7'
        // }

    ])




    const handleClick = (item: ToolItem) => {
        if (item.path === '/create') {
            isStartCreateDialogVisible.value = true
            return
        }

        navigateTo(item.path)
    }



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
                min-width: 220px;
                height: 130px;
                background: #FFFFFF;
                border-radius: 16px 16px 16px 16px;
                border: 1px solid #EEEEEE;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                padding: 16px 20px;
                position: relative;

                &:hover {
                    background: var(--hover-bg-color);
                }

                img {
                    width: 32px;
                    height: 32px;
                    margin-bottom: 12px;
                }

                .name {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: bold;
                    font-size: 18px;
                    color: #333333;
                    margin-bottom: 5px;
                }

                .desc {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 14px;
                    color: #999999;
                }


                .hover_anme {
                    display: flex;
                    align-items: center;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: bold;
                    font-size: 14px;
                    color: #333333;
                    column-gap: 8px;

                    .hover_arrow {
                        margin: 0;
                        width: 12px;
                        height: 12px;
                    }
                }

                .hover_bg {
                    margin: 0;
                    width: 160px;
                    height: 80px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }

        }
    }
</style>