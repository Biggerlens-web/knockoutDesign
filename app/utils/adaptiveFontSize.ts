/**
 * 自适应字体大小计算工具
 * 根据容器宽度、高度和文本内容智能计算最适合的字体大小
 *
 * 优化更新：
 * 1. 参考 font.html 中的 DOM 测量方法，新增 findOptimalFontSizeWithDOM 函数
 * 2. DOM 测量方法使用真实 DOM 元素进行测量，比 Canvas 方法更精确
 * 3. 在精确模式、垂直文本、包含换行符或大字符间距时自动使用 DOM 方法
 * 4. 新增 calculateAdaptiveFontSizeWithDOM 导出函数，专门使用 DOM 测量
 * 5. 保留原有算法作为备用，确保兼容性
 */

/**
 * 字体大小计算参数接口
 */
export interface AdaptiveFontSizeParams {
    /** 容器宽度（像素） */
    width: number
    /** 容器高度（像素） */
    height: number
    /** 文本内容 */
    text: string
    /** 最小字体大小，默认 12px */
    minFontSize?: number
    /** 最大字体大小，默认 200px */
    maxFontSize?: number
    /** 字符间距，默认 0 */
    charSpacing?: number
    /** 行间距倍数，默认 1.2 */
    lineHeight?: number
    /** 内边距，默认 4px */
    padding?: number
    /** 字体族，用于更精确的测量 */
    fontFamily?: string
    /** 字体粗细 */
    fontWeight?: string | number
    /** 文本方向，默认 'horizontal' */
    direction?: 'horizontal' | 'vertical'
    /** 垂直文本的列间距，默认等于字体大小 */
    columnSpacing?: number
    /** 当前字体大小，如果提供则保持不变，不重新计算 */
    currentFontSize?: number
    /** 是否允许修改字体大小，默认 true */
    allowFontSizeChange?: boolean
    /** 精确测量模式（使用更精确但较慢的测量方法） */
    preciseMode?: boolean
    /** 自定义缩放因子 */
    customScaleFactor?: number
}

/**
 * 精确文本测量配置接口
 */
export interface PreciseTextMeasureConfig {
    /** 是否启用高DPI支持 */
    enableHighDPI?: boolean
    /** 是否等待字体加载完成 */
    waitForFontLoad?: boolean
    /** 测量采样次数，用于提高精度 */
    sampleCount?: number
    /** 是否使用实际DOM测量作为备选方案 */
    useDOMFallback?: boolean
}

/**
 * 字体大小计算结果接口
 */
export interface FontSizeResult {
    /** 计算出的字体大小 */
    fontSize: number
    /** 文本实际占用宽度 */
    textWidth: number
    /** 文本实际占用高度 */
    textHeight: number
    /** 是否达到最小字体大小限制 */
    isMinSize: boolean
    /** 是否达到最大字体大小限制 */
    isMaxSize: boolean
    /** 建议的行数 */
    suggestedLines: number
}

/**
 * 创建临时 Canvas 用于文本测量
 */
let measureCanvas: HTMLCanvasElement | null = null
let measureCtx: CanvasRenderingContext2D | null = null

/**
 * 格式化字体名称，处理包含特殊字符的字体
 */
function formatFontFamily(fontFamily: string): string {
    // 清理字体名称，移除空的引号和多余的空格
    const cleanedFontFamily = fontFamily.replace(/""/g, '').replace(/\s+/g, ' ').trim()

    // 如果清理后的字体名称为空，返回默认字体
    if (!cleanedFontFamily || cleanedFontFamily === '""') {
        return 'Arial'
    }

    // 如果字体名称包含空格或特殊字符，需要用引号包围
    if (cleanedFontFamily.includes(' ') || /[^a-zA-Z0-9\-_]/.test(cleanedFontFamily)) {
        return `"${cleanedFontFamily}"`
    }
    return cleanedFontFamily
}

/**
 * 改进的二分查找算法，参考 font.html 中的 DOM 测量方法
 * 使用真实 DOM 元素进行更精确的字号计算
 */
function findOptimalFontSizeWithDOM(text: string, targetWidth: number, targetHeight: number, minSize: number, maxSize: number, fontFamily: string, fontWeight: string | number, charSpacing: number, lineHeight: number, direction: 'horizontal' | 'vertical'): number {
    if (!text) return minSize

    // 创建临时 DOM 元素进行测量，参考 font.html 的实现
    const tempElement = document.createElement('div')
    tempElement.style.position = 'absolute'
    tempElement.style.left = '-9999px'
    tempElement.style.top = '-9999px'
    tempElement.style.visibility = 'hidden'
    tempElement.style.fontFamily = fontFamily
    tempElement.style.fontWeight = String(fontWeight)
    tempElement.style.lineHeight = String(lineHeight)
    tempElement.style.letterSpacing = `${charSpacing}px`
    tempElement.style.whiteSpace = 'pre-wrap'
    tempElement.style.margin = '0'
    tempElement.style.padding = '0'
    tempElement.style.border = 'none'
    tempElement.style.boxSizing = 'border-box'

    // 根据文本方向设置样式
    if (direction === 'vertical') {
        tempElement.style.writingMode = 'vertical-rl'
        tempElement.style.textOrientation = 'upright'
        tempElement.style.height = `${targetHeight}px`
        tempElement.style.width = 'auto'
    } else {
        tempElement.style.width = `${targetWidth}px`
        tempElement.style.height = 'auto'
    }

    tempElement.textContent = text
    document.body.appendChild(tempElement)

    let bestSize = minSize

    try {
        // 使用更精确的二分查找算法
        let currentMin = minSize
        let currentMax = maxSize

        // 增加迭代次数和精度
        for (let i = 0; i < 30; i++) {
            if (currentMax - currentMin < 0.1) {
                break
            }

            const midSize = (currentMin + currentMax) / 2
            tempElement.style.fontSize = `${midSize}px`

            // 强制重新计算布局
            tempElement.offsetHeight

            // 获取实际渲染尺寸
            const rect = tempElement.getBoundingClientRect()
            const elementWidth = direction === 'vertical' ? rect.width : rect.width
            const elementHeight = direction === 'vertical' ? rect.height : rect.height

            const tolerance = 0 // 负值允许稍微超出，获得更大字号
            const fitsWidth = elementWidth <= targetWidth - tolerance
            const fitsHeight = elementHeight <= targetHeight - tolerance

            if (fitsWidth && fitsHeight) {
                bestSize = midSize
                currentMin = midSize
            } else {
                currentMax = midSize - 0.1
            }
        }
    } finally {
        document.body.removeChild(tempElement)
    }

    return Math.round(bestSize * 10) / 10 // 保留一位小数
}

/**
 * 原有的递归二分查找算法（保留作为备用）
 */
