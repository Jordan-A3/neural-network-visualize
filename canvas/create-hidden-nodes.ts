import { ISinapses } from "./types"
import { listInputNodes } from "./utils";

export function createHiddenNodes(hidden: number, sinapses: ISinapses) {
    const { foundedNodes } = listInputNodes()
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement
    const context = canvas?.getContext('2d')

    if (!context || !canvas) {
        return;
    }

    const canvas_h = canvas.height
    const divCanvas = document.getElementById('div-canvas')

    //Desenha nós ocultos
    for (let i = 0; i < hidden; i++) {
        const w = 80
        const h = 80
        const r = 100
        const x = (canvas.width/2) - 40
        const y = ((canvas_h / (2 * hidden)) + (i * 110))

        const w2 = 60
        const h2 = 60
        const r2 = 100
        const x2 = x + (w - w2) / 2
        const y2 = y + (h - h2) / 2

        foundedNodes.inputNodes.map(inp => {
            const input = inp as HTMLInputElement;
            const pos = input.getBoundingClientRect()

            context.strokeStyle = '#D5E2D9';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(130, pos.top - 100);
            context.lineTo(x, y + 40);
            context.stroke()
            context.closePath()
        })

        context.lineWidth = 4;
        context.strokeStyle = "#729BB7";
        context.fillStyle = "#EEF5F9"
        context.beginPath();
        context.roundRect(x, y, w, h, r);
        context.fill()

        context.fillStyle = "#DFEDF5"
        context.beginPath();
        context.roundRect(x2, y2, w2, h2, r2);
        context.stroke();
        context.fill()

        const input = document.createElement('input')
        divCanvas?.appendChild(input)
        input.id = `hidden-node-${i}`
        input.disabled = true
        
        input.style.left = `${x2}px`
        input.style.top = `${y2}px`

        input.value = `${parseFloat(`${sinapses.hidden.data[i]}`).toFixed(2)}`
    }
}