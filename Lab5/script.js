
class Vertex {

    constructor(label=null, weight=Number.MAX_VALUE, index=null){
        this.label = label;
        this.weight = weight;
        this.index = index;
    }

}


class PriorityQueue {

    constructor(){
        this.queue = [null];
        this.pointer = 0;
    }

    insert(vertex){
        this.pointer++;
        vertex.index = this.pointer;
        this.queue.push(vertex);
        this.percUp(this.pointer);
    }

    isEmpty(){
        return this.pointer == 0;
    }

    percUp(index){
        while(Math.floor(index / 2) > 0){
            let i = Math.floor(index / 2);
            if(this.queue[index].weight < this.queue[i].weight){
                let v = this.queue[index];
                this.queue[index] = this.queue[i];
                this.queue[i] = v;
                this.queue[index].index = index;
                this.queue[i].index = i;
            }
            index = Math.floor(index / 2);
        }
    }

    decreaseKey(key){
        this.percUp(key);
    }

    getMin(){
        if(this.isEmpty()){
            throw new Error('PriorityQueue is empty');
        }
        return this.queue[1];
    }

    deleteMin(){
        if(this.isEmpty()){
            throw new Error('PriorityQueue is empty');
        }
        let minVertex = this.queue[1];
        this.queue[1] = this.queue[this.pointer];
        this.queue[1].index = 1;
        this.queue.pop();
        this.pointer--;
        this.percDown(1);
        return minVertex;
    }

    percDown(index){
        while(index * 2 <= this.pointer){
            let i = this.findMinIndex(index);
            if(this.queue[index].weight > this.queue[i].weight){
                let v = this.queue[index];
                this.queue[index] = this.queue[i];
                this.queue[i] = v;
                this.queue[index].index = index;
                this.queue[i].index = i;
            }
            index = i;
        }
    }

    findMinIndex(index){
        if(index * 2 + 1 > this.pointer){
            return index * 2;
        }
        else {
            if(this.queue[index * 2].weight <= this.queue[index * 2 + 1].weight){
                return index * 2;
            }
            else {
                return index * 2 + 1;
            }
        }
    }
}


class Graph {

    constructor(){
        this.vertices = new Map();
        this.prev = new Map();
        this.adjacencyMap = new Map();
    }

    addVertex(label){
        this.vertices.set(label, new Vertex(label));
        this.prev.set(label, null);
        this.adjacencyMap.set(label, new Set());
    }

    addEdge(label1, label2, weight){
        this.adjacencyMap.get(label1).add(new Vertex(label2, weight));
        this.adjacencyMap.get(label2).add(new Vertex(label1, weight));
    }

    prims(label){
        let vertex = this.vertices.get(label);
        vertex.weight = 0;
        let pq = new PriorityQueue();
        for(let [l, v] of this.vertices){
            pq.insert(v);
        }
        let tree = '';
        while(!pq.isEmpty()){
            let tmp = pq.deleteMin();
            if(this.prev.get(tmp.label) != null){
                tree += `${this.prev.get(tmp.label)} -> ${tmp.label}, `;
            }
            for(let n of this.adjacencyMap.get(tmp.label)){
                let o = this.vertices.get(n.label);
                if(n.weight < o.weight){
                    this.prev.set(o.label, tmp.label);
                    o.weight = n.weight;
                    pq.decreaseKey(o.index);
                }
            }
        }
        return tree;
    }


    returnPath(label){
        if(this.prev.get(label) == null){
            return label;
        }
        else {
            return this.returnPath(this.prev.get(label)) + ' -> ' + label;
        }
    }

}


let graph = new Graph();

graph.addVertex("1");
graph.addVertex("2");
graph.addVertex("3");
graph.addVertex("4");
graph.addVertex("5");

graph.addEdge("1", "2", 3);
graph.addEdge("1", "4", 2);
graph.addEdge("1", "5", 6);
graph.addEdge("2", "3", 4);
graph.addEdge("3", "4", 5);
graph.addEdge("3", "5", 2);
graph.addEdge("4", "5", 3);
console.log(graph.prims("1"));  