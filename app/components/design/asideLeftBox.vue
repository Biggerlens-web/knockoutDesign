<template>
    <div class="aside">
        <div class="aside_left_box">
            <ul class="menu">
                <li class="menu_item" v-for="item in menuItems" :key="item.icon" @click="openExpend(item.value)"
                    :class="{ 'active': item.value === activeName }">
                    <img class="menu_item_icon" :src="item.value === activeName ? item.activeIcon : item.icon" alt="">
                    <p class="menu_item_text">
                        {{ item.name }}
                    </p>
                </li>
            </ul>

        </div>
        <AsideLeftExpendBox class="aside_left_expend_position" :activeCom="expendActiveCom"
            :class="{ 'aside_left_expend_position_active': isExpend, 'aside_left_expend_position_close': !isExpend && isHasExpend }" />
    </div>


</template>

<script lang="ts" setup>
    import AsideLeftExpendBox from './asideLeftExpendBox.vue'
    import templateIcon from '/img/templateIcon.png'
    import matiralIcon from '/img/matiralIcon.png'
    import fontIcon from '/img/fontIcon.png'
    import imageIcon from '/img/imageIcon.png'
    import pageIcon from '/img/pageIcon.png'

    import templateActiveIcon from '/img/templateActiveIcon.png'
    import matiralActiveIcon from '/img/matiralActiveIcon.png'
    import fontActiveIcon from '/img/fontActiveIcon.png'
    import imageActiveIcon from '/img/imageActiveIcon.png'
    import pageActiveIcon from '/img/pageActiveIcon.png'
    const { t } = useI18n()
    interface menuItem {
        name: string
        icon: string
        activeIcon: string
        value: string
        com: string
    }
    const menuItems: menuItem[] = reactive([
        {
            name: t('template'),
            icon: templateIcon,
            activeIcon: templateActiveIcon,
            value: 'template',
            com: 'templateCom',
        },
        {
            name: t('material'),
            icon: matiralIcon,
            activeIcon: matiralActiveIcon,
            value: 'material',
            com: 'materialCom',
        },
        {
            name: t('font'),
            icon: fontIcon,
            activeIcon: fontActiveIcon,
            value: 'font',
            com: 'fontCom',
        },
        {
            name: t('image'),
            icon: imageIcon,
            activeIcon: imageActiveIcon,
            value: 'image',
            com: 'imageCom',
        },
        {
            name: t('page'),
            icon: pageIcon,
            activeIcon: pageActiveIcon,
            value: 'page',
            com: 'pageCom',
        }
    ])


    //选择菜单
    const isExpend = ref<boolean>(false)
    const isHasExpend = ref<boolean>(false) // 是否展开过
    const activeName = ref<string>('')
    const expendActiveCom = ref<string>('')
    const openExpend = (name: string) => {
        if (isExpend.value && activeName.value === name) {
            isExpend.value = false
            activeName.value = ''

        } else {
            isExpend.value = true
            isHasExpend.value = true
            activeName.value = name
            expendActiveCom.value = menuItems.find(item => item.value === name)?.com || ''
        }
    }

</script>

<style lang="scss" scoped>
    .aside {
        display: flex;
        flex-shrink: 0;
        width: max-content;
        height: 100%;


        .aside_left_box {
            width: 64px;
            height: 100%;

            box-sizing: border-box;
            padding: 16px 6px;
            background: #FFFFFF;
            box-shadow: inset -1px 0px 1px 0px #EEEEEE;
            border-radius: 0px 0px 0px 0px;

            .menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                row-gap: 10px;

                .menu_item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    row-gap: 3px;
                    cursor: pointer;
                    width: 52px;
                    border-radius: 10px 10px 10px 10px;
                    box-sizing: border-box;
                    padding: 10px 0;

                    .menu_item_icon {
                        width: 24px;
                        height: 24px;
                    }

                    .menu_item_text {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 12px;
                        color: #666666;
                    }
                }

                .active {
                    background: #F7F6FA;

                    .menu_item_text {
                        font-weight: 500;
                        font-size: 12px;
                        color: #6B42F2;
                    }
                }
            }
        }

        .aside_left_expend_position {

            width: 0;
            height: 100%;
            padding: 0;




        }

        .aside_left_expend_position_active {
            animation: asideLeftExpendPositionActive 0.3s ease-in-out forwards;
        }

        .aside_left_expend_position_close {
            animation: asideLeftExpendPositionClose 0.3s ease-in-out forwards;
        }

        @keyframes asideLeftExpendPositionActive {
            0% {

                opacity: 0;
                width: 0;
            }

            100% {

                opacity: 1;
                width: 240px;
                padding: 0 12px;
            }
        }

        @keyframes asideLeftExpendPositionClose {
            0% {

                opacity: 1;
                width: 240px;
                padding: 0 12px;
            }

            100% {

                opacity: 0;
                width: 0;
                padding: 0;
            }

        }
    }
</style>