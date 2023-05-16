/*

> Display/ UI code here.

> we have to create a grid layout of 10x10 tiles.
> in this grid we will have 10 mines. which will be randomly spread over the grid 
> these mines will be revelead if we left click on them. 
> right click to mark a tile.
> left click to reveal a tile

> once mine is revealed game will stop and there will be a message saying you lose.
> near by tiles of mine will have numbers in it. which would show how close we are to a mine.
> and there will be empty which when clicked. which when clicked will reveal all the near by empty tiles if any are 
available.

> i have to use ES6 modules.
> i have to use the parcel.
> i have to use npm init.

*/

import { createBoard } from "./Minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 5;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const mineLeftText = document.querySelector("[data-mine-count]");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.appendChild(tile.element);
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
mineLeftText.textContent = NUMBER_OF_MINES;
