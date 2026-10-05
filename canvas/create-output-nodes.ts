import { ISinapses } from "./types"
import { listInputNodes } from "./utils";

export function createOutputNodes(output: number, sinapses: ISinapses) {
    const { foundedNodes } = listInputNodes()
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement
    const context = canvas?.getContext('2d')

    if (!context || !canvas) {
        return;
    }

    const canvas_h = canvas.height
    const divCanvas = document.getElementById('div-canvas')

    //Desenha nós ocultos
    for (let i = 0; i < output; i++) {
        const w = 80
        const h = 80
        const r = 100
        const x = (canvas.width) - 130
        const y = ((canvas_h / (2 * output)) + (i * 110))

        const w2 = 60
        const h2 = 60
        const r2 = 100
        const x2 = x + (w - w2) / 2
        const y2 = y + (h - h2) / 2

        foundedNodes.hiddenNodes.map(inp => {
            const hidden = inp as HTMLInputElement;
            const pos = hidden.getBoundingClientRect()

            context.strokeStyle = '#DDD8E5';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo((canvas.width/2) + 40, pos.top - 100);
            context.lineTo(x, y + 40);
            context.stroke()
            context.closePath()
        })

        context.lineWidth = 4;
        context.strokeStyle = "#9975A9";
        context.fillStyle = "#F5F0F7"
        context.beginPath();
        context.roundRect(x, y, w, h, r);
        context.fill()

        context.fillStyle = "#EADFF0"
        context.beginPath();
        context.roundRect(x2, y2, w2, h2, r2);
        context.stroke();
        context.fill()

        const input = document.createElement('input')
        divCanvas?.appendChild(input)
        input.id = `output-node-${i}`
        input.disabled = true
        
        input.style.left = `${x2}px`
        input.style.top = `${y2}px`

        input.value = `${parseFloat(`${sinapses.output.data[i]}`).toFixed(2)}`
    }
}