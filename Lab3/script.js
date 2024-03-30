class TopologicalSort {
    constructor(matrix) {
      this.verticesCount = matrix.length;
      this.adjacencyMatrix = matrix;
    }
  
    getIncomingEdgesCount() {
      const incomingEdgesCount = [];
      for (let i = 0; i < this.verticesCount; i++) {
        let count = 0;
        for (let j = 0; j < this.verticesCount; j++) {
          if (this.adjacencyMatrix[j][i] !== 0) {
            count++;
          }
        }
        incomingEdgesCount.push(count);
      }
      return incomingEdgesCount;
    }
  
    demucronSort() {
      const incomingEdgesCount = this.getIncomingEdgesCount();
      const result = [];
      const levelMap = new Map();
      let level = 0;
  
      while (result.length < this.verticesCount) {
        const currentLevelNodes = [];
        for (let i = 0; i < this.verticesCount; i++) {
          if (incomingEdgesCount[i] === 0) {
            currentLevelNodes.push(i);
            incomingEdgesCount[i] = -1;
          }
        }
  
        if (currentLevelNodes.length === 0) {
          throw new Error("Graph contains cycles!");
        }
  
        for (const node of currentLevelNodes) {
          result.push(node);
          levelMap.set(node, level);
          for (let i = 0; i < this.verticesCount; i++) {
            if (this.adjacencyMatrix[node][i] !== 0) {
              incomingEdgesCount[i]--;
            }
          }
        }
        level++;
      }
  
      console.log("Topological sorting using Demucron algorithm:");
      for (const [key, value] of levelMap.entries()) {
        console.log(`Vertex ${key + 1} is at level ${value + 1}`);
      }

      for (const [key, value] of levelMap.entries()) {
        document.getElementById("result").innerHTML += (`Vertex ${key + 1} is at level ${value + 1}`) + "<br>";
      }
    }
  }
  
  const graphMatrix = [
    [0, 1, 0, 0, 0, 1,0],
    [0, 0, 1, 0, 0, 1,0],
    [0, 0, 0, 0, 0, 0,0],
    [0, 0, 0, 0, 1, 0,0],
    [1, 1, 0, 0, 0, 1,0],
    [0, 0, 0, 0, 0, 0,1],
    [0, 0, 0, 0, 0, 0,0],
  ];
  
  const topologicalSort = new TopologicalSort(graphMatrix);
  topologicalSort.demucronSort();
;