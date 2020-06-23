import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const GameRules = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="button" onClick={() => setOpen(true)}>
        Game Rules
      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="inner-modal">
          <h2>There are 4 rules for the game</h2>
          <ol>
            <li>
              Any live cell with feweer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ol>
        </div>
      </Modal>
    </div>
  );
};

export default GameRules;
