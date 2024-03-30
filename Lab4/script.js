
const graph = {
    1: { 2: 10, 3: 3, 6: 1 },      
    2: { 1: 10, 4: 8, 6: 11 },  
    3: { 1: 3, 5: 5, 6: 4 },
    4: { 2: 8, 5: 5, 6: 2 },
    5: { 3: 5, 4: 5, 6: 6},
    6: { 1: 1, 2: 11, 3: 4, 4: 2, 5: 6}
};

function dijkstra(graph, start) {

    let distances = {};
    let visited = new Set();


    let nodes = Object.keys(graph);

    for (let node of nodes) {
        distances[node] = Infinity;
    }

    distances[start] = 0;

    while (nodes.length) {

        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();


        if (distances[closestNode] === Infinity) break;


        visited.add(closestNode);


        for (let neighbor in graph[closestNode]) {

            if (!visited.has(neighbor)) {

                let newDistance = distances[closestNode] + graph[closestNode][neighbor];

                if (newDistance < distances[neighbor]) {

                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    return distances;
}



let userResult = document.getElementById("result");

  function Calculations(){
  
  let startVertex = document.getElementById("vertex").value;
  

if (isNaN(startVertex) || startVertex < 0 || startVertex > 6) {
    alert("Please enter a valid vertex (0-6)");
    return;
  }
  if(startVertex < 0 || startVertex > 6){
    alert("Please enter a valid vertex");
    return;
  }
  if(startVertex === "") {
    alert("Please enter a vertex");
    return;
  }

  console.log(dijkstra(graph, startVertex));
  let result = dijkstra(graph, startVertex);
  document.getElementById("result").innerHTML = 'RESULT : '+ JSON.stringify(result);

}
