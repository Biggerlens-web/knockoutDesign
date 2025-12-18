<template>
    <el-dialog v-model="isStartCreateDialogVisible" title="" width="0" :show-close="false" style="padding: 0;"
        :z-index="1000">
        <div class="start_create_dialog">
            <div class="title_box">
                <span class="title_text">
                    {{ $t('customSize') }}
                </span>
                <img class="close_btn" @click="isStartCreateDialogVisible = false" :src="`${getCdnBaseUrl()}/close.png`"
                    alt="close">
            </div>

            <div class="size_input_box">
                <div class="size_input_item">
                    <input v-model="sizeInputWidth" type="number" @input="handleWidthInput" />
                    <span class="unit">
                        {{ $t('width') }}
                    </span>
                </div>
                <div class="lock" :style="{ opacity: isLock ? 1 : 0.5 }" @click="toggleLock">
                    <img :src="`${getCdnBaseUrl()}/lock.png`" alt="lock">
                </div>
                <div class="size_input_item">
                    <input v-model="sizeInputHeight" type="number" @input="handleHeightInput" />
                    <span class="unit">
                        {{ $t('height') }}
                    </span>
                </div>
                <div class="unit_select" @mouseenter="hoverUnitSelect(true)" @mouseleave="hoverUnitSelect(false)">
                    <span class="unit_label">
                        {{ labelUnit }}
                    </span>
                    <img class="unit_arrow" src="/img/downArrow.png" alt="">

                    <Transition enter-active-class="animate__animated animate__fadeIn animate__faster"
                        leave-active-class="animate__animated animate__fadeOut animate__faster">
                        <div class="unit_list" v-show="isShowUnitSelect">
                            <div v-for="item in unitList" :key="item.value" class="unit_item"
                                @click="handelUnitClick(item)" :class="{ 'active_item': item.value === activeUnit }">
                                <span>
                                    {{ item.label }}
                                </span>
                                <img v-if="item.value === activeUnit" src="/img/selectedIcon.png" alt="">
                            </div>
                        </div>
                    </Transition>

                </div>

                <div class="create_btn" @click="handelCreateClick">
                    {{ $t('create') }}
                </div>


            </div>
            <div class="size_tips">
                {{ $t('sizeTips') }}
            </div>
            <div class="size_default_box">
                <p class="size_default_title">
                    {{ $t('normalSizeTips') }}
                </p>
                <ul class="size_default_list">
                    <li v-for="item in normalSizeList" :key="item.i18nKey" class="size_default_item"
                        @click="handelSizeClick(item)">
                        <img class="size_img" src="" alt="">
                        <div class="info_box">
                            <p class="name">
                                {{ $t(item.i18nKey) }}
                            </p>
                            <p class="label">
                                {{ item.label }}
                            </p>
                        </div>

                    </li>
                </ul>
            </div>

        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
    const { t } = useI18n()
    const stores = useMainStore()
    const { isStartCreateDialogVisible, canvasWidth, canvasHeight } = storeToRefs(stores)
    const sizeInputWidth = ref<number>(500)
    const sizeInputHeight = ref<number>(500)

    interface UnitItem {
        label: string
        value: string
    }



    const activeUnit = ref<string>('px')
    const labelUnit = computed(() => {
        return activeUnit.value === 'px' ? t('unitPX') : t('unitCM')
    })
    const unitList = ref<UnitItem[]>([
        {
            label: t('unitPX'),
            value: 'px'
        },
        {
            label: t('unitCM'),
            value: 'cm'
        }
    ])


    const isShowUnitSelect = ref<boolean>(false)

    let UnitSelectDebounce: any = null
    const hoverUnitSelect = (isHover: boolean) => {
        if (isHover) {
            isShowUnitSelect.value = true
            if (UnitSelectDebounce) {
                clearTimeout(UnitSelectDebounce)
            }
        } else {
            UnitSelectDebounce = setTimeout(() => {
                isShowUnitSelect.value = false
            }, 300)
        }

    }
    const handelUnitClick = (item: UnitItem) => {
        if (activeUnit.value === item.value) {
            isShowUnitSelect.value = false
            return
        }
        const dpi = 96
        const inch = 2.54

        if (item.value === 'cm') {
            // px 转 cm
            if (sizeInputWidth.value) {
                sizeInputWidth.value = parseFloat((sizeInputWidth.value * inch / dpi).toFixed(2))
            }
            if (sizeInputHeight.value) {
                sizeInputHeight.value = parseFloat((sizeInputHeight.value * inch / dpi).toFixed(2))
            }
        } else {
            // cm 转 px
            if (sizeInputWidth.value) {
                sizeInputWidth.value = Math.round(sizeInputWidth.value * dpi / inch)
            }
            if (sizeInputHeight.value) {
                sizeInputHeight.value = Math.round(sizeInputHeight.value * dpi / inch)
            }
        }
        activeUnit.value = item.value
        isShowUnitSelect.value = false
    }



    const isLock = ref<boolean>(false)
    const lockedRatio = ref<number>(1)

    const toggleLock = () => {
        isLock.value = !isLock.value
        if (isLock.value) {
            if (sizeInputHeight.value && sizeInputHeight.value !== 0) {
                lockedRatio.value = sizeInputWidth.value / sizeInputHeight.value
            } else {
                lockedRatio.value = 1
            }
        }
    }

    const handleWidthInput = () => {
        if (!isLock.value) return
        if (activeUnit.value === 'px') {
            sizeInputHeight.value = Math.round(sizeInputWidth.value / lockedRatio.value)
        } else {
            sizeInputHeight.value = parseFloat((sizeInputWidth.value / lockedRatio.value).toFixed(2))
        }
    }

    const handleHeightInput = () => {
        if (!isLock.value) return
        if (activeUnit.value === 'px') {
            sizeInputWidth.value = Math.round(sizeInputHeight.value * lockedRatio.value)
        } else {
            sizeInputWidth.value = parseFloat((sizeInputHeight.value * lockedRatio.value).toFixed(2))
        }
    }




    const handelCreateClick = () => {
        isStartCreateDialogVisible.value = false
        if (activeUnit.value === 'cm') {
            const dpi = 96
            const inch = 2.54
            canvasWidth.value = Math.round(sizeInputWidth.value * dpi / inch)
            canvasHeight.value = Math.round(sizeInputHeight.value * dpi / inch)
        } else {
            canvasWidth.value = sizeInputWidth.value
            canvasHeight.value = sizeInputHeight.value
        }
        console.log('画布尺寸:', canvasWidth.value, canvasHeight.value);
        navigateTo('/create')
    }



    interface SizeItem {
        label: string
        width: number
        height: number
        i18nKey: string
        icon: string
    }
    const normalSizeList = ref<SizeItem[]>([
        {
            label: '1242 x 2208 px',
            width: 1242,
            height: 2208,
            i18nKey: 'mobilePoster',
            icon: ''
        },
        {
            label: '1440 x 1400 px',
            width: 1440,
            height: 1400,
            i18nKey: 'ecommerceMainImage',
            icon: ''
        },
        {
            label: '800 x 800 px',
            width: 800,
            height: 800,
            i18nKey: 'ecommerceMainImage',
            icon: ''
        },
        {
            label: '1920 x 1080 px',
            width: 1920,
            height: 1080,
            i18nKey: 'PTT',
            icon: ''
        },
        {
            label: '1242 x 1656 px',
            width: 1242,
            height: 1656,
            i18nKey: 'redbookCover',
            icon: ''
        },
        {
            label: '1080 x 1920 px',
            width: 1080,
            height: 1920,
            i18nKey: 'verticalVideoCover',
            icon: ''
        }
    ])


    const handelSizeClick = (item: SizeItem) => {
        isLock.value = false
        if (activeUnit.value === 'cm') {
            const dpi = 96
            const inch = 2.54
            sizeInputWidth.value = parseFloat((item.width * inch / dpi).toFixed(2))
            sizeInputHeight.value = parseFloat((item.height * inch / dpi).toFixed(2))
        } else {
            sizeInputWidth.value = item.width
            sizeInputHeight.value = item.height
        }
    }
