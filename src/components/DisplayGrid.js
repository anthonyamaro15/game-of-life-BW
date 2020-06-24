import React from 'react';
import produce from 'immer';


const DisplayGrid = ({numCols, grid, isCell, running, setGrid, color, isPhone}) => {
 

   let desktop = '15px';
   let phone = '12px';
   return (
      <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, ${isPhone ? phone : desktop })`,
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
              >{''}</button>
            ))
          )}
        </div>
   )
}

export default DisplayGrid;