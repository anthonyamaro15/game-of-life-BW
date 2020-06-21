import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";

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

const MainApp = () => {
  const [running, setRunning] = useState(false);
  const [isCell, setIsCell] = useState(false);
  const [gridValues, setGridValues] = useState({ numRows: 50, numCols: 50 });
  const [speed, setSpeed] = useState(500);

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < gridValues.numRows; i++) {
      rows.push(Array.from(Array(gridValues.numCols), () => 0));
    }

    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      const { numCols, numRows } = gridValues;
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;

              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, speed);
  }, [gridValues, speed]);

  //   console.log(grid);

  const changeGrid = () => {
    setIsCell(!isCell);
  };
  //   console.log("current values ", gridValues);

  const onSubmit = (value) => {
    const toNum = Number(value.target.value);
    const newValues = {
      numCols: toNum,
      numRows: toNum,
    };
    setGridValues(newValues);
  };

  const checkSpeed = (value) => {
    //  console.log(value.target.value);
    const toNum = Number(value.target.value);
    setSpeed(toNum);
  };
  console.log("current ", speed);
  return (
    <div className="Main-container">
      <div className="btns-container">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          clear
        </button>

        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < gridValues.numRows; i++) {
              rows.push(
                Array.from(Array(gridValues.numCols), () =>
                  Math.random() > 0.6 ? 1 : 0
                )
              );
            }
            setGrid(rows);
          }}
        >
          {" "}
          random
        </button>
        <button onClick={changeGrid}>grid</button>
        <select name="size" id="size" onChange={onSubmit}>
          <option value="">Choose grid size</option>
          <option value="20">20x20</option>
          <option value="30">30x30</option>
          <option value="40">40x40</option>
          <option value="50">50x50</option>
          <option value="60">60x60</option>
          <option value="70">70x70</option>
        </select>

        <select name="speed" id="speed" onChange={checkSpeed}>
          <option value="">Choose speed</option>
          <option value="500">0.5s</option>
          <option value="1000">1s</option>
          <option value="1250">1.25s</option>
          <option value="1500">1.50s</option>
          <option value="3000">3s</option>
        </select>
      </div>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridValues.numCols}, 15px)`,
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
                setGrid(newGrid);
              }}
              style={{
                backgroundColor: grid[i][k] ? "red" : undefined,
              }}
            ></button>
          ))
        )}
      </div>
    </div>
  );
};

export default MainApp;