function findOptimalFontSizeRecursive(
    text: string,
    targetWidth: number,
    targetHeight: number,
    minSize: number,
    maxSize: number,
    fontFamily: string,
    fontWeight: string | number,
    charSpacing: number,
    lineHeight: number,
    direction: 'horizontal' | 'vertical',
    preciseMode: boolean,
    isFirstCall: boolean = true
): number {
    // 边界条件检查
    if (minSize >= maxSize) return minSize

    // 防止无限递归的深度检查
    if (maxSize - minSize < 0.1) {
        return Math.floor(minSize)
    }

    // 首次调用时检查最大字号是否可行
    if (isFirstCall) {
        const maxSizeTest = direction === 'vertical' ? measureVerticalText(text, maxSize, fontFamily, fontWeight, charSpacing) : measureTextImproved(text, maxSize, fontFamily, fontWeight, charSpacing, preciseMode)

        const maxWidth = direction === 'vertical' ? maxSizeTest.width : maxSizeTest.width
        const maxHeight = direction === 'vertical' ? maxSizeTest.height : maxSize * lineHeight

        if (targetWidth >= maxWidth && targetHeight >= maxHeight) {
            return maxSize
        }
    }

    // 计算中间值
    const mid = Math.floor((maxSize + minSize) / 2)

    // 测量当前字号的文本尺寸
    const textSize = direction === 'vertical' ? measureVerticalText(text, mid, fontFamily, fontWeight, charSpacing) : measureTextImproved(text, mid, fontFamily, fontWeight, charSpacing, preciseMode)

    const actualWidth = textSize.width
    const actualHeight = direction === 'vertical' ? textSize.height : mid * lineHeight

    // 判断当前字号是否适合
    const fitsWidth = actualWidth <= targetWidth
    const fitsHeight = actualHeight <= targetHeight
    const fits = fitsWidth && fitsHeight

    if (!fits) {
        // 当前字号太大，搜索更小的字号
        if (mid <= minSize) {
            return minSize
        }
        return findOptimalFontSizeRecursive(text, targetWidth, targetHeight, minSize, mid - 1, fontFamily, fontWeight, charSpacing, lineHeight, direction, preciseMode, false)
    } else {
        // 当前字号适合，尝试更大的字号
        if (mid >= maxSize) {
            return maxSize
        }
        return findOptimalFontSizeRecursive(text, targetWidth, targetHeight, mid + 1, maxSize, fontFamily, fontWeight, charSpacing, lineHeight, direction, preciseMode, false)
    }
}

/**
 * 检查并等待字体加载
 */
async function ensureFontLoaded(fontFamily: string, fontWeight: string | number = 'normal', fontSize: number = 16): Promise<boolean> {
    if (!document.fonts || !document.fonts.load) {
        return true // 不支持字体API，假设已加载
    }

    try {
        const cleanFontFamily = formatFontFamily(fontFamily)
        const fontSpec = `${fontWeight} ${fontSize}px ${cleanFontFamily}`

        // 先检查字体是否已经可用
        if (document.fonts.check(fontSpec)) {
            return true
        }

        // 尝试加载字体
        await document.fonts.load(fontSpec)

        // 再次检查是否加载成功
        return document.fonts.check(fontSpec)
    } catch (error) {
        console.warn('Font loading failed for:', fontFamily, error)
        // 如果字体加载失败，尝试不使用字体检查直接返回true
        return true
    }
}

function getMeasureContext(): CanvasRenderingContext2D {
    if (!measureCanvas) {
        measureCanvas = document.createElement('canvas')
        measureCtx = measureCanvas.getContext('2d')

        // 设置高DPI支持，提高测量精度
        const dpr = window.devicePixelRatio || 1
        measureCanvas.width = 1000 * dpr
        measureCanvas.height = 1000 * dpr
        measureCtx!.scale(dpr, dpr)

        // 设置文本渲染属性以匹配DOM渲染
        measureCtx!.textBaseline = 'top'
        measureCtx!.textAlign = 'left'
    }
    return measureCtx!
}

/**
 * 测量文本在指定字体大小下的尺寸
 */
/**
 * 改进的文本测量函数，支持精确模式
 */
function measureTextImproved(text: string, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0, preciseMode: boolean = false): {width: number; height: number} {
    const canvasResult = measureText(text, fontSize, fontFamily, fontWeight, charSpacing)

    if (!preciseMode) {
        return canvasResult
    }

    // 精确模式：结合DOM测量进行验证
    try {
        const domResult = measureTextWithDOM(text, fontSize, fontFamily, fontWeight)

        // 如果DOM和Canvas测量结果差异较大，使用DOM结果
        const widthDiff = Math.abs(domResult.width - canvasResult.width) / canvasResult.width
        const heightDiff = Math.abs(domResult.height - canvasResult.height) / canvasResult.height

        // 对于特殊字体如Bebas Neue，降低差异阈值以提高精度
        const diffThreshold = fontFamily.includes('Bebas') || fontFamily.includes('bebas') ? 0.03 : 0.05

        if (widthDiff > diffThreshold || heightDiff > diffThreshold) {
            // 差异较大时，倾向于使用较大的测量结果以避免字体过小
            const adjustmentFactor = fontFamily.includes('Bebas') || fontFamily.includes('bebas') ? 1.05 : 1.02
            return {
                width: charSpacing > 0 ? canvasResult.width : Math.max(domResult.width, canvasResult.width) * adjustmentFactor,
                height: Math.max(domResult.height, canvasResult.height) * adjustmentFactor
            }
        }
    } catch (error) {
        console.warn('DOM measurement failed, falling back to Canvas:', error)
    }

    return canvasResult
}

function measureText(text: string, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0): {width: number; height: number} {
    const ctx = getMeasureContext()
    const cleanFontFamily = formatFontFamily(fontFamily)
    ctx.font = `${fontWeight} ${fontSize}px ${cleanFontFamily}`

    // 检查字体是否已加载，如果未加载则等待
    if (document.fonts && document.fonts.check) {
        const fontSpec = `${fontWeight} ${fontSize}px ${cleanFontFamily}`
        try {
            if (!document.fonts.check(fontSpec)) {
                // 对于特殊字体如Bebas Neue，尝试等待字体加载
                if (fontFamily.includes('Bebas') || fontFamily.includes('bebas')) {
                    // 使用原始字体进行测量，即使可能未完全加载
                    ctx.font = `${fontWeight} ${fontSize}px ${cleanFontFamily}, Arial, sans-serif`
                } else {
                    // 其他字体未加载时使用默认字体
                    ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
                }
            }
        } catch (error) {
            // 如果字体检查失败，使用包含备用字体的完整字体栈
            ctx.font = `${fontWeight} ${fontSize}px ${cleanFontFamily}, Arial, sans-serif`
        }
    }

    const metrics = ctx.measureText(text)

    // 计算更精确的文本高度
    const actualAscent = metrics.actualBoundingBoxAscent || fontSize * 0.8
    const actualDescent = metrics.actualBoundingBoxDescent || fontSize * 0.2
    const actualHeight = actualAscent + actualDescent

    if (charSpacing > 0 && text.length > 1) {
        // 计算带字符间距的宽度（只有多个字符时才需要字符间距）
        let totalWidth = 0
        for (let i = 0; i < text.length; i++) {
            const char = text[i]
            if (char) {
                const charMetrics = ctx.measureText(char)
                totalWidth += charMetrics.width
            }
            if (i < text.length - 1) {
                totalWidth += charSpacing
            }
        }
        return {
            width: totalWidth,
            height: Math.max(actualHeight, fontSize)
        }
    } else {
        return {
            width: metrics.width,
            height: Math.max(actualHeight, fontSize)
        }
    }
}