</script>

<style lang="scss" scoped>
    .start_create_dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 700px;
        min-height: 384px;
        width: max-content;
        padding: 32px;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;

        .title_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;

            .title_text {

                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 18px;
                color: #333333;
            }

            .close_btn {

                cursor: pointer;
            }
        }

        .size_input_box {
            display: flex;
            align-items: center;
            column-gap: 12px;

            .size_input_item {

                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 44px;
                background: #F7F6FA;
                border-radius: 10px 10px 10px 10px;
                padding: 0 16px;
                min-width: 150px;

                input {
                    width: 120px;
                    border: none;
                    outline: none;
                    background-color: transparent;

                    &::-webkit-inner-spin-button,
                    &::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    -moz-appearance: textfield;
                }

                .unit {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 14px;
                    color: #666666;
                }
            }

            .lock {
                width: 44px;
                height: 44px;
                background: #F7F6FA;
                border-radius: 10px 10px 10px 10px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 24px;
                    height: 24px;
                }
            }

            .unit_select {
                position: relative;
                box-sizing: border-box;
                min-width: 120px;
                height: 44px;
                background: #F7F6FA;
                border-radius: 10px 10px 10px 10px;
                padding: 0 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;

                .unit_list {
                    position: absolute;
                    top: 50px;
                    left: 0;
                    width: 100%;


                    box-sizing: border-box;

                    background: #FFFFFF;
                    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
                    border-radius: 10px 10px 10px 10px;
                    padding: 10px 0;

                    .unit_item {
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 12px;
                        box-sizing: border-box;

                        span {
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 400;
                            font-size: 14px;
                            color: #666666;
                        }

                        img {
                            width: 24px;
                            height: 24px;
                        }
                    }

                    .active_item {
                        span {
                            color: #6B42F2;
                        }
                    }
                }

                .unit_label {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 14px;
                    color: #666666;
                }

                .unit_arrow {
                    width: 12px;
                    height: 12px;
                }
            }

            .create_btn {
                box-sizing: border-box;
                min-width: 124px;
                padding: 0 46px;
                height: 44px;
                background: #6B42F2;
                border-radius: 10px 10px 10px 10px;
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 16px;
                color: #FFFFFF;
                line-height: 44px;
                cursor: pointer;
            }

        }

        .size_tips {
            margin-top: 8px;
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 10px;
            color: #FF0000;
        }

        .size_default_box {
            margin-top: 10px;

            .size_default_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 500;
                font-size: 18px;
                color: #333333;
            }

            .size_default_list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                column-gap: 18px;
                row-gap: 16px;

                .size_default_item {
                    height: 72px;
                    background: #F7F6FA;
                    border-radius: 10px 10px 10px 10px;
                    box-sizing: border-box;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;

                    .size_img {
                        width: 40px;
                        height: 40px;
                    }

                    .info_box {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        row-gap: 6px;

                        .name {
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 500;
                            font-size: 14px;
                            color: #333333;
                        }

                        .label {
                            font-family: Source Han Sans SC, Source Han Sans SC;
                            font-weight: 400;
                            font-size: 10px;
                            color: rgba(51, 51, 51, 0.5);
                        }
                    }
                }
            }
        }
    }
</style>
