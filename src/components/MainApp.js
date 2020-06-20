import React, { useState } from "react";
import produce from "immer";

const numRows = 50;
const numCols = 50;
const MainApp = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  return (
    <div className="container">
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}_${k}`}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[i][k] = 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][k] ? "red" : undefined,
              border: "solid 1px black",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default MainApp;
