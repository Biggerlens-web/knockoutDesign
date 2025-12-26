<template>
    <div class="color_edit_box" v-show="showColorEdit" ref="colorEditRef">
        <div class="tab_bar">

            <div class="scroll_bar" ref="scrollBarRef" :style="{ width: tabBarWidth + 'px' }"></div>
            <ul class="bar">
                <li class="tab_bar_item" v-for="item in tabList" :key="item.value"
                    :class="{ 'active': item.value === activeTab }" @click="changeTab($event, item.value)">
                    {{ item.label }}
                </li>
            </ul>

        </div>
        <div class="under_line"></div>
        <div class="color_box color_picker" ref="colorPickerRef" @mousedown="startColorPicking">
            <div class="color_picker_overlay"></div>
            <div class="color_picker_cursor" :style="{
                left: Math.max(1, Math.min(99, saturation)) + '%',
                top: Math.max(1, Math.min(99, (100 - value))) + '%'
            }"></div>
        </div>
        <client-only>
            <div class="content">
                <component :is="comlist[activeTab]" v-model:hue="hue" v-model:saturation="saturation"
                    v-model:value="value" v-model:opacity="opacity" />
            </div>
        </client-only>


    </div>
</template>

<script lang="ts" setup>
    import solidColorCom from './solidColorCom.vue'
    import gradientCom from './gradientCom.vue'
    const stores = useMainStore()
    const { showColorEdit, colorEditType, fontColor, backgroundColor, gradientPointColor, gradientBackgroundStyle, colorEditActiveItem, clickColorComDefaultColor } = storeToRefs(stores)
    const comlist: any = {
        solidColor: solidColorCom,
        gradient: gradientCom,
    }

    const { t } = useI18n()
    const colorEditRef = ref<HTMLElement | null>(null)
    const scrollBarRef = ref<HTMLDivElement | null>(null)
    const activeTab = computed<string>({
        get() {
            return colorEditActiveItem.value || 'solidColor'
        },
        set(value: string) {
            colorEditActiveItem.value = value as 'solidColor' | 'gradient'
        }
    })

    const tabList = ref<{
        label: string
        value: string
    }[]>([
        {
            label: t('solidColor'),
            value: 'solidColor',
        },

    ])

    const tabBarWidth = computed(() => {
        return 192 / tabList.value.length
    })


    function getScrollBarTranslateX(tab: string) {
        const index = tabList.value.findIndex((item) => item.value === tab)
        if (index <= 0) {
            return -1
        }
        return index * tabBarWidth.value - 1
    }

    async function syncScrollBarPosition(tab: string) {
        await nextTick()
        if (!scrollBarRef.value) {
            return
        }
        scrollBarRef.value.style.transform = `translateX(${getScrollBarTranslateX(tab)}px)`
    }


    const changeTab = (e: MouseEvent, tab: string) => {
        activeTab.value = tab
        syncScrollBarPosition(tab)
    }




    //颜色选择
    const hue = ref(0)
    const saturation = ref(100)
    const value = ref(100)  // 使用HSV模型的Value而不是HSL的Lightness
    const opacity = ref(1)

    // Computed properties
    const pureColor = computed(() => {
        return `hsl(${hue.value}, 100%, 50%)`
    })
    const colorPickerRef = ref<any>(null)
    const startColorPicking = (event: MouseEvent) => {
        const rect = colorPickerRef.value!.getBoundingClientRect()
        const updateColor = (e: MouseEvent) => {
            const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
            saturation.value = Math.max(0, Math.min(100, x * 100))
            value.value = Math.max(0, Math.min(100, (1 - y) * 100))
            updateHexColor()
        }

        updateColor(event)

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault()
            updateColor(e)
        }
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (!showColorEdit.value) {
            return
        }
        const target = event.target as HTMLElement
        if (colorEditRef.value && colorEditRef.value.contains(target)) {
            return
        }
        if (target.closest('.canvas_background_color_box')) {
            return
        }
        if (target.closest('.font_color')) {
            return
        }
        showColorEdit.value = false
    }




    //显示隐藏渐变tab
    const changeGradientTab = (show: boolean) => {
        if (!show) {

            tabList.value = tabList.value.filter((item) => item.value !== 'gradient')
            return
        }
        if (tabList.value.some((item) => item.value === 'gradient')) {
            return
        }
        tabList.value.push({
            label: t('gradient'),
            value: 'gradient',
        })
    }
    //监听编辑器显示
    watch(() => showColorEdit.value, (newShowColorEdit) => {


        if (colorEditType.value === 'canvasBackgroundColor') {
            changeGradientTab(true)
            if (newShowColorEdit && clickColorComDefaultColor.value) {
                activeTab.value = 'solidColor'
                syncScrollBarPosition('solidColor')
            }
            if (newShowColorEdit && !clickColorComDefaultColor.value) {
                syncScrollBarPosition(activeTab.value)
            }
            if (!newShowColorEdit) {
                clickColorComDefaultColor.value = false
            }
        } else if (colorEditType.value === 'fontColor') {
            changeGradientTab(false)
            activeTab.value = 'solidColor'
            syncScrollBarPosition('solidColor')
        }


    })

    watch(() => activeTab.value, (tab) => {
        if (!showColorEdit.value) {
            return
        }
        syncScrollBarPosition(tab)
    })


    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })


    function hsvToRgb(h: number, s: number, v: number): { r: number, g: number, b: number } {
        h = h / 360
        s = s / 100
        v = v / 100

        const c = v * s
        const x = c * (1 - Math.abs((h * 6) % 2 - 1))
        const m = v - c

        let r = 0, g = 0, b = 0

        if (h >= 0 && h < 1 / 6) {
            r = c; g = x; b = 0
        } else if (h >= 1 / 6 && h < 2 / 6) {
            r = x; g = c; b = 0
        } else if (h >= 2 / 6 && h < 3 / 6) {
            r = 0; g = c; b = x
        } else if (h >= 3 / 6 && h < 4 / 6) {
            r = 0; g = x; b = c
        } else if (h >= 4 / 6 && h < 5 / 6) {
            r = x; g = 0; b = c
        } else {
            r = c; g = 0; b = x
        }

        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        }
    }
    function hsvToHex(h: number, s: number, v: number): string {
        const { r, g, b } = hsvToRgb(h, s, v)
        return `#${[r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }).join('').toUpperCase()}`
    }
    function updateHexColor() {
        const { r, g, b } = hsvToRgb(hue.value, saturation.value, value.value)
        if (colorEditType.value === 'canvasBackgroundColor') {
            if (activeTab.value === 'solidColor') {
                backgroundColor.value = `rgba(${r}, ${g}, ${b}, ${opacity.value})`
                gradientBackgroundStyle.value = ''
                console.log("🚀 ~ updateHexColor ~ backgroundColor.value:", backgroundColor.value)
            } else {
                gradientPointColor.value = `rgba(${r}, ${g}, ${b}, ${opacity.value})`
                console.log("🚀 ~ updateHexColor ~ gradientPointColor.value:", gradientPointColor.value)
            }
        } else if (colorEditType.value === 'fontColor') {

            fontColor.value = `rgba(${r}, ${g}, ${b}, ${opacity.value})`
            console.log("🚀 ~ updateHexColor ~ fontColor.value:", fontColor.value)

        }


    }

