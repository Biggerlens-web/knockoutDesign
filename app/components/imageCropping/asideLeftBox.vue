<template>
    <div class="aside">
        <div class="aside_left_box">
            <ul class="menu">
                <li class="menu_item" v-for="item in menuItems" :key="item.icon" @click="openExpend(item.name)"
                    :class="{ 'menu_item_active': activeName === item.name, 'disabled': !imageEditUploadFile }">
                    <img class="menu_item_icon" src="" alt="">
                    <span class="menu_item_name">
                        {{ $t(item.value) }}
                    </span>

                </li>
            </ul>

        </div>
        <AsideLeftExpendBox class="aside_left_expend_position" :isExpend="isExpend" :isAnimating="isAnimating"
            :class="{ 'aside_left_expend_position_active': isExpend, 'aside_left_expend_position_close': !isExpend && isHasExpend }"
            @animationend="animationEnd" @animationstart="animationStart" :activeCom="activeCom" />
    </div>


</template>

<script lang="ts" setup>
    import AsideLeftExpendBox from '../imageCropping/asideLeftExpendBox.vue'

    const stores = useMainStore()
    const { imageEditUploadFile } = storeToRefs(stores)

    interface menuItem {
        name: string
        icon: string
        value: string
        activeIcon: string
        com: string
    }



    const menuItems: menuItem[] = reactive([
        {
            name: '调整',
            icon: '',
            value: 'adjust',
            activeIcon: '',
            com: 'sizeEditCom'

        },
        {
            name: '素材',
            icon: '',
            value: 'material',
            activeIcon: '',
            com: 'materialEditCom'
        },
        {
            name: '文字',
            icon: '',
            value: 'text',
            activeIcon: '',
            com: 'textEditCom'
        }
    ])

    // 动画结束
    const isAnimating = ref<boolean>(false)
    const animationEnd = () => {
        isAnimating.value = false
    }
    // 动画开始
    const animationStart = () => {
        isAnimating.value = true
    }
    //选择菜单
    const activeCom = ref<string>('sizeEditCom')
    const isExpend = ref<boolean>(false)
    const isHasExpend = ref<boolean>(false) // 是否展开过
    const activeName = ref<string>('')
    const openExpend = (name: string) => {


        if (!imageEditUploadFile.value) {
            return
        }
        if (isExpend.value && activeName.value === name) {
            isExpend.value = false
        } else {
            isExpend.value = true
            isHasExpend.value = true
            activeName.value = name
            activeCom.value = menuItems.find(item => item.name === name)?.com || ''

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
            box-sizing: border-box;
            padding: 16px 6px;
            width: 64px;
            height: 100%;
            background-color: #ffffff;
            box-shadow: inset -1px 0px 1px 0px #EEEEEE;


            .menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                row-gap: 12px;

                .menu_item {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 10px 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    row-gap: 3px;

                    cursor: pointer;
                    border-radius: 10px 10px 10px 10px;

                    .menu_item_icon {
                        width: 24px;
                        height: 24px;
                    }

                    .menu_item_name {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 12px;
                        color: #666666;
                    }
                }

                .menu_item_active {
                    background: #F7F6FA;

                    .menu_item_name {
                        color: #6B42F2;
                        font-weight: 500;
                    }
                }

                .disabled {
                    cursor: not-allowed;
                    filter: grayscale(100%);
                    opacity: 0.6;

                }
            }
        }

        .aside_left_expend_position {
            width: 0;
            height: 100%;
            overflow: hidden;
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
            }
        }

        @keyframes asideLeftExpendPositionClose {
            0% {

                opacity: 1;
                width: 240px;
            }

            30% {
                opacity: 0;
            }

            100% {

                opacity: 0;
                width: 0;
            }

        }
    }
</style>