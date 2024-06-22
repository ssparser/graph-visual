const DFSAlgo = (startRow, startCol, GRID_SIZE) => {
  if (GRID_SIZE <= 0) {
    throw new Error('GRID_SIZE must be greater than 0.');
  }

  let visited = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    visited.push(Array(GRID_SIZE).fill(false));
  }

  const sequence = [];


  const dfs = (row, col) => {
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || visited[row][col]) {
      return;
    }
    visited[row][col] = true;
    sequence.push([row, col]);

    dfs(row + 1, col); 
    dfs(row - 1, col);
    dfs(row, col + 1); 
    dfs(row, col - 1); 
     
  };

 

  dfs(startRow, startCol);

  return sequence;
};

export default DFSAlgo;
