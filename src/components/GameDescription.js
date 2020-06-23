import React from 'react';
import GameRules from "./GameRules";

const GameDescription = ({count}) => {
   return (
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
   )
}


export default GameDescription;