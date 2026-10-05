import { generateEmptyCanvasWithDiv } from "@/canvas/create-canvas"
import { createHiddenNodes } from "@/canvas/create-hidden-nodes"
import { createInputNodes } from "@/canvas/create-input-nodes"
import { createOutputNodes } from "@/canvas/create-output-nodes"
import { ISinapses } from "@/canvas/types"
import { cleanCanvasAndOldNodes, listInputNodes } from "@/canvas/utils"
import { neuralNetwork } from "@/network/matrix-utils"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

export const useHome = () => {
    const [inputs, setInputs] = useState(2)
    const [hidden, setHidden] = useState(4)
    const [outputs, setOutputs] = useState(3)

    const [sinapses, setSinapses] = useState<ISinapses | null>()

    const [isWeigthModalOpen, setIsWeightModalOpen] = useState(false)

    function handleNodesSetter(value: number, setter: Dispatch<SetStateAction<number>>) {
        setter(value)
    }

    useEffect(() => {
        generateEmptyCanvasWithDiv()
    }, [])

    useEffect(() => {
        createInputNodes(inputs)
    }, [inputs])

    function feedfoward() {
        const { foundedNodes, nodes_values, has_empty_inputs } = listInputNodes()

        if (has_empty_inputs) {
            alert('Preencha todos os inputs antes de continuar')
            return;
        }

        const sinapses = neuralNetwork(
            inputs, hidden, outputs,
            nodes_values['inputNodes'].filter(elm => elm !== false).map(elm => Number(elm))
        )

        setSinapses(sinapses)

        if (foundedNodes.hiddenNodes.length > 0){
            cleanCanvasAndOldNodes()
            createInputNodes(foundedNodes.inputNodes.length)
            return;
        }

        createHiddenNodes(hidden, sinapses)
        createOutputNodes(outputs, sinapses)
    }

    return {
        inputs,
        setInputs,

        hidden,
        setHidden,

        outputs,
        setOutputs,

        isWeigthModalOpen,
        setIsWeightModalOpen,

        handleNodesSetter,

        sinapses,
        feedfoward
    }
}