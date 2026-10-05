import { IMatrix } from "@/network/types";

export type ISinapses = {
    weitghs: {
        weights_ih: IMatrix;
        weights_ho: IMatrix;
    };
    bias: {
        bias_ih: IMatrix;
        bias_ho: IMatrix;
    };
    hidden: IMatrix;
    output: IMatrix;
}