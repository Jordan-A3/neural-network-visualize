export function generateEmptyCanvasWithDiv() {
    const mainCanvas = document.getElementById('main-canvas')
    const container = document.getElementById('container')

    if (mainCanvas) {
        return;
    }

    const backgroundDiv = document.createElement('div')
    container?.appendChild(backgroundDiv)
    backgroundDiv.id = "background-div"   

    const canvas = document.createElement('canvas')
    container?.appendChild(canvas)
    canvas.id = "main-canvas"

    const divCanvas = document.createElement('div')
    container?.appendChild(divCanvas)
    divCanvas.id = "div-canvas"   

    canvas.width = 1050
    canvas.height = 550
}
