import { formatToOnlyNumbers } from "@/utils"
import { cleanCanvasAndOldNodes } from "./utils"

export function createInputNodes(inputs: number) {
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement
    const divCanvas = document. getElementById('div-canvas')
    const context = canvas?.getContext('2d')
    const canvas_h = canvas.height

    if (!context || !canvas) {
        return;
    }

    cleanCanvasAndOldNodes()

    for (let i = 0; i < inputs; i++) {
        const w = 80
        const h = 80
        const r = 100
        const x = 50
        const y = ((canvas_h / (2 * inputs)) + (i * 110))

        const w2 = 60
        const h2 = 60
        const r2 = 100
        const x2 = x + (w - w2) / 2
        const y2 = y + (h - h2) / 2

        context.strokeStyle = "#76A682";
        context.lineWidth = 4;
        context.fillStyle = "#F0F7F2"
        context.beginPath();
        context.roundRect(x, y, w, h, r);
        context.fill()

        context.fillStyle = "#E0EFE4"
        context.beginPath();
        context.roundRect(x2, y2, w2, h2, r2);
        context.stroke();
        context.fill()


        const input = document.createElement('input')
        divCanvas?.appendChild(input)
        input.id = `input-node-${i}`

        input.style.left = `${x2}px`
        input.style.top = `${y2}px`

        input.addEventListener("input", (e) => formatToOnlyNumbers(e))
    }
}