</script>

<style lang="scss" scoped>
    .color_edit_box {
        width: 220px;
        min-height: 500px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
        border-radius: 12px 12px 12px 12px;
        box-sizing: border-box;
        padding: 12px;

        .tab_bar {
            box-sizing: border-box;
            padding: 2px;
            width: 100%;
            height: 30px;
            background: #f7f6fa;
            border-radius: 6px 6px 6px 6px;
            display: flex;
            align-items: center;
            position: relative;

            .scroll_bar {
                position: absolute;
                height: calc(100% - 4px);
                background: #FFFFFF;
                border-radius: 4px 4px 4px 4px;
                z-index: 1;
                transition: all 0.3s ease-in-out;
            }

            .bar {
                width: 100%;
                display: flex;
                align-items: center;
                position: absolute;
                left: 0;
                z-index: 2;

                .tab_bar_item {

                    cursor: pointer;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 10px;
                    color: #666666;
                    text-align: center;
                }

                .active {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 10px;
                    color: #333333;
                }
            }



        }

        .under_line {
            margin-top: 12px;
            border-radius: 0px 0px 0px 0px;
            border-bottom: 1px solid #EEEEEE;
            margin-bottom: 12px;
        }

        .color_box {
            width: 196px;
            height: 150px;
            border-radius: 0px 0px 0px 0px;
        }

        .color_picker {
            background: v-bind(pureColor);
            overflow: hidden;
            position: relative;
            cursor: crosshair;

            .color_picker_overlay {
                position: absolute;
                width: 105%;
                height: 105%;
                left: -5%;
                top: -5%;
                z-index: 2;
                background:
                    linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%),
                    linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);

            }

            .color_picker_cursor {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid #fff;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
                pointer-events: none;
            }

        }

        .content {
            margin-top: 10px;
        }
    }
</style>
