export interface LinearGradientStop {
    color: string
    position: number
}

export interface LinearGradientStyle {
    angle: number
    stops: LinearGradientStop[]
    leaferStops: any[]
    from: {
        x: number
        y: number
    }
    to: {
        x: number
        y: number
    }
}

function splitByTopLevelComma(value: string): string[] {
    const result: string[] = []
    let current = ''
    let depth = 0

    for (let index = 0; index < value.length; index += 1) {
        const char = value[index]

        if (char === '(') {
            depth += 1
            current += char
            continue
        }

        if (char === ')') {
            depth = Math.max(0, depth - 1)
            current += char
            continue
        }

        if (char === ',' && depth === 0) {
            result.push(current.trim())
            current = ''
            continue
        }

        current += char
    }

    const last = current.trim()
    if (last) {
        result.push(last)
    }

    return result
}

function parseAngle(value: string): number {
    const match = value.trim().match(/(-?\d+(?:\.\d+)?)\s*deg/i)
    if (!match) {
        return 0
    }

    const angle = Number(match[1])
    return Number.isFinite(angle) ? angle : 0
}

interface GradientEndpoints {
    from: {
        x: number
        y: number
    }
    to: {
        x: number
        y: number
    }
}

function getGradientEndpoints(angle: number): GradientEndpoints {
    const normalized = ((angle % 360) + 360) % 360
    const rad = (normalized * Math.PI) / 180
    const dx = Math.sin(rad)
    const dy = Math.cos(rad)
    const cx = 0.5
    const cy = 0.5
    const points: {t: number; x: number; y: number}[] = []

    if (dx !== 0) {
        const tLeft = (0 - cx) / dx
        const yLeft = cy + dy * tLeft
        if (yLeft >= 0 && yLeft <= 1) {
            points.push({t: tLeft, x: 0, y: yLeft})
        }

        const tRight = (1 - cx) / dx
        const yRight = cy + dy * tRight
        if (yRight >= 0 && yRight <= 1) {
            points.push({t: tRight, x: 1, y: yRight})
        }
    }

    if (dy !== 0) {
        const tTop = (0 - cy) / dy
        const xTop = cx + dx * tTop
        if (xTop >= 0 && xTop <= 1) {
            points.push({t: tTop, x: xTop, y: 0})
        }

        const tBottom = (1 - cy) / dy
        const xBottom = cx + dx * tBottom
        if (xBottom >= 0 && xBottom <= 1) {
            points.push({t: tBottom, x: xBottom, y: 1})
        }
    }

    if (points.length < 2) {
        return {
            from: {x: 0, y: 0},
            to: {x: 1, y: 0}
        }
    }

    let minPoint = points[0]
    let maxPoint = points[0]

    for (const point of points) {
        if (minPoint && point.t < minPoint.t) {
            minPoint = point
        }
        if (maxPoint && point.t > maxPoint.t) {
            maxPoint = point
        }
    }

    return {
        from: {x: minPoint!.x, y: minPoint!.y},
        to: {x: maxPoint!.x, y: maxPoint!.y}
    }
}

function parseStop(value: string): LinearGradientStop | null {
    const raw = value.trim()
    if (!raw) {
        return null
    }

    const percentMatch = raw.match(/(-?\d+(?:\.\d+)?)\s*%\s*$/)
    if (!percentMatch) {
        return null
    }

    const position = Number(percentMatch[1])
    if (!Number.isFinite(position)) {
        return null
    }

    const color = raw.slice(0, percentMatch.index).trim()
    if (!color) {
        return null
    }

    return {
        color,
        position
    }
}

export function formateStyle(style: string): LinearGradientStyle | null {
    const raw = style.trim()
    const prefix = 'linear-gradient('
    if (!raw.toLowerCase().startsWith(prefix)) {
        return null
    }

    const startIndex = raw.indexOf('(')
    const endIndex = raw.lastIndexOf(')')
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        return null
    }

    const body = raw.slice(startIndex + 1, endIndex)
    const parts = splitByTopLevelComma(body)
    if (parts.length < 2) {
        return null
    }

    const angle = parseAngle(parts[0] ?? '')
    const stops = parts
        .slice(1)
        .map(parseStop)
        .filter((item): item is LinearGradientStop => !!item)

    const leaferStops: any = stops.map((item, index) => {
        return {
            offset: item.position / 100,
            color: item.color
        }
    })

    leaferStops.push({
        offset: 1,
        color: leaferStops[stops.length - 1].color
    })
    leaferStops.unshift({
        offset: 0,
        color: leaferStops[0].color
    })

    const endpoints = getGradientEndpoints(angle)

    return {
        angle,
        stops,
        leaferStops,
        from: endpoints.from,
        to: endpoints.to
    }
}

export default formateStyle
