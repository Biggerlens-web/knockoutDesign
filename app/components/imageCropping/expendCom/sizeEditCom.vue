<template>
    <div class="size_edit_com">
        <ul class="size_edit_com_menu">
            <li v-for="item in editMenu" :key="item.value" class="menu_item"
                :class="{ 'active': item.value === currentEditMenu }">
                <div class="menu_item_name" @click="handleEditMenu(item.value)">
                    <p>
                        <img class="icon" src="" alt="">
                        <span>
                            {{ item.name }}
                        </span>

                    </p>
                    <img class="arrow_img" src="/img/arrowDown.png" alt="">
                </div>

                <template v-if="currentEditMenu === 'cropping' && item.value === 'cropping'">
                    <ul class="cropping_box">
                        <li v-for="croppingItem in croppingList" :key="croppingItem.value" class="cropping_box_item"
                            :class="{ 'active': croppingItem.value === currentCroppingItem }"
                            @click="currentCroppingItem = croppingItem.value">


                            <img class="size_icon" src="" alt="">
                            <p class="size_name">
                                {{ croppingItem.name }}
                            </p>

                        </li>
                    </ul>
                    <div class="rotate_btn_box">
                        <img class="btn_img" v-for="rotateItem in rotateList" :key="rotateItem.value"
                            :alt="rotateItem.value">
                    </div>
                    <div class="apply_btn">
                        <div class="cancel">{{ $t('cancel') }}</div>
                        <div class="apply">{{ $t('apply') }}</div>
                    </div>
                </template>
                <template v-if="currentEditMenu === 'size' && item.value === 'size'">
                    <div class="size_list_box">
                        <p class="size_title">
                            {{ $t('normal_size') }}
                        </p>
                        <ul class="size_list">
                            <li class="size_list_item" v-for="(sizeItem, index) in sizeList" :key="index"
                                @click="handleSizeItem(sizeItem)">
                                <p class="size_name">
                                    {{ sizeItem.name }}
                                </p>
                                <p class="size_num">
                                    {{ `${sizeItem.width} × ${sizeItem.height} px` }}
                                </p>
                            </li>
                        </ul>
                        <div class="size_input_box">
                            <div class="input_box">
                                <input id="width_input" type="number" v-model="widthInput" @input="onWidthInput">
                                <span>
                                    {{ $t('width') }}
                                </span>
                            </div>
                            <img class="lock_icon" src="" alt="" @click="toggleLock"
                                :style="{ opacity: isLocked ? 1 : 0.5 }">
                            <div class="input_box">
                                <input id="height_input" type="number" v-model="heightInput" @input="onHeightInput">
                                <span>
                                    {{ $t('height') }}
                                </span>
                            </div>
                        </div>
                        <div class="apply_size_btn">
                            <div class="cancel">{{ $t('cancel') }}</div>
                            <div class="apply">{{ $t('apply') }}</div>
                        </div>

                    </div>




                </template>

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
    const currentEditMenu = ref<string>('')

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


    const handleEditMenu = (value: string) => {
        console.log('value', value);
        if (currentEditMenu.value === value) {
            currentEditMenu.value = ''
        } else {
            currentEditMenu.value = value
        }
    }


    interface croppingItem {
        name: string
        value: string
    }
    //调整
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
    const rotateList = ref<any>([
        {
            icon: '',
            value: 'right90'
        },
        {
            icon: '',
            value: 'left90'
        },
        {
            icon: '',
            value: 'leftRight'
        },
        {
            icon: '',
            value: 'upDown'
        }
    ])







    //更换尺寸
    interface sizeItem {
        name: string

        width: number
        height: number
    }
    const sizeList = ref<sizeItem[]>([
        {
            name: '手机海报',
            width: 1242,
            height: 2208
        },
        {
            name: '手机海报',
            width: 621,
            height: 1104
        },
        {
            name: '手机海报',
            width: 414,
            height: 686
        },
        {
            name: '手机海报',
            width: 310,
            height: 442
        },
        {
            name: '手机海报',
            width: 248,
            height: 352
        },
        {
            name: '手机海报',
            width: 207,
            height: 324
        },
        {
            name: '手机海报',
            width: 180,
            height: 286
        },
        {
            name: '手机海报',
            width: 160,
            height: 248
        }
    ])

    //锁定比例
    const isLocked = ref<boolean>(false)
    const widthInput = ref<number | null>(null)
    const heightInput = ref<number | null>(null)
    const ratio = ref<number>(1)
    const toggleLock = () => {
        isLocked.value = !isLocked.value
        if (isLocked.value && widthInput.value && heightInput.value) {
            ratio.value = widthInput.value / heightInput.value
        }
    }
    const onWidthInput = () => {
        if (isLocked.value && widthInput.value) {
            heightInput.value = Math.round(widthInput.value / ratio.value)
        }
    }
    const onHeightInput = () => {
        if (isLocked.value && heightInput.value) {
            widthInput.value = Math.round(heightInput.value * ratio.value)
        }
    }

    const handleSizeItem = (item: any) => {
        widthInput.value = item.width
        heightInput.value = item.height
        isLocked.value = false
    }



