<template>
    <div class="gradient_box">
        <div class="gradient_num_box">
            <p class="gradient_num_title">
                {{ $t("gradientNum") }}
            </p>
            <div class="gradient_num_input_box">
                <div class="num_box">
                    <input type="number" v-model.number="gradientNum" min="2" max="4" />
                </div>
                <div class="deg_box">
                    <input type="number" v-model.number="deg" />
                    <span>°</span>
                </div>
            </div>

            <div class="gradient_color_edit" ref="gradientEditRef" :style="{ background: gradientBackground }">
                <div class="gradient_point" :class="{ 'active': activePoint === point.id }"
                    v-for="point in gradientPointList" :key="point.id" @mousedown="handlePointMouseDown($event, point)"
                    @click.stop="handleClickPoint(point)"
                    :style="{ left: `${pointCursorLeft(point)}%`, '--gradient-point-color': point.color }"></div>
            </div>
            <div class="mid_line">

            </div>

            <!-- 色相条 -->
            <div class="hue_slider" ref="hueSliderRef" @mousedown="startHuePicking">
                <div class="hue_cursor" :style="{ left: hueCursorLeft + '%' }"></div>
            </div>
            <!-- 透明度滑块 -->
            <div class="opacity_slider" ref="opacitySliderRef" @mousedown="startOpacityPicking">
                <div class="opacity_background" :style="{
                    background: `linear-gradient(to right, transparent, ${pureColor})`
                }"></div>
                <div class="opacity_cursor" :style="{ left: opacityCursorLeft + '%' }"></div>
            </div>
            <!-- 颜色代码 -->
            <div class="hex_color_content">
                <div class="picker_color" v-loading="isloadingColor" :class="{ 'active': isPickColor }"
                    ref="pickColorRef" @click="pickColor">
                    <img src="/img/colorPicker.png" alt="">
                </div>
                <div class="hex_color_text">
                    {{ displayHexColor.slice(1) }}
                </div>
                <div class="hex_opacity_input">
                    <input type="number" v-model.number="opacityPercent" min="0" max="100" step="1" :disabled="true">
                    <span>%</span>
                </div>
            </div>
            <div class="mid_line"></div>
            <div class="history_color_list">
                <p class="history_color_title">
                    {{ $t("recentlyUsed") }}
                </p>
                <ul class="history_color_list_content">
                    <li v-for="(item, index) in historyColorList" :key="index" :style="{ background: item }"
                        @click="setDefaultGradient(item)">

                    </li>
                </ul>
            </div>
            <div class="default_color_list">
                <p class="history_color_title">
                    {{ $t("recentlyUsed") }}
                </p>
                <ul class="history_color_list_content">
                    <li v-for="(item, index) in defaultColorList" :key="index" :style="{ background: item }"
                        @click="setDefaultGradient(item)">

                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
    import generateGradientId from '@/utils/generateId'
    import html2canvas from 'html2canvas';

    const stores = useMainStore()
    const { gradientPointColor, gradientBackgroundStyle } = storeToRefs(stores)


    const gradientNum = ref<number>(2)
    const deg = ref<number>(90)






    const historyColorList = ref<string[]>([
        `linear-gradient( 270deg, #FD7283 0%, #C3E1F6 100%)`,
        `linear-gradient( 270deg, #E86905 0%, #F8CC22 100%)`,
        `linear-gradient( 270deg, #ED068A 0%, #FB6469 100%)`,
        `linear-gradient( 180deg, #FF2021 0%, #991314 100%)`
    ])
    const defaultColorList = ref<string[]>([
        `linear-gradient( 270deg, #FF2925 0%, #FFE13B 100%)`,
        `linear-gradient( 270deg, #3D80FF 0%, #23B8FF 100%)`,
        `linear-gradient( 270deg, #FF8FFE 0%, #FC3CAA 100%)`,
        `linear-gradient( 270deg, #33C71E 0%, #C5DF66 100%)`,
        `linear-gradient( 270deg, #90C5FC 0%, #DFC3FC 100%)`,
        `linear-gradient( 270deg, #04D495 0%, #00E8B8 100%)`,
        `linear-gradient( 270deg, #FF7415 0%, #FFC166 100%)`,
        `linear-gradient( 270deg, #F408FE 0%, #09D3DF 100%)`
    ])





    const setDefaultGradient = (item: string) => {
        const didApply = applyGradientStyle(item)
        if (!didApply) {
            gradientBackgroundStyle.value = item
        }
    }



    interface GradientPoint {
        color: string
        position: number
        active: boolean
        id: string
    }


    const activePoint = ref<string>('')
    const gradientPointList = ref<GradientPoint[]>([])

    function getSafeGradientNum(value: unknown) {
        const raw = typeof value === 'number' ? value : Number(value)
        const safeRaw = Number.isFinite(raw) ? Math.round(raw) : 2
        return Math.min(4, Math.max(2, safeRaw))
    }

    function splitGradientArgs(text: string) {
        const parts: string[] = []
        let buffer = ''
        let depth = 0
        for (const char of text) {
            if (char === '(') depth += 1
            if (char === ')') depth = Math.max(0, depth - 1)

            if (char === ',' && depth === 0) {
                parts.push(buffer.trim())
                buffer = ''
                continue
            }

            buffer += char
        }

        if (buffer.trim()) {
            parts.push(buffer.trim())
        }

        return parts
    }

    function parseLinearGradient(style: string) {
        const raw = (style || '').trim()
        const match = raw.match(/^linear-gradient\((.*)\)$/i)
        if (!match) {
            return null
        }

        const args = splitGradientArgs(match[1] ?? '')
        if (!args.length) {
            return null
        }

        const angleMatch = (args[0] ?? '').match(/^(-?\d+(?:\.\d+)?)deg$/i)
        const angle = angleMatch ? Number(angleMatch[1]) : null
        const stopArgs = angle !== null ? args.slice(1) : args
        if (!stopArgs.length) {
            return null
        }

        const stops = stopArgs
            .map((stopText) => {
                const percentMatch = stopText.match(/(-?\d+(?:\.\d+)?)%\s*$/)
                if (!percentMatch) {
                    return null
                }
                const position = Number(percentMatch[1])
                const color = stopText.replace(percentMatch[0], '').trim()
                if (!color) {
                    return null
                }
                return {
                    color,
                    position: Math.max(0, Math.min(100, position))
                }
            })
            .filter((item): item is { color: string; position: number } => Boolean(item))

        if (stops.length < 2) {
            return null
        }

        return {
            angle: angle ?? 90,
            stops
        }
    }

    function applyGradientStyle(style: string) {
        const parsed = parseLinearGradient(style)
        if (!parsed) {
            return false
        }

        deg.value = parsed.angle

        const sortedStops = [...parsed.stops].sort((a, b) => a.position - b.position)
        gradientPointList.value = sortedStops.map((stop) => ({
            color: stop.color,
            position: stop.position,
            active: false,
            id: generateGradientId()
        }))

        gradientNum.value = getSafeGradientNum(gradientPointList.value.length)
        activePoint.value = gradientPointList.value[0]?.id ?? ''

        return true
    }

    function applyDefaultGradient() {
        gradientNum.value = 2
        deg.value = 90
        gradientPointList.value = [
            {
                color: '#fd2021',
                position: 33,
                active: false,
                id: generateGradientId()
            },
            {
                color: '#B65FE6',
                position: 66,
                active: false,
                id: generateGradientId()
            }
        ]
        activePoint.value = gradientPointList.value[0]?.id ?? ''
    }

    const hasHydratedFromStore = ref(false)

    onMounted(() => {
        const storedStyle = gradientBackgroundStyle.value
        const didApply = storedStyle ? applyGradientStyle(storedStyle) : false
        if (!didApply) {
            applyDefaultGradient()
        }
        hasHydratedFromStore.value = true
    })

    watch(gradientNum, (value, previous) => {
        if (!hasHydratedFromStore.value) {
            return
        }

        const safe = getSafeGradientNum(value)
        if (safe !== value) {
            gradientNum.value = safe
            return
        }

        const prevSafe = getSafeGradientNum(previous)
        if (safe === prevSafe) {
            return
        }

        const sorted = [...gradientPointList.value].sort((a, b) => a.position - b.position)
        const nextList: GradientPoint[] = []

        for (let index = 0; index < safe; index += 1) {
            const fraction = (index + 1) / (safe + 1)
            const position = fraction * 100
            const existing = sorted[index]

            if (existing) {
                nextList.push({
                    color: existing.color,
                    position,
                    active: false,
                    id: existing.id
                })
                continue
            }

            const fallbackColor = sorted[sorted.length - 1]?.color ?? '#ffffff'
            nextList.push({
                color: gradientPointColor.value || fallbackColor,
                position,
                active: false,
                id: generateGradientId()
            })
        }

        gradientPointList.value = nextList
        if (!nextList.some((item) => item.id === activePoint.value)) {
            activePoint.value = nextList[0]?.id ?? ''
        }
    })


    const pointCursorLeft = (point: GradientPoint) => {
        const base = point.position
        const min = 4
        const max = 96
        if (base < min) {
            return min
        }
        if (base > max) {
            return max
        }
        return base
    }
    //渐变色背景生成
    const gradientBackground = computed(() => {
        const angle = Number.isFinite(deg.value) ? deg.value : 0

        if (!gradientPointList.value.length) {
            return '#ffffff'
        }

        const sortedPoints = [...gradientPointList.value].sort((a, b) => a.position - b.position)
        const stops = sortedPoints.map((point) => {
            const positionPercent = Math.max(0, Math.min(100, point.position))
            const color = point.color || 'transparent'
            return `${color} ${positionPercent}%`
        })

        return `linear-gradient(${angle}deg, ${stops.join(', ')})`
    })
    //存储渐变色样式
    watch(gradientBackground, (value) => {
        gradientBackgroundStyle.value = value
        console.log('gradientBackgroundStyle updated:', value)
    })

    const gradientEditRef = ref<HTMLDivElement | null>(null)

    const handlePointMouseDown = (event: MouseEvent, point: GradientPoint) => {
        event.preventDefault()
        event.stopPropagation()

        if (!gradientEditRef.value) {
            return
        }

        activePoint.value = point.id

        const rect = gradientEditRef.value.getBoundingClientRect()

        const handleMouseMove = (e: MouseEvent) => {
            const clampedClientX = Math.max(rect.left, Math.min(rect.right, e.clientX))
            const percent = ((clampedClientX - rect.left) / rect.width) * 100

            const sorted = [...gradientPointList.value].sort((a, b) => a.position - b.position)
            const index = sorted.findIndex((item) => item.id === point.id)

            const prev = sorted[index - 1]
            const minNeighbor = index > 0 && prev ? prev.position + 1 : 0
            const next = sorted[index + 1]
            const maxNeighbor = next ? next.position - 1 : 100


            const nextPosition = Math.max(minNeighbor, Math.min(maxNeighbor, percent))

            const target = gradientPointList.value.find((item) => item.id === point.id)
            if (target) {
                target.position = nextPosition
            }
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleClickPoint = (point: GradientPoint) => {
        activePoint.value = point.id


        // if (gradientPointColor.value) {
        //     point.color = gradientPointColor.value
        // }

    }




    //色相条
    const hue = defineModel('hue', {
        default: 0,
        type: Number,
    })

    const saturation = defineModel('saturation', {
        default: 0,
        type: Number,
    })
    const value = defineModel('value', {
        default: 0,
        type: Number,
    })

    //透明度 0-1
    const opacity = defineModel('opacity', {
        default: 1,
        type: Number,
    })

    const hueCursorLeft = computed(() => {
        const base = (hue.value / 360) * 100
        const min = 4
        const max = 96
        if (base < min) {
            return min
        }
        if (base > max) {
            return max
        }
        return base
    })
    const hueSliderRef = ref<HTMLDivElement>()

    function startHuePicking(event: MouseEvent) {
        if (!activePoint.value) return
        const rect = hueSliderRef.value!.getBoundingClientRect()
        const updateHue = (e: MouseEvent) => {
            const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            hue.value = Math.max(0, Math.min(360, x * 360))
            updateHexColor()
        }

        updateHue(event)

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault()
            updateHue(e)
        }
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }


    function updateHexColor() {
        const { r, g, b } = hsvToRgb(hue.value, saturation.value, value.value)
        const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity.value})`
        gradientPointColor.value = rgbaColor

    }



    watch(() => gradientPointColor.value, (newV) => {
        if (newV) {
            const activeItem = gradientPointList.value.find((item: GradientPoint) => item.id === activePoint.value)
            if (activeItem) {
                activeItem.color = newV
            }
        }
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


    //透明度
    const opacitySliderRef = ref<HTMLDivElement>()
    const pureColor = computed(() => {
        return `hsl(${hue.value}, 100%, 50%)`
    })
    const opacityCursorLeft = computed(() => {
        const base = (opacity.value) * 100
        const min = 4
        const max = 96
        if (base < min) {
            return min
        }
        if (base > max) {
            return max
        }
        return base
    })
    function startOpacityPicking(event: MouseEvent) {
        if (!activePoint.value) return
        const rect = opacitySliderRef.value!.getBoundingClientRect()
        const updateOpacity = (e: MouseEvent) => {
            const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            opacity.value = Math.max(0, Math.min(1, x))
            updateHexColor()
        }

        updateOpacity(event)

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault()
            updateOpacity(e)
        }
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }


    // 颜色选取
    const displayHexColor = computed(() => {
        return hsvToHex(hue.value, saturation.value, value.value)
    })

    const opacityPercent = computed({
        get() {
            return Math.round(opacity.value * 100)
        },
        set(value: number | string) {
            const raw = typeof value === 'string' ? Number(value) : value
            const safe = Number.isFinite(raw) ? raw : 0
            const clamped = Math.min(100, Math.max(0, safe))
            opacity.value = clamped / 100
        }
    })
    function hsvToHex(h: number, s: number, v: number): string {
        const { r, g, b } = hsvToRgb(h, s, v)
        return `#${[r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }).join('').toUpperCase()}`
    }

    const pickColorFn = async (e: MouseEvent) => {
        if (!isPickColor.value) {
            return
        }

        // 检查是否点击的是拾色器按钮
        const target = e.target as HTMLElement
        const isPickerButton = target.closest('.picker_color')

        if (isPickerButton) {
            // 如果点击的是拾色器按钮，不阻止事件，让按钮正常工作
            return
        }

        // 阻止其他所有点击事件
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        if (isloadingColor.value) {
            return
        }
        isloadingColor.value = true
        // 使用html2canvas直接获取页面截图
        const canvas = await html2canvas(document.documentElement, {
            useCORS: true,
            allowTaint: true,
            scale: 1,
            backgroundColor: null, // 不设置背景色，保持透明
            logging: false, // 关闭日志避免干扰
            width: window.innerWidth,
            height: window.innerHeight,
            x: window.scrollX,
            y: window.scrollY
        })

        // 临时显示canvas用于调试（可选）
        console.log('html2canvas生成成功:', {
            width: canvas.width,
            height: canvas.height,
            dataURL: canvas.toDataURL().substring(0, 100) + '...'
        })
        isloadingColor.value = false

        const ctx = canvas.getContext('2d')
        if (!ctx) {
            return
        }

        // 获取点击位置的颜色（使用视口坐标）
        const x = e.clientX
        const y = e.clientY

        console.log('点击坐标:', { x, y })
        console.log('canvas尺寸:', { width: canvas.width, height: canvas.height })
        console.log('页面滚动:', { scrollX: window.scrollX, scrollY: window.scrollY })

        // 检查坐标是否在canvas范围内
        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            console.warn('坐标超出canvas范围:', { x, y, canvasWidth: canvas.width, canvasHeight: canvas.height })
            return
        }

        const pixel = ctx.getImageData(x, y, 1, 1).data
        console.log('原始像素数据:', pixel);
        console.log('像素值:', {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2],
            a: pixel[3]
        })

        // 检查像素数据是否有效
        if (!pixel || pixel.length < 4) {
            console.error('无效的像素数据')
            return
        }

        function hexToHsv(hex: string): { h: number, s: number, v: number } {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return rgbToHsv(r, g, b)
        }
        // RGB转十六进制
        function rgbToHex(r: number, g: number, b: number) {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
        }
        function rgbToHsv(r: number, g: number, b: number): { h: number, s: number, v: number } {
            r /= 255
            g /= 255
            b /= 255

            const max = Math.max(r, g, b)
            const min = Math.min(r, g, b)
            const d = max - min

            let h = 0
            const s = max === 0 ? 0 : d / max
            const v = max

            if (d !== 0) {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break
                    case g: h = (b - r) / d + 2; break
                    case b: h = (r - g) / d + 4; break
                }
                h /= 6
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                v: Math.round(v * 100)
            }
        }
        function updateFromHex() {
            if (/^#[0-9A-F]{6}$/i.test(gradientPointColor.value)) {
                const hsv = hexToHsv(gradientPointColor.value)
                hue.value = hsv.h
                saturation.value = hsv.s
                value.value = hsv.v
                opacity.value = 1
            }
        }
        // 确保 pixel 数组的值都存在且为数字类型
        const color = rgbToHex(
            pixel[0] ?? 0,
            pixel[1] ?? 0,
            pixel[2] ?? 0
        )
        console.log('最终颜色:', color)

        // 设置拾取到的颜色
        gradientPointColor.value = color
        gradientBackgroundStyle.value = ''
        updateFromHex()

        // 拾取完成后恢复鼠标样式并移除事件监听
        isPickColor.value = false
        document.body.style.cursor = 'default'
        document.body.classList.remove('color-picking-mode')
        document.removeEventListener('click', pickColorFn, true)
    }

    const isPickColor = ref<boolean>(false)
    const isloadingColor = ref<boolean>(false)
    const pickColor = () => {

        isPickColor.value = !isPickColor.value
        if (!isPickColor.value) {
            document.body.style.cursor = 'default'
            document.body.classList.remove('color-picking-mode')
            return
        }

        document.body.style.cursor = 'crosshair !important'
        document.body.classList.add('color-picking-mode')
        document.addEventListener('click', pickColorFn, true)



    }
