

const generateGridGraph = (size) => {

  
    const graph = {};
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const node = `${row},${col}`;
        const neighbors = [];
  
        if (row > 0) neighbors.push(`${row - 1},${col}`); // Top neighbor
        if (row < size - 1) neighbors.push(`${row + 1},${col}`); // Bottom neighbor
        if (col > 0) neighbors.push(`${row},${col - 1}`); // Left neighbor
        if (col < size - 1) neighbors.push(`${row},${col + 1}`); // Right neighbor
  
        graph[node] = neighbors;
      }
    }
    return graph;
  };
  
  export default generateGridGraph;
  