</script>

<style lang="scss" scoped>

    .size_edit_com {
        width: 100%;
        padding: 16px 12px;
        box-sizing: border-box;

        .size_edit_com_menu {

            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .menu_item {
                cursor: pointer;
                width: 100%;
                min-height: 40px;
                border-radius: 12px 12px 12px 12px;
                border: 1px solid #EEEEEE;
                background-color: #ffffff;
                box-sizing: border-box;


                .menu_item_name {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 40px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 12px;

                    p {
                        display: flex;
                        align-items: center;
                        column-gap: 8px;

                        img {
                            width: 16px;
                            height: 16px;
                        }

                        span {
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 400;
                            font-size: 12px;
                            color: #333333;
                        }
                    }

                    .arrow_img {
                        width: 12px;
                        height: 12px;
                    }

                }

                .cropping_box {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 5px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 12px;


                    .cropping_box_item {
                        cursor: pointer;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        background: #F5F5F5;
                        border-radius: 12px 12px 12px 12px;

                        .size_icon {
                            width: 24px;
                            height: 24px;
                        }

                        .size_name {
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 500;
                            font-size: 10px;
                            color: #333333;
                        }
                    }

                    .active {
                        .size_name {
                            color: #6B54FE;
                        }
                    }

                }

                .rotate_btn_box {
                    margin-top: 16px;
                    display: flex;
                    width: 100%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    column-gap: 32px;
                    row-gap: 32px;

                    .btn_img {
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    }
                }

                .apply_btn {
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    column-gap: 8px;
                    margin-top: 20px;
                    width: 100%;
                    padding: 0 12px;
                    margin-bottom: 16px;

                    .cancel {
                        width: 92px;
                        height: 32px;
                        background: #F7F6FA;
                        border-radius: 6px 6px 6px 6px;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 12px;
                        color: #333333;
                        text-align: center;
                        line-height: 32px;
                    }

                    .apply {
                        width: 92px;
                        height: 32px;
                        background: #6B42F2;
                        border-radius: 6px 6px 6px 6px;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 500;
                        font-size: 12px;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 32px;
                    }
                }

                .size_list_box {
                    width: 100%;
                    padding: 0 12px;
                    padding-bottom: 16px;
                    box-sizing: border-box;


                    .size_title {
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 10px;
                        color: #333333;
                    }

                    .size_list {
                        margin-top: 8px;
                        width: 100%;
                        box-sizing: border-box;
                        height: 206px;
                        padding: 20px 12px;
                        background: #FAFAFA;
                        border-radius: 12px 12px 12px 12px;
                        overflow-y: scroll;
                        display: flex;
                        flex-direction: column;
                        row-gap: 16px;

                        &::-webkit-scrollbar {
                            display: none;
                        }

                        .size_list_item {

                            display: flex;
                            flex-direction: column;
                            row-gap: 2px;

                            .size_name {
                                font-family: Source Han Sans SC, Source Han Sans SC;
                                font-weight: 500;
                                font-size: 14px;
                                color: #333333;
                            }

                            .size_num {
                                font-family: Source Han Sans SC, Source Han Sans SC;
                                font-weight: 400;
                                font-size: 10px;
                                color: #999999;
                            }
                        }
                    }

                    .size_input_box {
                        margin-top: 12px;
                        width: 100%;

                        display: flex;
                        align-items: center;
                        column-gap: 8px;

                        .lock_icon {
                            width: 24px;
                            height: 24px;
                        }

                        .input_box {
                            width: 76px;
                            height: 36px;
                            background: #F5F5F5;
                            border-radius: 10px 10px 10px 10px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            box-sizing: border-box;
                            padding: 0 10px;

                            input {
                                width: 35px;
                                background-color: transparent;
                                border: none;
                                outline: none;
                                font-family: Source Han Sans SC, Source Han Sans SC;
                                font-weight: 400;
                                font-size: 14px;
                                color: #333333;

                                &::-webkit-inner-spin-button,
                                &::-webkit-outer-spin-button {
                                    -webkit-appearance: none;
                                    margin: 0;
                                }

                                -moz-appearance: textfield;
                            }

                            span {
                                font-family: Source Han Sans SC, Source Han Sans SC;
                                font-weight: 400;
                                font-size: 14px;
                                color: #999999;
                            }
                        }


                    }

                    .apply_size_btn {
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        column-gap: 8px;

                        width: 100%;
                        margin-top: 16px;



                        .cancel {
                            width: 92px;
                            height: 32px;
                            background: #F7F6FA;
                            border-radius: 6px 6px 6px 6px;
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 500;
                            font-size: 12px;
                            color: #333333;
                            text-align: center;
                            line-height: 32px;
                        }

                        .apply {
                            width: 92px;
                            height: 32px;
                            background: #6B42F2;
                            border-radius: 6px 6px 6px 6px;
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 500;
                            font-size: 12px;
                            color: #FFFFFF;
                            text-align: center;
                            line-height: 32px;
                        }
                    }



                }
            }
        }
    }

</style>