</script>

<style lang="scss" scoped>

    .gradient_box {

        .gradient_num_box {
            .gradient_num_title {
                font-family: Source Han Sans SC, Source Han Sans SC;
                font-weight: 400;
                font-size: 12px;
                color: #333333;
                margin-bottom: 10px;
            }

            .gradient_num_input_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;

                .num_box {
                    width: 80px;
                    height: 26px;
                    background: #F7F6FA;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #000000;

                    input {
                        width: 80px;
                        min-width: 0;
                        outline: none;
                        border: none;
                        background: transparent;

                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                    }
                }

                .deg_box {
                    width: 60px;
                    height: 26px;
                    background: #F7F6FA;
                    border-radius: 6px 6px 6px 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 12px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #000000;

                    input {
                        width: 30px;
                        min-width: 0;
                        outline: none;
                        border: none;
                        background: transparent;
                        font-family: Source Han Sans SC, Source Han Sans SC;
                        font-weight: 400;
                        font-size: 12px;
                        color: #000000;
                        text-align: center;


                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                    }
                }
            }

            .gradient_color_edit {
                width: 100%;
                height: 20px;
                background: linear-gradient(90deg, #E5D2F7 0%, #B65FE6 100%);
                border-radius: 6px 6px 6px 6px;
                position: relative;

                .gradient_point {
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    border-radius: 6px;
                    box-sizing: border-box;
                    border: 4px solid #ffffff;
                    // background-color: rgba(0, 0, 0, 0.6);
                    cursor: pointer;
                    overflow: hidden;

                    &::after {
                        content: '';
                        position: absolute;
                        inset: -5px;
                        border-radius: 4px;
                        background-color: var(--gradient-point-color);
                    }

                    &.active {
                        box-shadow: 0 0 0 2px #4C3FFE;
                    }
                }
            }

            .mid_line {
                width: 100%;
                border-bottom: 1px solid #EEEEEE;
                margin: 12px 0;
            }

            .hue_slider {
                width: 100%;
                height: 16px;
                background: linear-gradient(to right,
                        #ff0000 0%, #ffff00 17%, #00ff00 33%,
                        #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
                border-radius: 12px;
                position: relative;
                cursor: pointer;
                margin-bottom: 10px;

                .hue_cursor {
                    position: absolute;
                    top: 50%;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border: 4px solid #ffffff;
                    background: transparent;
                    transform: translate(-50%, -50%);
                    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16);
                    pointer-events: none;
                }
            }

            .opacity_slider {
                width: 100%;
                height: 16px;
                border-radius: 12px;
                position: relative;
                cursor: pointer;
                background-image:
                    linear-gradient(45deg, #ccc 25%, transparent 25%),
                    linear-gradient(-45deg, #ccc 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #ccc 75%),
                    linear-gradient(-45deg, transparent 75%, #ccc 75%);
                background-size: 8px 8px;
                background-position: 0 0, 0 4px, 4px -4px, -4px 0px;

                .opacity_background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 12px;
                }

                .opacity_cursor {
                    position: absolute;
                    top: 50%;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border: 4px solid #ffffff;
                    background: transparent;
                    transform: translate(-50%, -50%);
                    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16);
                    pointer-events: none;
                }
            }

            .hex_color_content {
                margin-top: 10px;
                width: 100%;
                display: flex;
                align-items: center;

                .picker_color {
                    width: 26px;
                    height: 26px;
                    background: #F7F6FA;
                    border-radius: 6px 6px 6px 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 4px;
                    position: relative;

                    img {
                        width: 16px;
                        height: 16px;
                    }

                    :deep(.el-loading-mask) {
                        border-radius: 6px;
                        background-color: transparent;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    :deep(.el-loading-spinner) {
                        --el-loading-spinner-size: 16px;
                        font-size: 16px;
                        width: 16px;
                        height: 16px;
                        margin-top: 0;
                        margin: 0;
                        position: static;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    :deep(.el-loading-spinner .circular) {
                        width: 16px;
                        height: 16px;
                    }
                }

                .active {
                    filter: brightness(0.8);
                }

                .hex_color_text {
                    width: 102px;
                    height: 26px;
                    border-radius: 6px 0px 0px 6px;
                    background: #F7F6FA;
                    box-sizing: border-box;
                    padding-left: 15px;
                    line-height: 26px;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 10px;
                    color: #333333;
                }

                .hex_opacity_input {
                    margin-left: 2px;
                    width: 62px;
                    height: 26px;
                    border-radius: 0px 6px 6px 0px;
                    background: #F7F6FA;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 500;
                    font-size: 10px;
                    color: #333333;

                    input {
                        text-align: center;
                        display: block;
                        width: 22px;
                        outline: none;
                        border: none;
                        background: transparent;

                        &::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                        }
                    }

                    span {
                        line-height: 26px;
                    }
                }
            }

            .history_color_list {
                .history_color_title {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #333333;
                    margin-bottom: 10px;
                }

                .history_color_list_content {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;

                    li {
                        width: 44px;
                        height: 26px;
                        box-sizing: border-box;
                        border-radius: 6px 6px 6px 6px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        cursor: pointer;
                    }
                }
            }

            .default_color_list {
                .history_color_title {
                    font-family: Source Han Sans SC, Source Han Sans SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: #333333;
                    margin-bottom: 10px;
                }

                .history_color_list_content {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;

                    li {
                        width: 44px;
                        height: 26px;
                        box-sizing: border-box;
                        border-radius: 6px 6px 6px 6px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
