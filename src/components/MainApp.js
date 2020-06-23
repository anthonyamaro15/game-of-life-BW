import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";
import Buttons from './Buttons';
import DisplayGrid from './DisplayGrid';
import GameDescription from './GameDescription';
import Footer from "./Footer";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  //  console.log(rows);
  return rows;
};

const MainApp = () => {
  const [running, setRunning] = useState(false);
  const [isCell, setIsCell] = useState(false);
  const [{ numRows, numCols }, setGridValues] = useState({
    numRows: 40,
    numCols: 40,
  });
  const [speed, setSpeed] = useState(100);
  const [color, setColor] = useState("black");
  let [count, setCount] = useState(0);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(numRows, numCols);
  });

  useEffect(() => {
    clearCells();
  }, [numCols, numRows]);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    //  g is an array with live cells
    setGrid((g) => {
      // const { numCols, numRows } = gridValues;
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                // if this condition is true, we are saving the value from the index in
                // neighbors variable.
                neighbors += g[newI][newK];
              }
            });
            // if cell has less than 2 neighbors OR more than 3 neighbors
            // then the cell dies.
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;

              //  if cell is dead but it has 3 live neighbors
              // then cell becomes alive
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setCount(count++);
    setTimeout(runSimulation, speed);
  }, [numRows, numCols, speed, count]);

  //   console.log("here ", grid);
  //   console.log("count here ", count);

  function clearCells() {
    setGrid(generateEmptyGrid(numRows, numCols));
    setCount(0);
  }

  const changeGrid = () => {
    setIsCell(!isCell);
    if (!isCell) {
      randomCells();
    }
  };
  //   console.log("current values ", gridValues);

  function randomCells() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.6 ? 1 : 0))
      );
    }
    setGrid(rows);
  }

  const changeGridSize = (value) => {
    const toNum = Number(value.target.value);
    const newValues = {
      numCols: toNum,
      numRows: toNum,
    };
    setGridValues(newValues);
    randomCells();
  };

  const changeSpeed = (value) => {
    //  console.log(value.target.value);
    const toNum = Number(value.target.value);
    setSpeed(toNum);
  };
  const toggleStartStop = (e) => {
    //  console.log("here ", e.target.value);
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const getColor = (e) => {
    //  console.log(e.target.value);
    setColor(e.target.value);
  };

  //   console.log("check ", grid);
  return (
    <>
      <div className="Main-container">
        <h1 className="title">Conway's Game of Life</h1>
         <Buttons toggleStartStop={toggleStartStop} running={running}
            randomCells={randomCells}
            clearCells={clearCells}
            isCell={isCell}
            getColor={getColor}
            changeGridSize={changeGridSize}
            changeSpeed={changeSpeed}
            changeGrid={changeGrid}
         />
        
         <DisplayGrid 
            numCols={numCols}
            isCell={isCell}
            running={running}
            setGrid={setGrid}
            color={color}
            grid={grid}
         />

        <GameDescription count={count} />
      </div>
      <Footer />
    </>
  );
};

export default MainApp;
