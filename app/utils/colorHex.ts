//rgba rgb 转 hex
function normalizeHexChannel(value: number): string {
    const clamped = Math.min(255, Math.max(0, Math.round(value)))
    const hex = clamped.toString(16).toUpperCase()
    return hex.length === 1 ? `0${hex}` : hex
}

function toHexColor(input: string): string {
    const value = input.trim()

    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
        return value.toUpperCase()
    }

    const match = value.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|0?\.\d+|1(?:\.0)?))?\s*\)$/)

    if (!match) {
        return value
    }

    const r = Number(match[1])
    const g = Number(match[2])
    const b = Number(match[3])

    const rHex = normalizeHexChannel(r)
    const gHex = normalizeHexChannel(g)
    const bHex = normalizeHexChannel(b)

    return `#${rHex}${gHex}${bHex}`
}

export default toHexColor
