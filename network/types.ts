export type MapFn = (value: number, row: number, col: number) => number;

export type IMatrix = {
    rows: number;
    cols: number;
    data: number[][];
}