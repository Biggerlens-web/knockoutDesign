<template>
    <div class="aside">
        <div class="aside_left_box">
            <ul class="menu">
                <li class="menu_item" v-for="item in menuItems" :key="item.icon" @click="openExpend(item.name)">
                    <i :class="item.icon"></i>
                    {{ item.name }}
                </li>
            </ul>

        </div>
        <AsideLeftExpendBox class="aside_left_expend_position"
            :class="{ 'aside_left_expend_position_active': isExpend, 'aside_left_expend_position_close': !isExpend && isHasExpend }" />
    </div>


</template>

<script lang="ts" setup>
    import AsideLeftExpendBox from './asideLeftExpendBox.vue'
    interface menuItem {
        name: string
        icon: string
    }
    const menuItems: menuItem[] = reactive([
        {
            name: 'ホーム',
            icon: 'home'
        },
        {
            name: 'デザイン',
            icon: 'design'
        },
        {
            name: '設定',
            icon: 'setting'
        }
    ])


    //选择菜单
    const isExpend = ref<boolean>(false)
    const isHasExpend = ref<boolean>(false) // 是否展开过
    const activeName = ref<string>('')
    const openExpend = (name: string) => {
        if (isExpend.value && activeName.value === name) {
            isExpend.value = false
        } else {
            isExpend.value = true
            isHasExpend.value = true
            activeName.value = name
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
            width: 100px;
            height: 100%;
            background-color: #d60707;


            .menu {
                display: flex;
                flex-direction: column;
                align-items: center;
                row-gap: 10px;

                .menu_item {
                    display: flex;
                    align-items: center;
                    column-gap: 5px;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }

        .aside_left_expend_position {

            width: 0;
            height: 100%;





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
                width: 300px;
            }
        }

        @keyframes asideLeftExpendPositionClose {
            0% {

                opacity: 1;
                width: 300px;
            }

            100% {

                opacity: 0;
                width: 0;
            }

        }
    }
</style>