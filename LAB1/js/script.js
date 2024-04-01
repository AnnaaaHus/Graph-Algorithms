
  const graph = {
    0: ['1', '2', '4'],
    1: ['0', '2', '3'],
    2: ['1', '4', '5'],
    3: ['1', '5', '7'],
    4: ['0', '2', '7'],
    5: ['2', '3', '6'],
    6: ['5'],
    7: ['3', '4'],

  };


  function BFS(graph, start) {
    console.log('BFS : ');
    const queue = [start];
    const visited = new Set();
    const result = [];
    let max = 0;
  
    while (queue.length) {
      const vertex = queue.shift();
  
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        

        console.log(`Pushed ${vertex} on to the queue`);

        if (visited.has(vertex)) console.log(`Already visited ${vertex}`);
  
        for (const neighbor of graph[vertex]) {
          queue.push(neighbor);
        }
      }
    }
    max = Math.max(max, result.length);
    console.log('Longest queue : ' + max);
    console.log('RESULT : '+ result);
    return result;
  }



  function recursiveDFS(graph, node) {
    console.log('DFS : ');
    
    const stack = [];
    let max = 0;
  
    const visited = [];
  
    
    const dfs = (graph, node, visited) => {
     
      stack.push(node);
      max = Math.max(max, stack.length);
  
      visited.push(node);
      console.log(`Pushed ${node} on to the stack`);
  
      graph[node].forEach(child => {
        if (!visited.includes(child)) {
          dfs(graph, child, visited);
        } else {
          console.log(`Already visited ${child}`);
        }
      });
  
     
      stack.pop();
   
    }
    dfs(graph, node, visited);
  
    console.log('Longest stack:', max);
    console.log('RESULT : ', visited);
    return visited;
   
   
  }


let userResult = document.getElementById("result");
const ValidValue3 = ["трета", "третя","трет'я","три", "тре"];
const ValidValue5 = ["пята", "пять","пента","п'ять", "пєть", "п'єта","пєта"];
const ValidValue7 = ["семі", "сема","сіма","сім", "сєма"];
  function Calculations(){
   
  let startVertex = document.getElementById("vertex").value;

    let checkValue = startVertex.toLowerCase();

    if (ValidValue3.includes(checkValue) ) {
      console.log(checkValue);
      console.log("Юхуу.Нарешті, ви ввели третю вершину.Вчіть числа, а не слова.)");
      startVertex = 3;
  
    }
    if (ValidValue5.includes(checkValue) ) {
      console.log(checkValue);
      console.log("Юхуу.Нарешті, ви ввели п'яту вершину.Вчіть числа, а не слова.)");
      startVertex = 5;
  
    }
    if (ValidValue7.includes(checkValue) ) {
      console.log(checkValue);
      console.log("Юхуу.Нарешті, ви ввели сьому вершину.Вчіть числа, а не слова.)");
      startVertex = 7;
  
    }

  

  if(startVertex === "") {
    alert("Please enter a vertex");
    return;
  }
  if(startVertex < 0 || startVertex > 7){
    alert("Please enter a valid vertex");
    return;
  }


  if(document.getElementById("dfs").checked){

    document.getElementById("result").innerHTML = 'RESULT : '+ recursiveDFS(graph, startVertex);
  
  }
  if(document.getElementById("bfs").checked){

        document.getElementById("result").innerHTML =  'RESULT : '+ BFS(graph, startVertex);}



  }
