import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import generateGridGraph from "./generateGridGraph";
import BFSAlgo from "./BFSAlgo";
import DFSAlgo from './DFSAlgo';

const GRID_SIZE = 10; 
const CELL_SIZE = 60; 

const DisplayGrid = () => {
  const [graph, setGraph] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const [gridAnimation, setGridAnimation] = useState({});
  const animationIntervalRef = useRef(null); 
  const sequenceRef = useRef([]); 

  const handleGenerateGrid = () => {
    const newGraph = generateGridGraph(GRID_SIZE);
    setGraph(newGraph);
    setShowGrid(true);
    resetAnimation();
  };

  const runBFSAlgorithm = () => {
    sequenceRef.current = BFSAlgo(0, 0, GRID_SIZE);
    animateGrid();
  };

  const runDFSAlgorithm = () => {
    sequenceRef.current = DFSAlgo(0, 0, GRID_SIZE);
    animateGrid();
  };

  const animateGrid = () => {
    resetAnimation(); 
    let animationIndex = 0;
    animationIntervalRef.current = setInterval(() => {
      if (animationIndex < sequenceRef.current.length) {
        const [row, col] = sequenceRef.current[animationIndex];
        const cellKey = `${row},${col}`;
        setGridAnimation((prevAnimationProps) => ({
          ...prevAnimationProps,
          [cellKey]: {
            fill: "blue",
          },
        }));
        animationIndex++;
      } else {
        clearInterval(animationIntervalRef.current);
      }
    }, 300);
  };

  const stopAnimation = () => {
    clearInterval(animationIntervalRef.current); 
    setGridAnimation({}); 
    sequenceRef.current = []; 
  };

  const resetAnimation = () => {
    clearInterval(animationIntervalRef.current);
    setGridAnimation({});
  };

  return (
    <div>
      <button onClick={handleGenerateGrid}>Generate Grid</button>
      <button onClick={runBFSAlgorithm} disabled={!showGrid}>
        Run BFS
      </button>
      <button onClick={runDFSAlgorithm} >dfs</button>
      <button onClick={stopAnimation}>Stop</button>

      {showGrid && graph && (
        <div>
          <svg width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE}>
            {Array.from({ length: GRID_SIZE }).map((_, rowIndex) =>
              Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
                const x = colIndex * CELL_SIZE;
                const y = rowIndex * CELL_SIZE;
                const cellKey = `${rowIndex},${colIndex}`;
                return (
                  <motion.rect
                    key={cellKey}
                    x={x}
                    y={y}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    stroke="black"
                    fill="white"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ ...gridAnimation[cellKey], opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })
            )}
          </svg>
        </div>
      )}
    </div>
  );
};

export default DisplayGrid;
