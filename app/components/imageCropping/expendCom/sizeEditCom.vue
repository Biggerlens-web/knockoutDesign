<template>
    <div class="size_edit_com">
        <ul class="size_edit_com_menu">
            <li v-for="item in editMenu" :key="item.value" class="menu_item"
                :class="{ 'active': item.value === currentEditMenu }" @click="currentEditMenu = item.value">
                <p class="menu_item_name">{{ item.name }}</p>
                <ul v-if="currentEditMenu === item.value" class="cropping_box">
                    <li v-for="croppingItem in croppingList" :key="croppingItem.value" class="cropping_box_item"
                        :class="{ 'active': croppingItem.value === currentCroppingItem }"
                        @click="currentCroppingItem = croppingItem.value">{{ croppingItem.name }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    interface menuItem {
        name: string
        icon: string
        value: string
    }
    const currentEditMenu = ref<string>('cropping')

    const editMenu = ref<menuItem[]>([
        {
            name: '裁剪旋转',
            icon: 'home',
            value: 'cropping'
        },
        {
            name: '更换尺寸',
            icon: 'home',
            value: 'size'
        },
        {
            name: '色彩调节',
            icon: 'home',
            value: 'color'
        }
    ])



    interface croppingItem {
        name: string
        value: string
    }

    const currentCroppingItem = ref<string>('auto')
    const croppingList = ref<croppingItem[]>([
        {
            name: '自由裁剪',
            value: 'auto'
        },
        {
            name: '1:1',
            value: '1:1'
        },
        {
            name: '2:3',
            value: '2:3'
        },
        {
            name: '3:2',
            value: '3:2'
        },
        {
            name: '3:4',
            value: '3:4'
        },
        {
            name: '4:3',
            value: '4:3'
        },
        {
            name: '9:16',
            value: '9:16'
        },
        {
            name: '16:9',
            value: '16:9'
        }

    ])

</script>

<style lang="scss" scoped>

    .size_edit_com {
        width: 100%;
        padding-top: 10px;

        .size_edit_com_menu {

            box-sizing: border-box;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .menu_item {
                cursor: pointer;
                width: 100%;
                min-height: 50px;
                border-radius: 20px;
                background-color: #ffffff;

                .menu_item_name {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 16px;
                    height: 50px;

                }

                .cropping_box {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                }
            }
        }
    }

</style>