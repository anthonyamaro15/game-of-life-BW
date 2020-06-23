import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";
import GameRules from "./GameRules";
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
  const [speed, setSpeed] = useState(1000);
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
        <div className="btns-container">
          <button onClick={toggleStartStop}>
            {running ? "stop" : "start"}
          </button>
          <button onClick={clearCells}>clear</button>

          <button onClick={randomCells}> random</button>
          <button onClick={changeGrid}>{!isCell ? 'grid': 'circles'}</button>
          <label htmlFor="colors">
            <input type="color" onChange={getColor} placeholder="color" />
          </label>

          <select
            name="size"
            id="size"
            onChange={changeGridSize}
            disabled={running}
          >
            <option value="">Choose grid size</option>
            <option value="20">20x20 </option>
            <option value="30">30x30</option>
            <option value="40">40x40 (default)</option>
            <option value="50">50x50</option>
            <option value="60">60x60</option>
            <option value="70">70x70</option>
          </select>

          <select
            name="speed"
            id="speed"
            onChange={changeSpeed}
            disabled={running}
          >
            <option value="">Choose speed</option>
            <option value="100">Regular</option>
            <option value="50">Fast (default)</option>
            <option value="10">Super Fast</option>
     
          </select>
        </div>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 15px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <button
                className={isCell ? "cells" : "grid-cells"}
                disabled={running}
                key={`${i}_${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  //  console.log("here ", newGrid);
                  setGrid(newGrid);
                }}
                style={{
                  backgroundColor: grid[i][k] ? color : undefined,
                }}
              ></button>
            ))
          )}
        </div>

        <div className="game-description">
          <p className="generation">{`Generation : ${count}`}</p>
          <div className="rules-btn">
            <GameRules />
          </div>
          <div className="desc">
            <h1>About</h1>
            <p>
              Conway's game of life was invented by Cambridge mathematician John
              Conway in 1970.
            </p>
            <p>
              Its rules are applied to create what we call a cellular Automaton,
              a fancy word for a grid of cells that cycle through different
              states over time.{" "}
            </p>
            <p>
              It involves four simple rules which result in wildy differing
              sequences. An initial group of live cells can create an
              unpredictable chaotic sequence, sometimes it will create a
              repeating sequence.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainApp;
