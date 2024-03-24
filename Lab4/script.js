// Define a graph using an adjacency list
const graph = {
    1: { 2: 10, 3: 3, 6: 1 },      
    2: { 1: 10, 4: 8, 6: 11 },  
    3: { 1: 3, 5: 5, 6: 4 },
    4: { 2: 8, 5: 5, 6: 2 },
    5: { 3: 5, 4: 5, 6: 6},
    6: { 1: 1, 2: 11, 3: 4, 4: 2, 5: 6}
};

function dijkstra(graph, start) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity
    for (let node of nodes) {
        distances[node] = Infinity;
    }
    
    // The distance from the start node to itself is 0
    distances[start] = 0;

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);
        let closestNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[closestNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(closestNode);

        // For each neighboring node of the current node
        for (let neighbor in graph[closestNode]) {
            // If the neighbor hasn't been visited yet
            if (!visited.has(neighbor)) {
                // Calculate tentative distance to the neighboring node
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];
                
                // If the newly calculated distance is shorter than the previously known distance to this neighbor
                if (newDistance < distances[neighbor]) {
                    // Update the shortest distance to this neighbor
                    distances[neighbor] = newDistance;
                }
            }
        }
    }

    // Return the shortest distance from the start node to all nodes
    return distances;
}



let userResult = document.getElementById("result");

  function Calculations(){
  
  let startVertex = document.getElementById("vertex").value;
  

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
