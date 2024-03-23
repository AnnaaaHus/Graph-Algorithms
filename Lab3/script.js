function topologicalSort(graph) {
    const inDegree = new Map();
    const queue = [];
    const result = [];

    // Ініціалізуємо inDegree та queue
    for (const node of graph.nodes) {
        inDegree.set(node, 0);
    }
    for (const edge of graph.edges) {
        inDegree.set(edge[1], inDegree.get(edge[1]) + 1);
    }
    for (const [node, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(node);
        }
    }

    // Виконуємо сортування
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph.adjacencyList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Перевіряємо, чи є цикли в графі
    if (result.length !== graph.nodes.length) {
        throw new Error("Граф має цикл");
    }

    return result;
}

// Приклад використання
const graph = {
    nodes: ['A', 'B', 'C', 'D', 'E'],
    edges: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['D', 'E']],
    adjacencyList: new Map([
        ['A', ['B', 'C']],
        ['B', ['D']],
        ['C', ['D']],
        ['D', ['E']],
        ['E', []]
    ])
};

try {
    const sortedNodes = topologicalSort(graph);
    console.log("Відсортовані вершини:", sortedNodes);
} catch (error) {
    console.error(error.message);
}