/**
 * 垂直文本测量函数
 */
function measureVerticalText(text: string, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0): {width: number; height: number} {
    const ctx = getMeasureContext()
    const cleanFontFamily = formatFontFamily(fontFamily)
    ctx.font = `${fontWeight} ${fontSize}px ${cleanFontFamily}`

    // 检查字体是否已加载
    if (document.fonts && document.fonts.check) {
        const fontSpec = `${fontWeight} ${fontSize}px ${cleanFontFamily}`
        try {
            if (!document.fonts.check(fontSpec)) {
                ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
            }
        } catch (error) {
            // 如果字体检查失败，使用默认字体
            ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`
        }
    }

    // 垂直排列时，宽度是单个字符的最大宽度，高度是所有字符高度之和
    let maxCharWidth = 0
    let totalHeight = 0

    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const charMetrics = ctx.measureText(char || '')

        // 获取字符的实际宽度，为反向垂直文本添加额外的宽度缓冲
        const charWidth = charMetrics.width
        // 反向垂直文本（vertical-rl）需要考虑字符的额外空间占用
        const adjustedCharWidth = charWidth * 1.2 // 增加20%的宽度缓冲
        maxCharWidth = Math.max(maxCharWidth, adjustedCharWidth)

        // 使用更精确的字符高度计算
        const actualAscent = charMetrics.actualBoundingBoxAscent || fontSize * 0.8
        const actualDescent = charMetrics.actualBoundingBoxDescent || fontSize * 0.2
        const charHeight = Math.max(actualAscent + actualDescent, fontSize)

        // 累加高度（垂直排列时每个字符占用一行的高度）
        // 为反向垂直文本添加额外的高度缓冲
        totalHeight += charHeight * 1.1 // 增加10%的高度缓冲

        // 添加字符间距（垂直方向）
        if (i < text.length - 1) {
            totalHeight += charSpacing
        }
    }

    return {
        width: maxCharWidth,
        height: totalHeight
    }
}

/**
 * 使用DOM进行精确文本测量（作为Canvas测量的验证）
 */
function measureTextWithDOM(text: string, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal'): {width: number; height: number} {
    // 创建临时DOM元素进行测量
    const tempElement = document.createElement('span')
    tempElement.style.position = 'absolute'
    tempElement.style.visibility = 'hidden'
    tempElement.style.whiteSpace = 'nowrap'
    tempElement.style.fontSize = `${fontSize}px`
    tempElement.style.fontFamily = fontFamily
    tempElement.style.fontWeight = String(fontWeight)
    tempElement.style.lineHeight = '1'
    tempElement.style.padding = '0'
    tempElement.style.margin = '0'
    tempElement.style.border = 'none'
    tempElement.textContent = text

    document.body.appendChild(tempElement)
    const rect = tempElement.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    document.body.removeChild(tempElement)

    return {width, height}
}

/**
 * 估算文本的字符宽度比例
 */
function estimateCharacterWidth(text: string): number {
    if (!text) return 0.6

    let totalRatio = 0
    for (const char of text) {
        const code = char.charCodeAt(0)
        if (code >= 0x4e00 && code <= 0x9fff) {
            // 中文字符
            totalRatio += 1.0
        } else if (code >= 65 && code <= 90) {
            // 大写字母
            totalRatio += 0.7
        } else if (code >= 97 && code <= 122) {
            // 小写字母
            totalRatio += 0.6
        } else if (code >= 48 && code <= 57) {
            // 数字
            totalRatio += 0.6
        } else {
            // 其他字符（标点符号等）
            totalRatio += 0.4
        }
    }

    return totalRatio / text.length
}

/**
 * 将文本按指定宽度分行
 */
function wrapText(text: string, maxWidth: number, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0): string[] {
    // 直接按换行符分割文本，不进行自动换行处理
    return text.split('\n')
}

/**
 * 垂直文本换行函数（按列分割）
 */
function wrapVerticalText(text: string, maxHeight: number, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0): string[] {
    // 直接按换行符分割文本，不进行自动换行处理
    return text.split('\n')
}

/**
 * 使用 DOM 测量方法计算自适应字体大小
 * 这种方法更精确，特别适用于复杂文本和垂直排版
 */
export function calculateAdaptiveFontSizeWithDOM(params: AdaptiveFontSizeParams): FontSizeResult {
    // 调整默认值策略：当未提供 maxFontSize 或其值<=0 时，使用基于容器尺寸的动态上限，避免人为的200px限制
    const {
        width,
        height,
        text,
        minFontSize = 12,
        maxFontSize: maxFontSizeParam,
        charSpacing = 0,
        lineHeight = 1.2,
        padding = 4,
        fontFamily = 'Arial',
        fontWeight = 'normal',
        direction = 'horizontal'
    } = params

    if (!text || width <= 0 || height <= 0) {
        return {
            fontSize: minFontSize,
            textWidth: 0,
            textHeight: 0,
            isMinSize: true,
            isMaxSize: false,
            suggestedLines: 1
        }
    }

    // 将 fontWeight 转换为字符串
    const fontWeightStr = typeof fontWeight === 'number' ? fontWeight.toString() : fontWeight

    // 增加安全边距，防止文本溢出
    const horizontalPadding = direction === 'vertical' ? padding * 0.5 : padding
    const verticalPadding = direction === 'vertical' ? padding : padding * 0.5

    const availableWidth = Math.max(width - horizontalPadding * 2, 1)
    const availableHeight = Math.max(height - verticalPadding * 2, 1)

    // 计算有效的最大字号：未传入或传入非正值时，改用基于容器尺寸的动态上限
    // 水平排版：受高度限制，最大字号近似为 availableHeight/lineHeight
    // 垂直排版：受宽度限制，最大字号近似为 availableWidth
    const effectiveMaxFontSize = (maxFontSizeParam === undefined || (typeof maxFontSizeParam === 'number' && maxFontSizeParam <= 0))
        ? Math.max(
            minFontSize,
            direction === 'vertical'
                ? availableWidth
                : Math.max(availableHeight / Math.max(lineHeight, 0.1), minFontSize)
          )
        : (maxFontSizeParam as number)

    // 使用改进的DOM测量方法
    const bestFontSize = findOptimalFontSizeWithDOMImproved(
        text,
        availableWidth,
        availableHeight,
        minFontSize,
        effectiveMaxFontSize,
        fontFamily,
        fontWeightStr, // 使用转换后的字符串
        charSpacing,
        lineHeight,
        direction
    )

    // 使用相同的DOM方法验证最终尺寸
    const finalSize = measureTextWithDOMImproved(
        text,
        bestFontSize,
        availableWidth,
        fontFamily,
        fontWeightStr, // 使用转换后的字符串
        charSpacing,
        lineHeight,
        direction
    )

    console.log(`DOM计算结果: 字号=${bestFontSize.toFixed(1)}, 文本尺寸=${finalSize.width.toFixed(1)}x${finalSize.height.toFixed(1)}, 可用空间=${availableWidth}x${availableHeight}`)

    return {
        fontSize: bestFontSize,
        textWidth: finalSize.width,
        textHeight: finalSize.height,
        isMinSize: bestFontSize <= minFontSize,
        isMaxSize: bestFontSize >= effectiveMaxFontSize,
        suggestedLines: direction === 'vertical' ? 1 : Math.ceil(finalSize.lineCount || 1)
    }
}

// 改进的二分查找函数
function findOptimalFontSizeWithDOMImproved(
    text: string,
    maxWidth: number,
    maxHeight: number,
    minFontSize: number,
    maxFontSize: number,
    fontFamily: string,
    fontWeight: string, // 现在只接受字符串
    charSpacing: number,
    lineHeight: number,
    direction: string
): number {
    // 创建测量容器
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.top = '-9999px'
    container.style.left = '-9999px'
    container.style.visibility = 'hidden'

    // 设置容器尺寸限制
    if (direction === 'horizontal') {
        container.style.width = `${maxWidth}px`
        container.style.maxWidth = `${maxWidth}px`
        container.style.height = 'auto'
    } else {
        container.style.height = `${maxHeight}px`
        container.style.maxHeight = `${maxHeight}px`
        container.style.width = 'auto'
        container.style.writingMode = 'vertical-rl'
    }

    container.style.fontFamily = fontFamily
    container.style.fontWeight = fontWeight // 现在类型匹配
    container.style.letterSpacing = `${charSpacing}px`

    // 处理行高设置
    if (typeof lineHeight === 'number') {
        container.style.lineHeight = lineHeight > 1 ? `${lineHeight}` : 'normal'
    } else {
        container.style.lineHeight = String(lineHeight)
    }

    container.style.whiteSpace = 'pre-wrap'
    container.style.wordWrap = 'break-word'
    container.style.overflow = 'hidden'

    document.body.appendChild(container)

    let low = minFontSize
    let high = maxFontSize
    let bestSize = minFontSize
    const tolerance = 0.5
    let iterations = 0
    const maxIterations = 20

    while (high - low > tolerance && iterations < maxIterations) {
        iterations++
        const mid = (low + high) / 2
        container.style.fontSize = `${mid}px`
        container.textContent = text

        // 给浏览器时间进行布局
        void container.offsetHeight

        const bounds = container.getBoundingClientRect()
        const currentWidth = bounds.width
        const currentHeight = bounds.height

        const fitsHorizontally = direction === 'horizontal' ? currentWidth <= maxWidth : currentHeight <= maxHeight
        const fitsVertically = direction === 'horizontal' ? currentHeight <= maxHeight : currentWidth <= maxWidth

        if (fitsHorizontally && fitsVertically) {
            // 当前字体大小合适，尝试更大的
            bestSize = mid
            low = mid
        } else {
            // 当前字体大小太大，尝试更小的
            high = mid
        }
    }

    document.body.removeChild(container)
    return bestSize
}
// 改进的文本测量函数
function measureTextWithDOMImproved(
    text: string,
    fontSize: number,
    maxWidth: number,
    fontFamily: string,
    fontWeight: string, // 现在只接受字符串
    charSpacing: number,
    lineHeight: number,
    direction: string
): {width: number; height: number; lineCount: number} {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.top = '-9999px'
    container.style.left = '-9999px'
    container.style.visibility = 'hidden'

    if (direction === 'horizontal') {
        container.style.width = `${maxWidth}px`
        container.style.maxWidth = `${maxWidth}px`
        container.style.height = 'auto'
    } else {
        container.style.height = `${maxWidth}px`
        container.style.maxHeight = `${maxWidth}px`
        container.style.width = 'auto'
        container.style.writingMode = 'vertical-rl'
    }

    container.style.fontSize = `${fontSize}px`
    container.style.fontFamily = fontFamily
    container.style.fontWeight = fontWeight // 现在类型匹配

    // 处理行高设置
    if (typeof lineHeight === 'number') {
        container.style.lineHeight = lineHeight > 1 ? `${lineHeight}` : 'normal'
    } else {
        container.style.lineHeight = String(lineHeight)
    }

    container.style.letterSpacing = `${charSpacing}px`
    container.style.whiteSpace = 'pre-wrap'
    container.style.wordWrap = 'break-word'
    container.style.overflow = 'visible'

    container.textContent = text
    document.body.appendChild(container)

    // 给浏览器时间进行布局
    void container.offsetHeight

    const bounds = container.getBoundingClientRect()

    // 计算行数（近似值）
    let lineCount = 1
    if (direction === 'horizontal') {
        const singleLineHeight = measureSingleLineHeight(container, fontWeight)
        if (singleLineHeight > 0) {
            lineCount = Math.max(1, Math.round(bounds.height / singleLineHeight))
        }
    }

    document.body.removeChild(container)

    return {
        width: bounds.width,
        height: bounds.height,
        lineCount
    }
}

function measureSingleLineHeight(element: HTMLElement, fontWeight: string): number {
    const testElement = element.cloneNode(true) as HTMLElement
    testElement.style.width = 'auto'
    testElement.style.whiteSpace = 'nowrap'
    testElement.style.overflow = 'visible'
    testElement.style.fontWeight = fontWeight // 确保字体粗细一致
    testElement.textContent = '测试文本'

    document.body.appendChild(testElement)
    void testElement.offsetHeight

    const height = testElement.getBoundingClientRect().height
    document.body.removeChild(testElement)

    return height
}

/**
 * 计算自适应字体大小（异步版本，支持字体预加载）
 */
export async function calculateAdaptiveFontSizeAsync(params: AdaptiveFontSizeParams): Promise<FontSizeResult> {
    const {fontFamily = 'Arial', fontWeight = 'normal', minFontSize = 12} = params

    // 预加载字体以提高测量准确性
    await ensureFontLoaded(fontFamily, fontWeight, minFontSize)

    return calculateAdaptiveFontSize(params)
}

/**
 * 计算自适应字体大小（同步版本）
 */
export function calculateAdaptiveFontSize(params: AdaptiveFontSizeParams): FontSizeResult {
    const {width, height, text, minFontSize = 12, maxFontSize = 200, charSpacing = 0, lineHeight = 1.2, padding = 4, fontFamily = 'Arial', fontWeight = 'normal', direction = 'horizontal', columnSpacing, currentFontSize, allowFontSizeChange = true, preciseMode = false, customScaleFactor} = params

    // 检查字体是否已加载，如果未加载则先尝试加载
    if (fontFamily !== 'Arial' && document.fonts && document.fonts.check) {
        try {
            const formattedFontFamily = formatFontFamily(fontFamily)
            const testFontSpec = `normal ${minFontSize}px ${formattedFontFamily}`

            // 验证字体规格字符串格式
            if (formattedFontFamily && formattedFontFamily !== 'Arial') {
                if (!document.fonts.check(testFontSpec)) {
                    console.warn(`字体 ${fontFamily} 可能未加载，字体大小计算可能不准确`)
                    // 对于特殊字体，尝试触发字体加载
                    if (fontFamily.includes('Bebas') || fontFamily.includes('bebas')) {
                        // 异步加载字体，但不等待完成
                        document.fonts.load(testFontSpec).catch(() => {
                            console.warn(`字体 ${fontFamily} 加载失败`)
                        })
                    }
                }
            }
        } catch (error) {
            console.warn(`字体检查失败: ${(error as Error).message}，使用默认字体计算`)
        }
    }

    // 如果不允许修改字体大小且提供了当前字体大小，则直接返回当前字体大小
    if (!allowFontSizeChange && currentFontSize) {
        // 计算当前字体大小下的文本尺寸
        if (direction === 'vertical') {
            const singleColumnSize = measureVerticalText(text, currentFontSize, fontFamily, fontWeight, charSpacing)
            return {
                fontSize: currentFontSize,
                textWidth: singleColumnSize.width,
                textHeight: singleColumnSize.height,
                isMinSize: currentFontSize <= minFontSize,
                isMaxSize: currentFontSize >= maxFontSize,
                suggestedLines: 1
            }
        } else {
            const singleLineSize = measureTextImproved(text, currentFontSize, fontFamily, fontWeight, charSpacing, preciseMode)
            return {
                fontSize: currentFontSize,
                textWidth: singleLineSize.width,
                textHeight: currentFontSize * lineHeight,
                isMinSize: currentFontSize <= minFontSize,
                isMaxSize: currentFontSize >= maxFontSize,
                suggestedLines: 1
            }
        }
    }

    // 根据文本方向和模式调整缩放因子，优化字体大小准确性
    let scaleFactor: number
    if (customScaleFactor !== undefined) {
        scaleFactor = customScaleFactor
    } else if (preciseMode) {
        // 精确模式下使用更保守的缩放因子，避免字体偏大
        // 垂直文本（特别是反向垂直 vertical-rl）需要更保守的缩放因子
        scaleFactor = direction === 'vertical' ? 0.75 : 0.95
    } else {
        // 标准模式使用保守的缩放因子，确保字体不会过大
        // 垂直文本使用更保守的缩放因子，避免在 vertical-rl 模式下字体过大
        scaleFactor = direction === 'vertical' ? 0.7 : 0.92
    }

    // 垂直文本的列间距默认等于字体大小
    const actualColumnSpacing = columnSpacing ?? (direction === 'vertical' ? 0 : 0)

    if (!text || width <= 0 || height <= 0) {
        return {
            fontSize: currentFontSize || minFontSize,
            textWidth: 0,
            textHeight: 0,
            isMinSize: true,
            isMaxSize: false,
            suggestedLines: 1
        }
    }

    // 使用正常的padding计算，确保字体大小不会过大
    const horizontalPadding = Math.max(0, padding)
    const verticalPadding = Math.max(0, padding)

    // 根据文本方向设置不同的缓冲策略，进一步减少过度保守的设置
    // 垂直文本（特别是反向垂直）需要更多的缓冲空间
    const extraBuffer = direction === 'vertical' ? Math.max(6, Math.floor(minFontSize * 0.2)) : 0
    const widthReduction = direction === 'vertical' ? width * 0.05 : 0

    const availableWidth = width - horizontalPadding * 2 - extraBuffer * 2 - widthReduction
    const availableHeight = height - verticalPadding * 2 - extraBuffer * 2

    // 优先使用 DOM 测量方法（参考 font.html），在精确模式或特殊情况下使用
    let bestFontSize: number

    // 在以下情况使用 DOM 测量方法：
    // 1. 精确模式
    // 2. 垂直文本
    // 3. 包含换行符的文本
    // 4. 字符间距较大的情况
    const shouldUseDOMMethod = preciseMode || direction === 'vertical' || text.includes('\n') || charSpacing > 2

    if (shouldUseDOMMethod) {
        bestFontSize = findOptimalFontSizeWithDOM(text, availableWidth, availableHeight, minFontSize, maxFontSize, fontFamily, fontWeight, charSpacing, lineHeight, direction)
    } else {
        // 使用原有的递归算法作为备用
        bestFontSize = findOptimalFontSizeRecursive(text, availableWidth, availableHeight, minFontSize, maxFontSize, fontFamily, fontWeight, charSpacing, lineHeight, direction, preciseMode)
    }

    // 计算最终结果
    let bestResult: FontSizeResult | null = null

    if (direction === 'vertical') {
        // 垂直文本处理
        const singleColumnSize = measureVerticalText(text, bestFontSize, fontFamily, fontWeight, charSpacing)

        if (singleColumnSize.height <= availableHeight) {
            // 单列可以放下
            bestResult = {
                fontSize: bestFontSize,
                textWidth: singleColumnSize.width,
                textHeight: singleColumnSize.height,
                isMinSize: bestFontSize === minFontSize,
                isMaxSize: bestFontSize === maxFontSize,
                suggestedLines: 1
            }
        } else {
            // 需要多列显示
            const columns = wrapVerticalText(text, availableHeight, bestFontSize, fontFamily, fontWeight, charSpacing)
            const totalWidth = columns.length * bestFontSize + (columns.length - 1) * actualColumnSpacing
            const maxColumnHeight = Math.max(...columns.map(column => measureVerticalText(column, bestFontSize, fontFamily, fontWeight, charSpacing).height))

            bestResult = {
                fontSize: bestFontSize,
                textWidth: totalWidth,
                textHeight: maxColumnHeight,
                isMinSize: bestFontSize === minFontSize,
                isMaxSize: bestFontSize === maxFontSize,
                suggestedLines: columns.length
            }
        }
    } else {
        // 水平文本处理
        const singleLineSize = measureTextImproved(text, bestFontSize, fontFamily, fontWeight, charSpacing, preciseMode)

        if (singleLineSize.width <= availableWidth) {
            // 单行可以放下
            const actualHeight = bestFontSize * lineHeight
            bestResult = {
                fontSize: bestFontSize,
                textWidth: singleLineSize.width,
                textHeight: actualHeight,
                isMinSize: bestFontSize === minFontSize,
                isMaxSize: bestFontSize === maxFontSize,
                suggestedLines: 1
            }
        } else {
            // 需要多行显示
            const lines = wrapText(text, availableWidth, bestFontSize, fontFamily, fontWeight, charSpacing)
            const totalHeight = lines.length * bestFontSize * lineHeight
            const maxLineWidth = Math.max(...lines.map(line => measureTextImproved(line, bestFontSize, fontFamily, fontWeight, charSpacing, preciseMode).width))

            bestResult = {
                fontSize: bestFontSize,
                textWidth: maxLineWidth,
                textHeight: totalHeight,
                isMinSize: bestFontSize === minFontSize,
                isMaxSize: bestFontSize === maxFontSize,
                suggestedLines: lines.length
            }
        }
    }

    // 如果没有找到合适的大小，使用最小字体大小
    if (!bestResult) {
        if (direction === 'vertical') {
            const fallbackSize = measureVerticalText(text, minFontSize, fontFamily, fontWeight, charSpacing)
            const columns = wrapVerticalText(text, availableHeight, minFontSize, fontFamily, fontWeight, charSpacing)

            bestResult = {
                fontSize: minFontSize,
                textWidth: columns.length * minFontSize + (columns.length - 1) * actualColumnSpacing,
                textHeight: fallbackSize.height,
                isMinSize: true,
                isMaxSize: false,
                suggestedLines: columns.length
            }
        } else {
            const fallbackSize = measureTextImproved(text, minFontSize, fontFamily, fontWeight, charSpacing, preciseMode)
            const lines = wrapText(text, availableWidth, minFontSize, fontFamily, fontWeight, charSpacing)

            bestResult = {
                fontSize: minFontSize,
                textWidth: fallbackSize.width,
                textHeight: lines.length * minFontSize * lineHeight,
                isMinSize: true,
                isMaxSize: false,
                suggestedLines: lines.length
            }
        }
    }

    // 应用缩减系数并重新计算文本尺寸，确保文本始终适合容器
    if (bestResult) {
        const finalFontSize = Math.max(minFontSize, Math.round(bestResult.fontSize * scaleFactor))

        if (direction === 'vertical') {
            // 垂直文本重新计算
            const singleColumnSize = measureVerticalText(text, finalFontSize, fontFamily, fontWeight, charSpacing)

            if (singleColumnSize.height <= availableHeight && singleColumnSize.width <= availableWidth) {
                // 单列显示且适合容器
                bestResult.fontSize = finalFontSize
                bestResult.textWidth = singleColumnSize.width
                bestResult.textHeight = singleColumnSize.height
                bestResult.suggestedLines = 1
            } else {
                // 多列显示或需要进一步缩小字体
                const columns = wrapVerticalText(text, availableHeight, finalFontSize, fontFamily, fontWeight, charSpacing)
                const totalWidth = columns.length * finalFontSize + (columns.length - 1) * actualColumnSpacing
                const maxColumnHeight = Math.max(...columns.map(column => measureVerticalText(column, finalFontSize, fontFamily, fontWeight, charSpacing).height))

                // 检查是否超出容器边界
                if (totalWidth <= availableWidth && maxColumnHeight <= availableHeight) {
                    bestResult.fontSize = finalFontSize
                    bestResult.textWidth = totalWidth
                    bestResult.textHeight = maxColumnHeight
                    bestResult.suggestedLines = columns.length
                } else {
                    // 如果仍然超出边界，使用二分法精确调整字体大小
                    let adjustedFontSize = findOptimalFontSizeRecursive(text, availableWidth, availableHeight, minFontSize, finalFontSize - 1, fontFamily, fontWeight, charSpacing, lineHeight, direction, preciseMode, false)

                    const adjustedColumns = wrapVerticalText(text, availableHeight, adjustedFontSize, fontFamily, fontWeight, charSpacing)
                    const adjustedTotalWidth = adjustedColumns.length * adjustedFontSize + (adjustedColumns.length - 1) * actualColumnSpacing
                    const adjustedMaxHeight = Math.max(...adjustedColumns.map(column => measureVerticalText(column, adjustedFontSize, fontFamily, fontWeight, charSpacing).height))

                    bestResult.fontSize = adjustedFontSize
                    bestResult.textWidth = adjustedTotalWidth
                    bestResult.textHeight = adjustedMaxHeight
                    bestResult.suggestedLines = adjustedColumns.length
                }
            }
        } else {
            // 水平文本重新计算
            const singleLineSize = measureTextImproved(text, finalFontSize, fontFamily, fontWeight, charSpacing, preciseMode)

            if (singleLineSize.width <= availableWidth) {
                // 单行显示且适合容器
                const actualHeight = finalFontSize * lineHeight
                if (actualHeight <= availableHeight) {
                    bestResult.fontSize = finalFontSize
                    bestResult.textWidth = singleLineSize.width
                    bestResult.textHeight = actualHeight
                    bestResult.suggestedLines = 1
                } else {
                    // 高度超出，使用二分法精确调整字体大小
                    let adjustedFontSize = findOptimalFontSizeRecursive(text, availableWidth, availableHeight, minFontSize, finalFontSize - 1, fontFamily, fontWeight, charSpacing, lineHeight, direction, preciseMode, false)

                    const adjustedSize = measureTextImproved(text, adjustedFontSize, fontFamily, fontWeight, charSpacing, preciseMode)
                    const adjustedHeight = adjustedFontSize * lineHeight
                    bestResult.fontSize = adjustedFontSize
                    bestResult.textWidth = adjustedSize.width
                    bestResult.textHeight = adjustedHeight
                    bestResult.suggestedLines = 1
                }
            } else {
                // 多行显示，重新计算换行
                const lines = wrapText(text, availableWidth, finalFontSize, fontFamily, fontWeight, charSpacing)
                const totalHeight = lines.length * finalFontSize * lineHeight
                const maxLineWidth = Math.max(...lines.map(line => measureTextImproved(line, finalFontSize, fontFamily, fontWeight, charSpacing, preciseMode).width))

                // 检查是否超出容器边界
                if (totalHeight <= availableHeight && maxLineWidth <= availableWidth) {
                    bestResult.fontSize = finalFontSize
                    bestResult.textWidth = maxLineWidth
                    bestResult.textHeight = totalHeight
                    bestResult.suggestedLines = lines.length
                } else {
                    // 如果仍然超出边界，使用二分法精确调整字体大小
                    let adjustedFontSize = findOptimalFontSizeRecursive(text, availableWidth, availableHeight, minFontSize, finalFontSize - 1, fontFamily, fontWeight, charSpacing, lineHeight, direction, preciseMode, false)

                    const adjustedLines = wrapText(text, availableWidth, adjustedFontSize, fontFamily, fontWeight, charSpacing)
                    const adjustedTotalHeight = adjustedLines.length * adjustedFontSize * lineHeight
                    const adjustedMaxWidth = Math.max(...adjustedLines.map(line => measureTextImproved(line, adjustedFontSize, fontFamily, fontWeight, charSpacing, preciseMode).width))

                    bestResult.fontSize = adjustedFontSize
                    bestResult.textWidth = adjustedMaxWidth
                    bestResult.textHeight = adjustedTotalHeight
                    bestResult.suggestedLines = adjustedLines.length
                }
            }
        }
    }

    return bestResult
}

/**
 * 快速估算字体大小（不使用 Canvas 测量，性能更好但精度较低）
 */
export function estimateAdaptiveFontSize(params: AdaptiveFontSizeParams): FontSizeResult {
    const {width, height, text, minFontSize = 12, maxFontSize = 200, charSpacing = 0, lineHeight = 1.2, padding = 4, direction = 'horizontal', columnSpacing = 0, preciseMode = false, customScaleFactor} = params

    // 移除缩减系数，保持原始字体大小
    const scaleFactor = 1.0

    if (!text || width <= 0 || height <= 0) {
        return {
            fontSize: minFontSize,
            textWidth: 0,
            textHeight: 0,
            isMinSize: true,
            isMaxSize: false,
            suggestedLines: 1
        }
    }

    // 设置合理的缓冲区域，减少过度保守的设置
    const extraBuffer = direction === 'vertical' ? Math.max(0, Math.floor(minFontSize * 0.005)) : 0
    // 垂直文本时适度减少可用宽度，避免过度保守
    const widthReduction = direction === 'vertical' ? width * 0.01 : 0
    const optimizedPadding = Math.max(0, padding * 0.5)
    const availableWidth = width - optimizedPadding * 2 - extraBuffer * 2 - widthReduction
    const availableHeight = height - optimizedPadding * 2 - extraBuffer * 2
    const actualColumnSpacing = direction === 'vertical' ? (columnSpacing > 0 ? columnSpacing : Math.floor(minFontSize * 0.5)) : 0

    // 估算字符平均宽度比例
    const avgCharRatio = estimateCharacterWidth(text)

    let estimatedFontSize: number
    let finalWidth: number
    let finalHeight: number
    let finalLines: number

    if (direction === 'vertical') {
        // 垂直文本估算
        // 估算单列所需的字体大小
        const totalCharHeight = text.length * 1.0 + ((text.length - 1) * charSpacing) / 100 // 垂直字符间距相对较小
        const estimatedFontSizeForHeight = availableHeight / totalCharHeight

        // 估算宽度限制的字体大小（考虑可能的多列）
        const estimatedFontSizeForWidth = availableWidth

        // 取较小值
        estimatedFontSize = Math.min(estimatedFontSizeForHeight, estimatedFontSizeForWidth)

        // 应用最小最大限制
        estimatedFontSize = Math.max(minFontSize, Math.min(maxFontSize, estimatedFontSize))

        // 应用缩减系数并确保适合容器
        let finalFontSize = Math.max(minFontSize, Math.round(estimatedFontSize * scaleFactor))

        // 估算最终尺寸并验证边界
        let estimatedHeight = text.length * finalFontSize + (text.length - 1) * charSpacing
        let estimatedColumns = Math.ceil(estimatedHeight / availableHeight)
        let totalWidth = estimatedColumns * finalFontSize + (estimatedColumns - 1) * actualColumnSpacing

        // 如果超出容器边界，使用更精细的调整策略
        if (totalWidth > availableWidth || estimatedHeight > availableHeight * estimatedColumns) {
            // 计算需要的缩放比例
            const widthScale = totalWidth > availableWidth ? availableWidth / totalWidth : 1.0
            const heightScale = estimatedHeight > availableHeight * estimatedColumns ? (availableHeight * estimatedColumns) / estimatedHeight : 1.0
            const requiredScale = Math.min(widthScale, heightScale)

            // 应用缩放并确保不低于最小字体大小
            finalFontSize = Math.max(minFontSize, Math.round(finalFontSize * requiredScale * 0.95))

            // 重新计算尺寸
            estimatedHeight = text.length * finalFontSize + (text.length - 1) * charSpacing
            estimatedColumns = Math.ceil(estimatedHeight / availableHeight)
            totalWidth = estimatedColumns * finalFontSize + (estimatedColumns - 1) * actualColumnSpacing
        }

        finalWidth = totalWidth
        finalHeight = Math.min(estimatedHeight, availableHeight)
        finalLines = estimatedColumns

        return {
            fontSize: finalFontSize,
            textWidth: finalWidth,
            textHeight: finalHeight,
            isMinSize: finalFontSize <= minFontSize,
            isMaxSize: finalFontSize >= maxFontSize,
            suggestedLines: finalLines
        }
    } else {
        // 水平文本估算（原有逻辑）
        // 估算单行所需的字体大小
        const totalCharWidth = text.length * avgCharRatio + (text.length - 1) * charSpacing
        const estimatedFontSizeForWidth = availableWidth / totalCharWidth

        // 估算高度限制的字体大小
        const estimatedFontSizeForHeight = availableHeight / lineHeight

        // 取较小值
        estimatedFontSize = Math.min(estimatedFontSizeForWidth, estimatedFontSizeForHeight)

        // 应用最小最大限制
        estimatedFontSize = Math.max(minFontSize, Math.min(maxFontSize, estimatedFontSize))

        // 应用缩减系数并重新计算尺寸，确保适合容器
        let finalFontSize = Math.max(minFontSize, Math.round(estimatedFontSize * scaleFactor))

        // 重新计算缩减后的文本尺寸并验证边界
        let textWidth = text.length * finalFontSize * avgCharRatio + (text.length - 1) * charSpacing
        let lines = Math.ceil(textWidth / availableWidth)
        let textHeight = lines * finalFontSize * lineHeight

        // 如果超出容器边界，使用更精细的调整策略
        if (textHeight > availableHeight) {
            // 计算需要的缩放比例
            const heightScale = availableHeight / textHeight

            // 应用缩放并确保不低于最小字体大小
            finalFontSize = Math.max(minFontSize, Math.round(finalFontSize * heightScale * 0.95))

            // 重新计算尺寸
            textWidth = text.length * finalFontSize * avgCharRatio + (text.length - 1) * charSpacing
            lines = Math.ceil(textWidth / availableWidth)
            textHeight = lines * finalFontSize * lineHeight
        }

        finalWidth = Math.min(textWidth, availableWidth)
        finalHeight = textHeight
        finalLines = lines

        return {
            fontSize: finalFontSize,
            textWidth: finalWidth,
            textHeight: finalHeight,
            isMinSize: finalFontSize <= minFontSize,
            isMaxSize: finalFontSize >= maxFontSize,
            suggestedLines: finalLines
        }
    }
}

/**
 * 获取文本在指定字体大小下的行数
 */
export function getTextLines(text: string, width: number, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0, padding: number = 4): string[] {
    const availableWidth = width - padding * 2
    return wrapText(text, availableWidth, fontSize, fontFamily, fontWeight, charSpacing)
}

/**
 * 检查文本是否适合指定的容器尺寸
 */
export function isTextFit(text: string, width: number, height: number, fontSize: number, fontFamily: string = 'Arial', fontWeight: string | number = 'normal', charSpacing: number = 0, lineHeight: number = 1.2, padding: number = 4): boolean {
    const availableWidth = width - padding * 2
    const availableHeight = height - padding * 2

    const lines = wrapText(text, availableWidth, fontSize, fontFamily, fontWeight, charSpacing)
    const totalHeight = lines.length * fontSize * lineHeight

    return totalHeight <= availableHeight
}

/**
 * 根据字体大小计算元素宽高（自适应字体专用版本）
 */
export function calculateAdaptiveElementSize(params: AdaptiveElementSizeParams): AdaptiveElementSizeResult {
    const {fontSize, text, charSpacing = 0, lineHeight = 1.2, padding = 4, fontFamily = 'Arial', fontWeight = 'normal', direction = 'horizontal', columnSpacing, maxWidth, maxHeight} = params

    if (!text) {
        return {
            width: padding * 2,
            height: padding * 2,
            textWidth: 0,
            textHeight: 0,
            lines: 0,
            isWrapped: false
        }
    }

    // 垂直文本的列间距默认等于字体大小
    const actualColumnSpacing = columnSpacing ?? (direction === 'vertical' ? fontSize : 0)

    if (direction === 'vertical') {
        // 垂直文本处理
        const singleColumnSize = measureVerticalText(text, fontSize, fontFamily, fontWeight, charSpacing)

        if (!maxHeight || singleColumnSize.height <= maxHeight) {
            // 单列显示
            return {
                width: singleColumnSize.width + padding * 2,
                height: singleColumnSize.height + padding * 2,
                textWidth: singleColumnSize.width,
                textHeight: singleColumnSize.height,
                lines: 1,
                isWrapped: false
            }
        } else {
            // 需要分列显示
            const columns = wrapVerticalText(text, maxHeight, fontSize, fontFamily, fontWeight, charSpacing)
            const maxColumnHeight = Math.max(...columns.map(column => measureVerticalText(column, fontSize, fontFamily, fontWeight, charSpacing).height))
            const totalWidth = columns.length * fontSize + (columns.length - 1) * actualColumnSpacing

            return {
                width: totalWidth + padding * 2,
                height: maxColumnHeight + padding * 2,
                textWidth: totalWidth,
                textHeight: maxColumnHeight,
                lines: columns.length,
                isWrapped: true
            }
        }
    } else {
        // 水平文本处理
        const singleLineSize = measureText(text, fontSize, fontFamily, fontWeight, charSpacing)

        if (!maxWidth || singleLineSize.width <= maxWidth) {
            // 单行显示
            const actualHeight = fontSize * lineHeight
            return {
                width: singleLineSize.width + padding * 2,
                height: actualHeight + padding * 2,
                textWidth: singleLineSize.width,
                textHeight: actualHeight,
                lines: 1,
                isWrapped: false
            }
        } else {
            // 需要换行显示
            const lines = wrapText(text, maxWidth, fontSize, fontFamily, fontWeight, charSpacing)
            const maxLineWidth = Math.max(...lines.map(line => measureText(line, fontSize, fontFamily, fontWeight, charSpacing).width))
            const totalHeight = lines.length * fontSize * lineHeight

            return {
                width: maxLineWidth + padding * 2,
                height: totalHeight + padding * 2,
                textWidth: maxLineWidth,
                textHeight: totalHeight,
                lines: lines.length,
                isWrapped: true
            }
        }
    }
}

/**
 * 快速估算元素尺寸（不使用 Canvas 测量，性能更好但精度较低）
 */
export function estimateAdaptiveElementSize(params: AdaptiveElementSizeParams): AdaptiveElementSizeResult {
    const {fontSize, text, charSpacing = 0, lineHeight = 1.2, padding = 4, direction = 'horizontal', columnSpacing, maxWidth, maxHeight} = params

    if (!text) {
        return {
            width: padding * 2,
            height: padding * 2,
            textWidth: 0,
            textHeight: 0,
            lines: 0,
            isWrapped: false
        }
    }

    // 估算字符宽度比例
    const avgCharWidth = estimateCharacterWidth(text) * fontSize
    const actualColumnSpacing = columnSpacing ?? (direction === 'vertical' ? fontSize : 0)

    if (direction === 'vertical') {
        // 垂直文本估算
        const estimatedHeight = text.length * fontSize + (text.length - 1) * charSpacing

        if (!maxHeight || estimatedHeight <= maxHeight) {
            // 单列显示
            return {
                width: avgCharWidth + padding * 2,
                height: estimatedHeight + padding * 2,
                textWidth: avgCharWidth,
                textHeight: estimatedHeight,
                lines: 1,
                isWrapped: false
            }
        } else {
            // 需要分列显示
            const charsPerColumn = Math.floor(maxHeight / (fontSize + charSpacing))
            const columns = Math.ceil(text.length / charsPerColumn)
            const totalWidth = columns * avgCharWidth + (columns - 1) * actualColumnSpacing

            return {
                width: totalWidth + padding * 2,
                height: maxHeight + padding * 2,
                textWidth: totalWidth,
                textHeight: maxHeight,
                lines: columns,
                isWrapped: true
            }
        }
    } else {
        // 水平文本估算
        const estimatedWidth = text.length * avgCharWidth + (text.length - 1) * charSpacing

        if (!maxWidth || estimatedWidth <= maxWidth) {
            // 单行显示
            const actualHeight = fontSize * lineHeight
            return {
                width: estimatedWidth + padding * 2,
                height: actualHeight + padding * 2,
                textWidth: estimatedWidth,
                textHeight: actualHeight,
                lines: 1,
                isWrapped: false
            }
        } else {
            // 需要换行显示
            const charsPerLine = Math.floor(maxWidth / (avgCharWidth + charSpacing))
            const lines = Math.ceil(text.length / charsPerLine)
            const totalHeight = lines * fontSize * lineHeight

            return {
                width: maxWidth + padding * 2,
                height: totalHeight + padding * 2,
                textWidth: maxWidth,
                textHeight: totalHeight,
                lines: lines,
                isWrapped: true
            }
        }
    }
}

/**
 * 根据字体大小计算元素宽高参数接口
 */
export interface AdaptiveElementSizeParams {
    /** 字体大小（像素） */
    fontSize: number
    /** 文本内容 */
    text: string
    /** 字符间距，默认 0 */
    charSpacing?: number
    /** 行间距倍数，默认 1.2 */
    lineHeight?: number
    /** 内边距，默认 4px */
    padding?: number
    /** 字体族，用于更精确的测量 */
    fontFamily?: string
    /** 字体粗细 */
    fontWeight?: string | number
    /** 文本方向，默认 'horizontal' */
    direction?: 'horizontal' | 'vertical'
    /** 垂直文本的列间距，默认等于字体大小 */
    columnSpacing?: number
    /** 最大宽度限制，超过此宽度将自动换行 */
    maxWidth?: number
    /** 最大高度限制，超过此高度将自动分列（垂直文本） */
    maxHeight?: number
}

/**
 * 元素尺寸计算结果接口
 */
export interface AdaptiveElementSizeResult {
    /** 建议的元素宽度 */
    width: number
    /** 建议的元素高度 */
    height: number
    /** 文本实际占用宽度 */
    textWidth: number
    /** 文本实际占用高度 */
    textHeight: number
    /** 实际行数或列数 */
    lines: number
    /** 是否需要换行或分列 */
    isWrapped: boolean
}
