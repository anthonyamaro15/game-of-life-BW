import React from 'react';

const Buttons = ({toggleStartStop, running, randomCells, clearCells, isCell, getColor, changeGridSize, changeSpeed, changeGrid, isPhone }) => {
   return (
       <div className="btns-container">
       
          <button onClick={toggleStartStop}>
            {running ? "stop" : "start"}
          </button>
          <button onClick={clearCells}>clear</button>

          <button onClick={randomCells}> random</button>
          <button onClick={changeGrid}>{!isCell ? 'grid': 'circles'}</button>
          <label htmlFor="colors">
            <input type="color" id="colors" onChange={getColor} placeholder="color" />
          </label>

          
         {/**
            this changes base on the screen size. if it is in a phone
            then we only display 2 grids to choose from
         */}
          {isPhone ? (
             <label htmlFor="size">
               <select
            name="size"
            id="size"
            onChange={changeGridSize}
            disabled={running}
            
          >
            <option value="">Choose grid size</option>
            <option value="20">20x20</option>
            <option value="30">30x30 (default)</option>
             </select>
             </label>
           
          ) : (
             <label htmlFor="size">
                <select
            name="size"
            id="size"
            onChange={changeGridSize}
            disabled={running}
            
          >
            <option value="">Choose grid size</option>
            <option value="20">20x20</option>
            <option value="30">30x30 (default)</option>
             <option value="40">40x40</option>
            <option value="50">50x50</option>
            <option value="60">60x60</option>
            <option value="70">70x70</option>
            </select>
             </label>
            
          )}
         

          <label htmlFor="speed">
           <select
            name="speed"
            id="speed"
            onChange={changeSpeed}
            disabled={running}
          >
            <option value="">Choose speed</option>
            <option value="100">Regular</option>
            <option value="50">Fast (default)</option>
            <option value="0">Super Fast</option>
     
          </select>
          </label>
         
        </div>
   )
}

export default Buttons;