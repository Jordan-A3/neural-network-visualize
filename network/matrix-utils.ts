import { IMatrix, MapFn } from "./types";

export function createMatrix(rows: number, cols: number) {
    const rowsArray = []

    for (let row = 0; row < rows; row++) {
        let colsArray = [];
        for (let col = 0; col < cols; col++) {
            colsArray.push(0)
        }

        rowsArray.push(colsArray)
    }

    return {
        rows,
        cols,
        data: rowsArray
    }
}

export function mapMatrix(matrix: IMatrix, func: MapFn) {
    let matrixx = matrix

    matrixx.data = matrix.data.map((row, rowIndex) => {
        return row.map((rowColumn, colIndex) => {
            return func(rowColumn, rowIndex, colIndex)
        })
    })

    return matrixx
}

function randomize() {
    return Math.random() * 2 - 1
}

export function generateWeights(i_nodes: number, h_nodes: number, o_nodes: number) {
    const weights_ih = createMatrix(h_nodes, i_nodes)
    const weights_ho = createMatrix(o_nodes, h_nodes)

    const randomize_ih_weithg = mapMatrix(weights_ih, randomize)

    const randomize_ho_weithg = mapMatrix(weights_ho, randomize)

    return {
        weights_ih: randomize_ih_weithg,
        weights_ho: randomize_ho_weithg
    }
}

export function arrayToMatrix(arr: number[]) {
    const matrix = createMatrix(arr.length, 1)
    const res = mapMatrix(matrix, (elm, i, j) => {return arr[i]})
    return res
}

export function multiplyMatrix(A: IMatrix, B: IMatrix) {
    const matrix  = createMatrix(A.rows, B.cols)

    return mapMatrix(matrix, (num, row, col) => {
        let sum = 0;

        for (let k=0; k<A.cols; k++){
            let elm1 = A.data[row][k];
            let elm2 = B.data[k][col];

            sum += elm1 * elm2
        }

        return sum;
    })
}

export function AddMatrix(A: IMatrix, B: IMatrix) {
    const matrix = createMatrix(A.rows, B.cols)

    return mapMatrix(matrix, (num, row, col) => {
        return A.data[row][col] + B.data[row][col]
    })
}

export function sigmoid(x: number): number {
    return 1/(1+Math.exp(-x))
}

export function generateBias(h_nodes: number, o_nodes: number) {
    const bias_ih = createMatrix(h_nodes, 1)
    const bias_ho = createMatrix(o_nodes, 1)

    const randomize_ih_bias = mapMatrix(bias_ih, randomize)

    const randomize_ho_bias = mapMatrix(bias_ho, randomize)

    return {
        bias_ih: randomize_ih_bias,
        bias_ho: randomize_ho_bias
    }
}

export function neuralNetwork(i_nodes: number, h_nodes: number, o_nodes: number, inputValues: number[]) {
    const weitghs = generateWeights(i_nodes, h_nodes, o_nodes)
    const bias = generateBias(h_nodes, o_nodes)

    const input = arrayToMatrix(inputValues)
    let hidden = multiplyMatrix(weitghs.weights_ih, input)
    hidden = AddMatrix(hidden, bias.bias_ih)
    hidden = mapMatrix(hidden, sigmoid)

     // HIDDEN -> OUTPUT

     let output = multiplyMatrix(weitghs.weights_ho, hidden);
     output = AddMatrix(output, bias.bias_ho)

     mapMatrix(output, sigmoid)

    return {
        weitghs,
        bias,
        hidden,
        output
    }
} 