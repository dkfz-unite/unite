// ─── Interface ────────────────────────────────────────────────────────────────

export interface Renderer {
    clear(): void
    fillRect(x: number, y: number, w: number, h: number, color: string): void
    drawRect(x: number, y: number, w: number, h: number, fillColor: string, borderColor: string, borderWidth?: number): void
    drawLine(x1: number, y1: number, x2: number, y2: number, color: string, lineWidth?: number): void
    drawText(text: string, x: number, y: number, color: string, font?: string): void
    resize(width: number, height: number): void
    render(): void
    exportSVG(): string
    destroy(): void
}

export type RendererType = 'canvas' | 'svg'

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createRenderer(
    type: RendererType,
    container: HTMLElement,
    width: number,
    height: number
): Renderer {
    switch (type) {
        case 'canvas': return new CanvasRenderer(container, width, height)
        case 'svg':    return new SvgRenderer(container, width, height)
        default:       throw new Error(`Unknown renderer type: ${type}`)
    }
}

// ─── Canvas Renderer ──────────────────────────────────────────────────────────

class CanvasRenderer implements Renderer {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    // replay log for SVG export
    private log: DrawCall[] = []

    constructor(container: HTMLElement, width: number, height: number) {
        this.canvas = document.createElement('canvas')
        this.canvas.style.display = 'block'
        container.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')!
        this.resize(width, height)
    }

    resize(width: number, height: number): void {
        this.canvas.width = width
        this.canvas.height = height
    }

    clear(): void {
        this.log = []
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    fillRect(x: number, y: number, w: number, h: number, color: string): void {
        this.log.push({ type: 'fillRect', x, y, w, h, color })
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, w, h)
    }

    drawRect(x: number, y: number, w: number, h: number, fillColor: string, borderColor = "black", borderWidth = 1): void {
        this.log.push({ type: 'drawRect', x, y, w, h, fillColor, borderColor, borderWidth })
        this.ctx.fillStyle = fillColor
        this.ctx.fillRect(x, y, w, h)
        this.ctx.strokeStyle = borderColor
        this.ctx.lineWidth = borderWidth
        this.ctx.strokeRect(x, y, w, h)
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color: string, lineWidth = 1): void {
        this.log.push({ type: 'drawLine', x1, y1, x2, y2, color, lineWidth })
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = lineWidth
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }

    drawText(text: string, x: number, y: number, color: string, font = '12px sans-serif'): void {
        this.log.push({ type: 'drawText', text, x, y, color, font })
        this.ctx.fillStyle = color
        this.ctx.font = font
        this.ctx.fillText(text, x, y)
    }

    // canvas renders immediately, nothing to flush
    render(): void {}

    exportSVG(): string {
        return replayToSVG(this.log, this.canvas.width, this.canvas.height)
    }

    destroy(): void {
        this.canvas.remove()
    }
}

// ─── SVG Renderer ─────────────────────────────────────────────────────────────

class SvgRenderer implements Renderer {
    private svg: SVGSVGElement
    private defs: SVGDefsElement
    private group: SVGGElement
    private width: number
    private height: number

    // pending elements batched until render()
    private pending: SVGElement[] = []

    constructor(container: HTMLElement, width: number, height: number) {
        this.width = width
        this.height = height

        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.svg.style.display = 'block'

        this.defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        this.svg.appendChild(this.defs)

        this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        this.svg.appendChild(this.group)

        container.appendChild(this.svg)
        this.resize(width, height)
    }

    resize(width: number, height: number): void {
        this.width = width
        this.height = height
        this.svg.setAttribute('width', String(width))
        this.svg.setAttribute('height', String(height))
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }

    clear(): void {
        this.pending = []
        while (this.group.firstChild) {
            this.group.removeChild(this.group.firstChild)
        }
    }

    fillRect(x: number, y: number, w: number, h: number, color: string): void {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        el.setAttribute('x', String(x))
        el.setAttribute('y', String(y))
        el.setAttribute('width', String(w))
        el.setAttribute('height', String(h))
        el.setAttribute('fill', color)
        el.setAttribute('stroke', 'none')
        this.pending.push(el)
    }

    drawRect(x: number, y: number, w: number, h: number, fillColor: string, borderColor = "black", borderWidth = 1): void {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        el.setAttribute('x', String(x))
        el.setAttribute('y', String(y))
        el.setAttribute('width', String(w))
        el.setAttribute('height', String(h))
        el.setAttribute('fill', fillColor)
        el.setAttribute('stroke', borderColor)
        el.setAttribute('stroke-width', String(borderWidth))
        this.pending.push(el)
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color: string, lineWidth = 1): void {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        el.setAttribute('x1', String(x1))
        el.setAttribute('y1', String(y1))
        el.setAttribute('x2', String(x2))
        el.setAttribute('y2', String(y2))
        el.setAttribute('stroke', color)
        el.setAttribute('stroke-width', String(lineWidth))
        this.pending.push(el)
    }

    drawText(text: string, x: number, y: number, color: string, font = '12px sans-serif'): void {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        el.setAttribute('x', String(x))
        el.setAttribute('y', String(y))
        el.setAttribute('fill', color)
        el.setAttribute('font', font)
        el.textContent = text
        this.pending.push(el)
    }

    // flush pending elements into the DOM in one batch
    render(): void {
        const fragment = document.createDocumentFragment()
        for (const el of this.pending) {
            fragment.appendChild(el)
        }
        this.group.appendChild(fragment)
        this.pending = []
    }

    exportSVG(): string {
        // flush anything not yet rendered
        this.render()
        return new XMLSerializer().serializeToString(this.svg)
    }

    destroy(): void {
        this.svg.remove()
    }
}

// ─── SVG export helpers ───────────────────────────────────────────────────────

type DrawCall =
    | { type: 'fillRect'; x: number; y: number; w: number; h: number; color: string }
    | { type: 'drawRect'; x: number; y: number; w: number; h: number; fillColor: string; borderColor: string; borderWidth: number }
    | { type: 'drawLine'; x1: number; y1: number; x2: number; y2: number; color: string; lineWidth: number }
    | { type: 'drawText'; text: string; x: number; y: number; color: string; font: string }

function replayToSVG(log: DrawCall[], width: number, height: number): string {
    const parts: string[] = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`
    ]

    for (const call of log) {
        switch (call.type) {
            case 'fillRect':
                parts.push(`<rect x="${call.x}" y="${call.y}" width="${call.w}" height="${call.h}" fill="${call.color}" stroke="none"/>`)
                break
            case 'drawRect':
                parts.push(`<rect x="${call.x}" y="${call.y}" width="${call.w}" height="${call.h}" fill="${call.fillColor}" stroke="${call.borderColor}" stroke-width="${call.borderWidth}"/>`)
                break
            case 'drawLine':
                parts.push(`<line x1="${call.x1}" y1="${call.y1}" x2="${call.x2}" y2="${call.y2}" stroke="${call.color}" stroke-width="${call.lineWidth}"/>`)
                break
            case 'drawText':
                parts.push(`<text x="${call.x}" y="${call.y}" fill="${call.color}" font="${call.font}">${call.text}</text>`)
                break
        }
    }

    parts.push('</svg>')
    return parts.join('\n')
}