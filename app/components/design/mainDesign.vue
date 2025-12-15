<template>
    <div class="main_design_box">
        <div ref="leaferRef" class="leaferRef" id="leaferCanvas"></div>
    </div>
</template>

<script lang="ts" setup>

    const stores = useMainStore()
    const { canvasWidth, canvasHeight, scaleView } = storeToRefs(stores)


    //画布盒子
    const leaferRef = ref<HTMLElement | null>(null)
    const leaferRefWidth = ref(0)

    let resizeObserver: ResizeObserver | null = null












    // 将 Frame 居中的方法
    const centerFrame = () => {
        if (!app || !frame) return
        const container = app.view as HTMLElement
        const { width: vw, height: vh } = container.getBoundingClientRect()
        frame.set({
            x: (vw - (frame.width || 0)) / 2,
            y: (vh - (frame.height || 0)) / 2
        })
    }


    // 暴露 Leafer 构造器供其他函数使用（在客户端动态赋值）
    //TODO控制器构建
    let LeaferAppCtor: any = null
    let LeaferFrameCtor: any = null
    let LeaferRectCtor: any = null
    let LeaferEditorCtor: any = null
    let LeaferImageCtor: any = null
    let LeaferTextCtor: any = null
    let LeaferSnapCtor: any = null
    let LeaferEventCtor: any = null
    let LeaferBoundsEventCtor: any = null
    let LeaferBoxCtor: any = null
    // 记录背景矩形 id 以便尺寸更新时同步
    let backgroundRectId: string | null = null

    let app: any | null = null
    let frame: any | null = null

    const initLeafer = async () => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return
        const canvas = document.getElementById('leaferCanvas') as HTMLElement | null
        if (!canvas) return
        const { App, Frame, Rect, Image, Text, Box, PointerEvent, BoundsEvent, ZoomEvent } = await import('leafer-ui')
        // 导入图形编辑器插件 //
        const { Editor, EditorEvent } = await import('@leafer-in/editor')
        const { Snap } = await import('leafer-x-snap')
        await import('@leafer-in/viewport')
        await import('@leafer-in/view')
        await import('@leafer-in/export')
        await import('@leafer-in/find')
        await import('@leafer-in/text-editor') // 导入文本编辑插件 //

        // 赋值以便其他函数可用
        LeaferAppCtor = App
        LeaferFrameCtor = Frame
        LeaferRectCtor = Rect
        LeaferEditorCtor = Editor
        LeaferImageCtor = Image
        LeaferTextCtor = Text
        LeaferSnapCtor = Snap
        LeaferEventCtor = PointerEvent
        LeaferBoundsEventCtor = BoundsEvent
        LeaferBoxCtor = Box

        //leafer
        app = new App({
            view: canvas, fill: '#f8f6f9', // 背景色
            tree: { type: 'design' }, // 添加 tree 层
            sky: {}, // 添加 sky 层})
            wheel: {
                zoomSpeed: 0.5,
                preventDefault: true, // 阻止浏览器默认滚动行为

            }
        })


        // 使用 Rect 代替 Frame 作为画板容器
        frame = new Rect({
            width: canvasWidth.value,
            height: canvasHeight.value,
            fill: '#ffffff', // 设置白色背景
            editable: false, // 画板本身不可编辑
            shadow: {
                x: 0,     // 阴影在 X 方向的偏移
                y: 4,     // 阴影在 Y 方向的偏移
                blur: 24, // 模糊半径
                color: 'rgba(41,0,78,0.16)', // 阴影颜色（透明黑）
                box: true // 使用类似 CSS 的 box-shadow 效果
            }
        })
        app.tree.add(frame)
        centerFrame()


        // 创建编辑器并配置自定义样式
        app.editor = new Editor({
            // 基础样式配置
            stroke: '#B25EFF',           // 控制点和编辑框的描边颜色
            strokeWidth: 2,              // 描边宽度
            pointSize: 12,                // 控制点大小
            pointRadius: 4,              // 控制点圆角半径
            spread: 0,                   // 编辑框向外扩展值

            // 控制点样式
            point: {
                fill: '#ffffff',         // 控制点填充色
                stroke: '#ffffff',       // 控制点描边色
                strokeWidth: 2,
                cornerRadius: 6,
                shadow: {                // 添加阴影效果
                    x: 0,
                    y: 1,
                    blur: 4,
                    color: 'rgba(0,0,0,0.48)'
                }
            },

            // 中间控制点样式（可选显示）
            middlePoint: {
                width: 24,
                height: 12,
                cornerRadius: 8,
                fill: '#ffffff',
                stroke: '#ffffff',

                shadow: {
                    x: 0,
                    y: 1,
                    blur: 4,
                    color: 'rgba(0,0,0,0.48)'
                }
            },



            // 旋转控制点样式
            circle: {
                width: 16,
                height: 16,
                fill: '#ffffff',
                stroke: '#B25EFF',
                strokeWidth: 2,
                cornerRadius: 8,
                shadow: {
                    x: 0,
                    y: 2,
                    blur: 4,
                    color: 'rgba(0,0,0,0.2)'
                }
            },
            circleDirection: 'bottom',   // 旋转控制点位置
            circleMargin: 20,           // 旋转控制点到编辑框的距离

            // hover 状态样式
            hover: true,
            hoverStyle: {
                stroke: '#B25EFF',       // hover 时的颜色
                strokeWidth: 2,
                dashPattern: [5, 5],
                opacity: 0.6
            },

            // 选中状态样式
            selectedStyle: {
                stroke: '#B25EFF',
                strokeWidth: 2,
                opacity: 1
            },

            // 框选区域样式
            area: {
                fill: 'rgba(13, 153, 255, 0.1)',
                stroke: '#0d99ff',
                strokeWidth: 1
            },

            // 按钮组配置
            buttonsDirection: 'bottom',  // 按钮组位置
            buttonsMargin: 10,          // 按钮组边距
            buttonsFixed: false,        // 是否固定按钮位置

            // 高级效果
            bright: false,              // 是否突出显示选中元素
            dimOthers: false,           // 是否淡化其他元素
            mask: false                 // 是否添加遮罩层
        })


        app.sky.add(app.editor) // 添加图形编辑器，用于选中元素进行编辑操作

        // 编辑器显隐与选中同步到数据源
        app.editor.on(EditorEvent.SELECT, (e: any) => {

        })


        app.tree.on(ZoomEvent.BEFORE_ZOOM, (e: any) => {

            if (e.stop) e.stop()

            const isZoomIn = e.scale > 1
            const step = 0.1
            const delta = isZoomIn ? (1 + step) : (1 / (1 + step))
            const validDelta = app.tree.getValidScale(delta)
            const center = { x: e.x, y: e.y }
            app.tree.zoomLayer.scaleOfWorld(center, validDelta)

            const currentScale = scaleView.value / 100
            const nextScale = currentScale * delta
            const snapped = Math.abs(nextScale - 1) < 1e-6 ? 1 : nextScale
            scaleView.value = Math.min(800, Math.max(10, Math.round(snapped * 100)))
        })
            ; (window as any).setViewScalePercent = (percent: number) => {
                const clamped = Math.min(800, Math.max(10, Math.round(percent)))
                scaleView.value = clamped
                const absoluteScale = clamped / 100
                app.tree.zoom(absoluteScale)
            }


        // 初始化 Snap 插件 - 只能作用于 App 类型
        const snap = new Snap(app, {
            snapSize: 5,
            strokeWidth: 2,
        });

        // 启用吸附功能
        snap.enable(true);
    }



    onMounted(() => {
        initLeafer()
        if (leaferRef.value) {
            leaferRefWidth.value = leaferRef.value.clientWidth
            resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    centerFrame()
                }
            })
            resizeObserver.observe(leaferRef.value)
        }
    })
    onUnmounted(() => {
        if (resizeObserver) {
            resizeObserver.disconnect()
        }
    })

</script>

<style lang="scss" scoped>


    .main_design_box {
        flex: 1;
        min-width: 0;

        height: 100%;


        .leaferRef {
            width: 100%;
            height: 100%;
        }
    }
</style>