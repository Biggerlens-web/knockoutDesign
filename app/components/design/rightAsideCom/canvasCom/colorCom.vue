<template>
    <div class="canvas_background_color_box">
        <p class="title">
            {{ $t('customColor') }}
        </p>

        <div class="color_box" @click="handleClickColorBox">
            <ClientOnly>
                <div class="color_item"
                    :style="{ 'background': colorEditActiveItem === 'gradient' ? gradientBackgroundStyle : backgroundColor }">

                </div>
            </ClientOnly>

        </div>


        <div class="default_color_box" ref="defaultColorBoxRef">
            <p class="title">
                {{ $t('commonColor') }}
            </p>
            <ul class="default_color_list">
                <li class="default_color_item transparent_color" @click="handleClickDefaultColor('transparent')">
                    <img src="/img/transparentBg.png" alt="">
                </li>
                <li v-for="item in commonColorList" :key="item" :style="{ background: item }" class="default_color_item"
                    @click="handleClickDefaultColor(item)"></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>

    const stores = useMainStore()
    const { backgroundColor, showColorEdit, colorEditType, colorEditLeft, colorEditTop, gradientBackgroundStyle, colorEditActiveItem, clickColorComDefaultColor } = storeToRefs(stores)

    const defaultColorBoxRef = ref<HTMLElement | null>(null)

    function setColorEditPositionByRect(rect: DOMRect) {
        const editEl = document.querySelector('.color_edit_position') as HTMLElement | null
        if (!editEl) {
            return
        }

        const editElRect = editEl.getBoundingClientRect()

        colorEditLeft.value = rect.left - editElRect.width

        const viewportHeight = window.innerHeight
        const maxTop = viewportHeight - editElRect.height
        const rawTop = rect.top
        colorEditTop.value = Math.max(0, Math.min(rawTop, maxTop))
    }

    const handleClickColorBox = async (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement
        const rect = el.getBoundingClientRect()
        colorEditType.value = 'canvasBackgroundColor'

        showColorEdit.value = true
        await nextTick()

        setColorEditPositionByRect(rect)
    }

    const handleClickDefaultColor = async (color: string) => {
        backgroundColor.value = color
        gradientBackgroundStyle.value = ''

        clickColorComDefaultColor.value = true
        colorEditType.value = 'canvasBackgroundColor'
        showColorEdit.value = true
        await nextTick()

        const el = defaultColorBoxRef.value
        if (!el) {
            return
        }

        const rect = el.getBoundingClientRect()

        setColorEditPositionByRect(rect)
    }
    onMounted(() => {
        console.log('canvas background color com mounted', {
            backgroundColor: backgroundColor.value,
            gradientBackgroundStyle: gradientBackgroundStyle.value,
            colorEditActiveItem: colorEditActiveItem.value
        })
        showColorEdit.value = false
    })


    const commonColorList = ref<string[]>([

        '#ffffff',
        '#000000',
        '#656565',
        '#a7a7a7',
        '#d9d9d9',
        '#ff2021',
        '#ffbc4b',
        '#fef952',
        '#98e165',
        '#2fb5ff',
        '#5371ff',
        '#b65fe6',
        '#ffced2',
        '#ffe8bf',
        '#fcf2d6',
        '#d1ecda',
        '#ddefff',
        '#e5d2f7'
    ])
</script>

<style lang="scss" scoped>

    .canvas_background_color_box {
        margin-top: 24px;

        .title {
            font-family: Source Han Sans SC, Source Han Sans SC;
            font-weight: 400;
            font-size: 12px;
            color: #333333;
            margin-bottom: 10px;
        }

        .color_box {
            width: 196px;
            height: 30px;
            background: #F7F6FA;
            border-radius: 6px 6px 6px 6px;
            box-sizing: border-box;
            padding: 4px;
            cursor: pointer;

            .color_item {
                width: 100%;
                height: 100%;
                border-radius: 4px 4px 4px 4px;

            }
        }

        .default_color_box {
            margin-top: 24px;

            .title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #333333;
                margin-bottom: 10px;
            }

            .default_color_list {
                display: grid;

                grid-template-columns: repeat(6, 1fr);
                box-sizing: border-box;
                gap: 8px;

                .default_color_item {
                    cursor: pointer;
                    height: 26px;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }

                .transparent_color {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
</style>
