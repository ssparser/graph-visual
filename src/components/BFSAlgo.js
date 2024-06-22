const BFSAlgo = (startRow, startCol, GRID_SIZE) => {
  let visited = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(false));

  const sequence = [];
  const queue = [[startRow, startCol]];
  const movements = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    sequence.push([row, col]);

    for (const [dx, dy] of movements) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < GRID_SIZE &&
        newCol >= 0 &&
        newCol < GRID_SIZE &&
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
      }
    }
  }

  return sequence;
};

export default BFSAlgo;
