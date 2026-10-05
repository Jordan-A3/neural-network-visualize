export function cleanOldNodes(filterNodeTypes?: string) {
    const nodeTypes = [
        'input-node-',
        'hidden-node-',
        'output-node-'
    ];

    const filteredNodeTypes = nodeTypes.filter(type => type !== filterNodeTypes)

    filteredNodeTypes.forEach((nodeType) => {
        let counter = 0;

        while (true) {
            const node = document.getElementById(`${nodeType}${counter}`);

            if (!node) {
                break;
            }

            node.remove();
            counter++;
        }
    });
}

export function cleanCanvasAndOldNodes(filterNodeTypes?: string) {
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement
    const context = canvas?.getContext('2d')

    if (!context || !canvas) {
        return;
    }

    const canvas_h = canvas.height
    const canvas_w = canvas.width

    context.clearRect(0, 0, canvas_w, canvas_h);

    cleanOldNodes(filterNodeTypes)
}

export function listInputNodes() {
    const foundedNodes = {
        inputNodes: [] as HTMLElement[],
        hiddenNodes: [] as HTMLElement[],
        outputNodes: [] as HTMLElement[]
    };

    const nodeTypes: {
        prefix: string;
        key: keyof typeof foundedNodes;
    }[] = [
            { prefix: 'input-node-', key: 'inputNodes' },
            { prefix: 'hidden-node-', key: 'hiddenNodes' },
            { prefix: 'output-node-', key: 'outputNodes' }
        ];

    for (const { prefix, key } of nodeTypes) {
        let counter = 0;

        while (true) {
            const node = document.getElementById(`${prefix}${counter}`);

            if (!node) break;

            foundedNodes[key].push(node);
            counter++;
        }
    }

    const nodes_values = Object.fromEntries(
        Object.entries(foundedNodes).map(([chave, valor]) => [
            chave,
            valor.map((inp) => {
                const input = inp as HTMLInputElement;
                return input.value || false;
            }),
        ])
    );
    
    const has_empty_inputs = nodes_values['inputNodes'].includes(false);

    return {
        foundedNodes,
        nodes_values,
        has_empty_inputs,
    };
}